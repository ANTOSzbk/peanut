import { Argument, Command } from 'discord-akairo';
import { GuildMember, Message, Permissions, User } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import BanAction from '../../helpers/structures/case/Ban';

export default class BanCommand extends Command {
  public constructor() {
    super('ban', {
      aliases: ['ban'],
      category: 'mod',
      description: {
        content: MESSAGES.COMMANDS.MOD.BAN.DESCRIPTION,
        usage: '<member> [--days=number] [--ref=number] [--nsfw] [...reason]',
        examples: [
          '@UserToBan',
          '@UserToBan spams in general',
          '@UserToBan --days=1 think what you do',
          '@UserToBan --nsfw nsfw avatar',
          '@UserToBan --ref=1234 referring to case #1234',
        ],
      },
      channel: 'guild',
      clientPermissions: [
        Permissions.FLAGS.MANAGE_ROLES,
        Permissions.FLAGS.EMBED_LINKS,
      ],
      ratelimit: 2,
      args: [
        {
          id: 'member',
          type: Argument.union('member', 'user', async (_, phrase) => {
            if (phrase) {
              const u = await this.client.users.fetch(phrase);
              return u;
            }
            return null;
          }),
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.MOD.BAN.PROMPT.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.BAN.PROMPT.RETRY(message.author),
          },
        },
        {
          id: 'days',
          type: 'integer',
          match: 'option',
          flag: ['--days=', '-d='],
          default: 7,
        },
        {
          id: 'ref',
          type: 'integer',
          match: 'option',
          flag: ['--ref=', '-r='],
        },
        {
          id: 'nsfw',
          match: 'flag',
          flag: ['--nsfw'],
        },
        {
          id: 'reason',
          type: 'string',
          match: 'rest',
          default: '',
        },
      ],
    });
  }

  public async exec(
    message: Message,
    {
      member,
      days,
      ref,
      nsfw,
      reason,
    }: {
      member: GuildMember | User;
      days: number;
      ref: number;
      nsfw: boolean;
      reason: string;
    }
  ) {
    const guild = message.guild!;
    const key = `${guild.id}:${member.id}:BAN`;
    guild.caseQueue.add(async () =>
      new BanAction({
        message,
        member,
        keys: key,
        reason,
        ref,
        days,
        nsfw,
      }).commit()
    );
  }
}
