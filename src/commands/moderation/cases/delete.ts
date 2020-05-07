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

export default class CaseDeleteCommand extends Command {
  public constructor() {
    super('case-delete', {
      category: 'mod',
      description: {
        content: MESSAGES.COMMANDS.MOD.CASES.DELETE.DESCRIPTION,
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
              MESSAGES.COMMANDS.MOD.CASES.DELETE.PROMPT.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.CASES.DELETE.PROMPT.RETRY(message.author),
          },
        },
        {
          id: 'removeRole',
          match: 'flag',
          flag: ['--role'],
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { caseNum, removeRole }: { caseNum: number | string; removeRole: boolean }
  ) {
    const guild = message.guild!;
    let totalCases = this.client.settings.get(guild, SETTINGS.CASES, 0);
    const caseToFind =
      caseNum === 'latest' || caseNum === 'l'
        ? totalCases
        : (caseNum as number);
    if (isNaN(caseToFind))
      return message.reply(MESSAGES.COMMANDS.MOD.CASES.DELETE.NO_CASE_NUMBER);
    const { data } = await graphQLClient.query<any, any>({
      query: QUERY.CASES,
      variables: {
        guild: guild.id,
        caseId: [caseToFind],
      },
    });
    let dbCase: Omit<Cases, 'actionProcessed' | 'message'>;
    if (PRODUCTION) dbCase = data.cases[0];
    else dbCase = data.casesDev[0];
    if (!dbCase) {
      return message.reply(MESSAGES.COMMANDS.MOD.CASES.DELETE.NO_CASE);
    }

    let moderator;
    try {
      moderator = await guild.members.fetch(dbCase.mod_id ?? '');
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
          dbCase.action === 5 && dbCase.action_duration
            ? `\n**Length:** ${ms(
                new Date(dbCase.action_duration).getTime() -
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

    await message.channel.send(MESSAGES.COMMANDS.MOD.CASES.DELETE.DELETE, {
      embed,
    });
    const responses = await message.channel.awaitMessages(
      (msg) => msg.author.id === message.author.id,
      {
        max: 1,
        time: 10000,
      }
    );

    if (!responses || responses.size !== 1)
      return message.reply(MESSAGES.COMMANDS.MOD.CASES.DELETE.TIMEOUT);
    const response = responses.first();

    let sentMessage;
    if (/^y(?:e(?:a|s)?)?$/i.test(response?.content ?? '')) {
      sentMessage = await message.channel.send(
        MESSAGES.COMMANDS.MOD.CASES.DELETE.DELETING(dbCase.case_id)
      );
    } else {
      return message.reply(MESSAGES.COMMANDS.MOD.CASES.DELETE.CANCEL);
    }

    totalCases = this.client.settings.get(guild, SETTINGS.CASES, 0) - 1;
    this.client.settings.set(guild, SETTINGS.CASES, totalCases);

    await this.client.caseHandler.delete(message, caseToFind, removeRole);

    return sentMessage.edit(
      MESSAGES.COMMANDS.MOD.CASES.DELETE.REPLY(dbCase.case_id)
    );
  }
}
