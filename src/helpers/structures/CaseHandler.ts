/* eslint-disable no-empty */
import ms from '@naval-base/ms';
import { oneLine, stripIndents } from 'common-tags';
import {
  Guild,
  GuildMember,
  Message,
  MessageEmbed,
  TextChannel,
  User,
} from 'discord.js';
import PeanutClient from '../../client/PeanutClient';
import { PRODUCTION, SETTINGS } from '../../utils/constants';
import { graphQLClient } from '../../utils/graphQL/apolloClient';
import { QUERY, MUTATION } from '../../utils/queries/cases';
import { Cases, CasesInsertInput } from '../../utils/graphQL/graphQLTypes';

interface Footer {
  warn?: number;
  restriction?: number;
  mute?: number;
  kick?: number;
  ban?: number;
  [key: string]: number | undefined;
}

export const ACTION_KEYS = ['', 'ban', 'unban', 'kick', 'kick', 'mute', 'warn'];

interface Log {
  member: GuildMember | User;
  action: string;
  caseNum?: number;
  reason: string;
  message?:
    | {
        author: User | null;
        guild: Guild;
      }
    | Message;
  duration?: number;
  ref?: number;
  nsfw?: boolean;
  channel?: string;
  reference?: Cases;
}

export default class CaseHandler {
  public cachedCases = new Set<string>();

  public constructor(private readonly client: PeanutClient) {}

  public async create({
    action,
    action_processed = true,
    case_id,
    guild,
    message,
    mod_id,
    mod_tag,
    reason,
    ref_id,
    target_id,
    target_tag,
  }: Omit<Cases, 'id' | 'created_at'>) {
    try {
      const { data } = await graphQLClient.mutate<any, CasesInsertInput>({
        mutation: MUTATION.INSERT_CASES,
        variables: {
          action,
          action_processed,
          case_id,
          guild,
          message,
          mod_id,
          mod_tag,
          reason,
          ref_id,
          target_id,
          target_tag,
        },
      });
      if (PRODUCTION) return data.insert_cases.returning[0] as Cases;
      return data.insert_casesDev.returning[0] as Cases;
    } catch (error) {
      this.client.logger.error(error);
    }
  }

  public async delete(message: Message, caseNum: number, removeRole?: boolean) {
    const guild = message.guild!;
    const { data } = await graphQLClient.query<any, any>({
      query: QUERY.CASES,
      variables: {
        guild: guild.id,
        case_id: [caseNum],
      },
    });
    let cs: Cases;
    if (PRODUCTION) cs = data.cases[0];
    else cs = data.casesDev[0];
    const channel = this.client.settings.get(guild, SETTINGS.MOD_LOG);
    const muteRole = this.client.settings.get(guild, SETTINGS.MUTE_ROLE)!;

    if (channel) {
      const chan = this.client.channels.cache.get(channel) as TextChannel;
      try {
        const msgToDelete = await chan.messages.fetch(cs.message ?? '');
        await msgToDelete.delete();
      } catch {}
      this.fix(cs.case_id, guild.id, channel);

      if (muteRole && !removeRole) {
        this.removeRoles(cs, message, muteRole);
      }
    }

    await graphQLClient.mutate<any, CasesInsertInput>({
      mutation: MUTATION.DELETE_CASE,
      variables: {
        id: cs.id,
      },
    });
  }

  public async log({
    member,
    action,
    caseNum,
    reason,
    message,
    duration,
    ref,
    nsfw,
  }: Log) {
    const embed = new MessageEmbed();
    if (message?.author) {
      embed.setAuthor(
        `${message.author.tag} (${message.author.id})`,
        message.author.displayAvatarURL()
      );
    }
    let reference: Cases | undefined;
    let channel;
    if (message && ref) {
      const guild = message.guild!;
      try {
        const { data } = await graphQLClient.query<any, any>({
          query: QUERY.CASES,
          variables: {
            guild: guild.id,
            case_id: [ref],
          },
        });
        if (PRODUCTION) reference = data.cases[0];
        else reference = data.casesDev[0];
        channel = this.client.settings.get(guild, SETTINGS.MOD_LOG);
      } catch {}
    }

    embed
      .setDescription(
        this.logMessage({
          member,
          action,
          duration,
          message,
          reason,
          channel,
          reference,
        })
      )
      .setFooter(`Case ${caseNum}`)
      .setTimestamp(new Date());

    if (!nsfw) {
      embed.setThumbnail(
        member instanceof User
          ? member.displayAvatarURL()
          : member.user.displayAvatarURL()
      );
    }

    return embed;
  }

  public async history(member: GuildMember | User) {
    const { data } = await graphQLClient.query<any, CasesInsertInput>({
      query: QUERY.HISTORY_CASE,
      variables: {
        target_id: member.id,
      },
    });
    let cases: Pick<Cases, 'action'>[];
    if (PRODUCTION) cases = data.cases;
    else cases = data.casesDev;
    const footer = cases.reduce((count: Footer, c) => {
      const action = ACTION_KEYS[c.action];
      count[action] = (count[action] || 0) + 1;
      return count;
    }, {});

    const colors = [
      8450847,
      10870283,
      13091073,
      14917123,
      16152591,
      16667430,
      16462404,
    ];
    const values = [
      footer.warn || 0,
      footer.mute || 0,
      footer.kick || 0,
      footer.ban || 0,
    ];
    const [warn, mute, kick, ban] = values;
    const colorIndex = Math.min(
      values.reduce((a, b) => a + b),
      colors.length - 1
    );

    return new MessageEmbed()
      .setAuthor(
        `${member instanceof User ? member.tag : member.user.tag} (${
          member.id
        })`,
        member instanceof User
          ? member.displayAvatarURL()
          : member.user.displayAvatarURL()
      )
      .setColor(colors[colorIndex]).setFooter(oneLine`${warn} warning${
      warn > 1 || warn === 0 ? 's' : ''
    },
				${mute} mute${mute > 1 || mute === 0 ? 's' : ''},
				${kick} kick${kick > 1 || kick === 0 ? 's' : ''},
				and ${ban} ban${ban > 1 || ban === 0 ? 's' : ''}.
			`);
  }

  private logMessage({
    member,
    action,
    duration,
    message,
    reason,
    channel,
    reference,
  }: Log) {
    let msg = stripIndents`
			**Member:** ${member instanceof User ? member.tag : member.user.tag} (${
      member.id
    })
			**Action:** ${action}
		`;
    if (action === 'Mute' && duration) {
      msg += `\n**Length:** ${ms(duration, true)}`;
    }
    if (['Mute', 'Warn'].includes(action)) {
      if (message instanceof Message) {
        msg += `\n**Context:** [Go to message](${message.url})`;
      }
    }
    msg += `\n**Reason:** ${reason}`;
    if (reference && channel) {
      msg += `\n**Ref case:** [${reference.case_id}](https://discordapp.com/channels/${reference.guild}/${channel}/${reference.message})`;
    }
    return msg;
  }

  private async removeRoles(
    cs: Pick<Cases, 'action' | 'case_id' | 'message' | 'target_id'>,
    message: Message,
    mute: string
  ) {
    const guild = message.guild!;
    switch (cs.action) {
      case 5:
        // eslint-disable-next-line no-case-declarations
        let member;
        try {
          member = await guild.members.fetch(cs.target_id);
        } catch {
          break;
        }
        if (!member) break;
        // eslint-disable-next-line no-case-declarations
        const key = `${guild.id}:${member.id}:MUTE`;
        try {
          this.cachedCases.add(key);
          await member.roles.remove(
            mute,
            `Mute removed by ${message.author.tag} | Removed Case #${cs.case_id}`
          );
        } catch (error) {
          this.cachedCases.delete(key);
          message.reply(
            `there was an error removing the mute on this member: \`${error}\``
          );
        }
        break;
      default:
        break;
    }
  }

  private async fix(caseNum: number, guild: string, channel: string) {
    const { data } = await graphQLClient.query<any, CasesInsertInput>({
      query: QUERY.FIX_CASES,
      variables: {
        guild,
        case_id: caseNum,
      },
    });
    let cases: Pick<Cases, 'id' | 'message'>[];
    if (PRODUCTION) cases = data.cases;
    else cases = data.casesDev;
    let newCaseNum = caseNum;

    for (const c of cases) {
      const chan = this.client.channels.cache.get(channel) as TextChannel;
      try {
        const msg = await chan.messages.fetch(c.message ?? '');
        await msg.edit(
          new MessageEmbed(msg.embeds[0]).setFooter(`Case ${newCaseNum}`)
        );
      } catch {}
      await graphQLClient.mutate<any, CasesInsertInput>({
        mutation: MUTATION.FIX_CASE,
        variables: {
          id: c.id,
          case_id: newCaseNum,
        },
      });
      newCaseNum++;
    }
  }
}
