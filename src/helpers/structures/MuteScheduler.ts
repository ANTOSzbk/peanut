import { PRODUCTION, SETTINGS } from '../../utils/constants';
import { Cases, CasesInsertInput } from '../../utils/graphQL/graphQLTypes';
import { graphQLClient } from '../../utils/graphQL/apolloClient';
import { EVENTS, TOPICS } from '../providers/LoggerProvider';
import PeanutClient from '../../client/PeanutClient';
import { QUERY, MUTATION } from '../../utils/queries/cases';

export default class MuteScheduler {
  private readonly checkRate: number;

  private checkInterval!: NodeJS.Timeout;

  private readonly queued = new Map();

  public constructor(
    private readonly client: PeanutClient,
    { checkRate = 5 * 60 * 1000 } = {}
  ) {
    this.checkRate = checkRate;
  }

  public async add(mute: Omit<Cases, 'id' | 'created_at'>, reschedule = false) {
    this.client.logger.info(
      `Muted ${mute.target_tag} on ${this.client.guilds.cache.get(mute.guild)}`,
      {
        topic: TOPICS.DISCORD_AKAIRO,
        event: EVENTS.MUTE,
      }
    );
    if (reschedule)
      this.client.logger.info(
        `Rescheduled mute for ${
          mute.target_tag
        } on ${this.client.guilds.cache.get(mute.guild)}`,
        {
          topic: TOPICS.DISCORD_AKAIRO,
          event: EVENTS.MUTE,
        }
      );
    if (!reschedule) {
      const { data } = await graphQLClient.mutate<any, CasesInsertInput>({
        mutation: MUTATION.INSERT_CASES,
        variables: {
          action: mute.action,
          action_duration: mute.action_duration,
          action_processed: mute.action_processed,
          case_id: mute.case_id,
          guild: mute.guild,
          message: mute.message,
          mute_message: mute.mute_message,
          mod_id: mute.mod_id,
          mod_tag: mute.mod_tag,
          reason: mute.reason,
          ref_id: mute.ref_id,
          target_id: mute.target_id,
          target_tag: mute.target_tag,
        },
      });
      if (PRODUCTION) mute = data.insert_cases.returning[0];
      else mute = data.insert_casesDev.returning[0];
    }
    if (
      new Date(mute.action_duration ?? 0).getTime() <
      Date.now() + this.checkRate
    ) {
      this.queue(mute as Cases);
    }
  }

  public async cancel(
    mute: Pick<Cases, 'id' | 'guild' | 'target_id' | 'target_tag'>
  ) {
    this.client.logger.info(
      `Unmuted ${mute.target_tag} on ${this.client.guilds.cache.get(
        mute.guild
      )}`,
      {
        topic: TOPICS.DISCORD_AKAIRO,
        event: EVENTS.MUTE,
      }
    );
    const guild = this.client.guilds.cache.get(mute.guild)!;
    const muteRole = this.client.settings.get(guild, SETTINGS.MUTE_ROLE)!;
    let member;
    try {
      member = await guild.members.fetch(mute.target_id);
      // eslint-disable-next-line no-empty
    } catch {}
    await graphQLClient.mutate<any, CasesInsertInput>({
      mutation: MUTATION.CANCEL_MUTE,
      variables: {
        id: mute.id,
        action_processed: true,
      },
    });
    if (member) {
      try {
        await member.roles.remove(
          muteRole,
          'Unmuted automatically based on duration.'
        );
        // eslint-disable-next-line no-empty
      } catch {}
    }
    const schedule = this.queued.get(mute.id);
    if (schedule) this.client.clearTimeout(schedule);
    return this.queued.delete(mute.id);
  }

  public async delete(mute: Cases) {
    const schedule = this.queued.get(mute.id);
    if (schedule) this.client.clearTimeout(schedule);
    this.queued.delete(mute.id);
    await graphQLClient.mutate<any, CasesInsertInput>({
      mutation: MUTATION.DELETE_CASE,
      variables: {
        id: mute.id,
      },
    });
  }

  public queue(
    mute: Pick<
      Cases,
      'action_duration' | 'id' | 'guild' | 'target_id' | 'target_tag'
    >
  ) {
    this.queued.set(
      mute.id,
      this.client.setTimeout(() => {
        this.cancel(mute);
      }, new Date(mute.action_duration ?? 0).getTime() - Date.now())
    );
  }

  public reschedule(mute: Cases) {
    const schedule = this.queued.get(mute.id);
    if (schedule) this.client.clearTimeout(schedule);
    this.queued.delete(mute.id);
    this.add(mute, true);
  }

  public async init() {
    await this.check();
    this.checkInterval = this.client.setInterval(
      this.check.bind(this),
      this.checkRate
    );
  }

  public async check() {
    const { data } = await graphQLClient.query<any, CasesInsertInput>({
      query: QUERY.MUTES,
      variables: {
        action_duration: new Date(Date.now() + this.checkRate).toISOString(),
        action_processed: false,
      },
    });
    let mutes: Pick<
      Cases,
      'action_duration' | 'guild' | 'id' | 'target_id' | 'target_tag'
    >[];
    if (PRODUCTION) mutes = data.cases;
    else mutes = data.casesDev;
    const now = Date.now();

    for (const mute of mutes) {
      if (this.queued.has(mute.id)) continue;

      if (new Date(mute.action_duration ?? 0).getTime() < now) {
        this.cancel(mute);
      } else {
        this.queue(mute);
      }
    }
  }
}
