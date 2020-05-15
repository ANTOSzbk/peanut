import { TextChannel, User } from 'discord.js';
import { ACTIONS, PRODUCTION, SETTINGS } from '../../../utils/constants';
import { graphQLClient } from '../../../utils/graphQL/apolloClient';
import { Cases, CasesInsertInput } from '../../../utils/graphQL/graphQLTypes';
import Action, { ActionData } from './Action';
import { MESSAGES } from '../../../utils/messages';
import { QUERY, MUTATION } from '../../../utils/queries/cases';

type MuteData = Omit<ActionData, 'days'>;

export default class MuteAction extends Action {
  public constructor(data: MuteData) {
    super(ACTIONS.MUTE, data);
  }

  public async before() {
    if (this.member instanceof User) {
      throw new Error(MESSAGES.ACTIONS.INVALID_MEMBER);
    }
    const guild = this.message.guild!;
    const staff = this.client.settings.get(guild, SETTINGS.MOD_ROLE);
    if (this.member.roles.cache.has(staff ?? '')) {
      throw new Error(MESSAGES.ACTIONS.NO_STAFF);
    }

    const muteRole = this.client.settings.get(guild, SETTINGS.MUTE_ROLE);
    if (!muteRole) throw new Error(MESSAGES.ACTIONS.NO_MUTE);

    if (this.client.caseHandler.cachedCases.has(this.keys as string)) {
      throw new Error(MESSAGES.ACTIONS.CURRENTLY_MODERATED);
    }
    this.client.caseHandler.cachedCases.add(this.keys as string);

    return true;
  }

  public async exec() {
    if (this.member instanceof User) return;
    const guild = this.message.guild!;
    const totalCases = this.client.settings.get(guild, SETTINGS.CASES, 0) + 1;
    const muteRole = this.client.settings.get(guild, SETTINGS.MUTE_ROLE)!;

    const sentMessage = await this.message.channel.send(
      MESSAGES.ACTIONS.MUTE.PRE_REPLY(this.member.user.tag)
    );

    try {
      await this.member.roles.add(
        muteRole,
        MESSAGES.ACTIONS.MUTE.AUDIT(this.message.author.tag, totalCases)
      );
    } catch (error) {
      this.client.caseHandler.cachedCases.delete(this.keys as string);
      throw new Error(MESSAGES.ACTIONS.MUTE.ERROR(error.message));
    }

    this.client.settings.set(guild, SETTINGS.CASES, totalCases);

    sentMessage.edit(MESSAGES.ACTIONS.MUTE.REPLY(this.member.user.tag));
  }

  public async after() {
    const guild = this.message.guild!;
    const totalCases = this.client.settings.get(guild, SETTINGS.CASES, 0);
    const memberTag =
      this.member instanceof User ? this.member.tag : this.member.user.tag;
    await this.client.muteScheduler.add({
      guild: guild.id,
      case_id: totalCases,
      target_id: this.member.id,
      target_tag: memberTag,
      mute_message: this.message.id,
      mod_id: this.message.author.id,
      mod_tag: this.message.author.tag,
      action: this.action,
      reason: this.reason,
      ref_id: this.ref,
      action_duration: new Date(
        Date.now() + (this.duration ?? 0)
      ).toISOString(),
      action_processed: false,
    });

    const modLogChannel = this.client.settings.get(guild, SETTINGS.MOD_LOG);
    if (modLogChannel) {
      const { data } = await graphQLClient.query<any, CasesInsertInput>({
        query: QUERY.LOG_CASE,
        variables: {
          guild: guild.id,
          case_id: totalCases,
        },
      });
      let dbCase: Pick<Cases, 'id' | 'message'>;
      if (PRODUCTION) dbCase = data.cases[0];
      else dbCase = data.casesDev[0];
      if (dbCase) {
        const embed = (
          await this.client.caseHandler.log({
            member: this.member,
            action: this.actionName,
            caseNum: totalCases,
            reason: this.reason,
            message: this.message,
            duration: this.duration,
            ref: this.ref,
            nsfw: this.nsfw,
          })
        ).setColor(this.color);
        try {
          const modMessage = await (this.client.channels.cache.get(
            modLogChannel
          ) as TextChannel).send(embed);
          await graphQLClient.mutate({
            mutation: MUTATION.LOG_CASE,
            variables: {
              id: dbCase.id,
              message: modMessage.id,
            },
          });
        } catch (error) {
          this.client.logger.error(error.message);
        }
      }
    }
  }
}
