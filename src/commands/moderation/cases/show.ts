import ms from '@naval-base/ms';
import { stripIndents } from 'common-tags';
import { Argument, Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import {
  ACTIONS,
  COLORS,
  PRODUCTION,
  SETTINGS,
} from '../../../utils/constants';
import { graphQLClient } from '../../../utils/graphQL/apolloClient';
import { Cases } from '../../../utils/graphQL/graphQLTypes';
import { MESSAGES } from '../../../utils/messages';
import { QUERY } from '../../../utils/queries/cases';

interface ActionKeys {
  [key: number]: string;
}

const ACTION_KEYS: ActionKeys = {
  1: 'Ban',
  2: 'Unban',
  3: 'Softban',
  4: 'Kick',
  5: 'Mute',
  6: 'Warn',
};

export default class CaseCommand extends Command {
  public constructor() {
    super('case-show', {
      category: 'mod',
      description: {
        content: MESSAGES.COMMANDS.MOD.CASES.SHOW.DESCRIPTION,
        usage: '<case>',
        examples: ['1234'],
      },
      channel: 'guild',
      clientPermissions: [
        Permissions.FLAGS.MANAGE_ROLES,
        Permissions.FLAGS.EMBED_LINKS,
      ],
      ratelimit: 2,
      args: [
        {
          id: 'caseNum',
          type: Argument.union('number', 'string'),
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.MOD.CASES.SHOW.PROMPT.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.CASES.SHOW.PROMPT.RETRY(message.author),
          },
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { caseNum }: { caseNum: number | string }
  ) {
    const guild = message.guild!;
    const totalCases = this.client.settings.get(guild, SETTINGS.CASES, 0);
    const caseToFind =
      caseNum === 'latest' || caseNum === 'l'
        ? totalCases
        : (caseNum as number);
    if (isNaN(caseToFind))
      return message.reply(MESSAGES.COMMANDS.MOD.CASES.SHOW.NO_CASE_NUMBER);
    const { data } = await graphQLClient.query<any, any>({
      query: QUERY.CASES,
      variables: {
        guild: guild.id,
        case_id: [caseToFind],
      },
    });
    let dbCase: Omit<Cases, 'actionProcessed' | 'message'>;
    if (PRODUCTION) dbCase = data.cases[0];
    else dbCase = data.casesDev[0];
    if (!dbCase) {
      return message.reply(MESSAGES.COMMANDS.MOD.CASES.SHOW.NO_CASE);
    }

    let moderator;
    try {
      moderator = await guild.members.fetch(dbCase.mod_id ?? '');
      // eslint-disable-next-line no-empty
    } catch {}
    const color = ACTIONS[dbCase.action] as keyof typeof ACTIONS;
    const embed = new MessageEmbed()
      .setAuthor(
        dbCase.mod_id ? `${dbCase.mod_tag} (${dbCase.mod_id})` : 'No moderator',
        dbCase.mod_id && moderator ? moderator.user.displayAvatarURL() : ''
      )
      .setColor(COLORS[color])
      .setDescription(
        stripIndents`
				**Member:** ${dbCase.target_tag} (${dbCase.target_id})
				**Action:** ${ACTION_KEYS[dbCase.action]}${
          dbCase.action === 5
            ? `\n**Length:** ${ms(
                new Date(dbCase.action_duration ?? 0).getTime() -
                  new Date(dbCase.created_at).getTime(),
                true
              )}`
            : ''
        }
				${dbCase.reason ? `**Reason:** ${dbCase.reason}` : ''}${
          dbCase.ref_id ? `\n**Ref case:** ${dbCase.ref_id}` : ''
        }
			`
      )
      .setFooter(`Case ${dbCase.case_id}`)
      .setTimestamp(new Date(dbCase.created_at));

    return message.util?.send(embed);
  }
}
