import { Command } from 'discord-akairo';
import { GuildMember, Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import WarnAction from '../../helpers/structures/case/Warn';

export default class WarnCommand extends Command {
  public constructor() {
    super('warn', {
      aliases: ['warn'],
      category: 'mod',
      description: {
        content: MESSAGES.COMMANDS.MOD.WARN.DESCRIPTION,
        usage: '<member> [--ref=number] [--nsfw] [...reason]',
        examples: [
          '@UserToWarn',
          '@UserToWarn stupid questions',
          '@UserToWarn --ref=1234 referring to case #1234',
          '@UserToWarn --nsfw nsfw avatar',
        ],
      },
      channel: 'guild',
      clientPermissions: [Permissions.FLAGS.MANAGE_ROLES],
      ratelimit: 2,
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.MOD.WARN.PROMPT.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.WARN.PROMPT.RETRY(message.author),
          },
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
          match: 'rest',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  public async exec(
    message: Message,
    {
      member,
      ref,
      nsfw,
      reason,
    }: { member: GuildMember; ref: number; nsfw: boolean; reason: string }
  ) {
    if (member.id === message.author.id) return;
    const guild = message.guild!;
    const key = `${guild.id}:${member.id}:WARN`;
    guild.caseQueue.add(async () =>
      new WarnAction({
        message,
        member,
        keys: key,
        reason,
        ref,
        nsfw,
      }).commit()
    );
  }
}
