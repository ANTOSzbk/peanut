import { Command } from 'discord-akairo';
import { GuildMember, Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import KickAction from '../../helpers/structures/case/Kick';

export default class KickCommand extends Command {
  public constructor() {
    super('kick', {
      aliases: ['kick'],
      category: 'mod',
      description: {
        content: MESSAGES.COMMANDS.MOD.KICK.DESCRIPTION,
        usage: '<member> [--ref=number] [--nsfw] [...reason]',
        examples: [
          '@UserToKick',
          '@UserToKick pls come back',
          '@UserToKick --ref=1234 referring to nasty case #1234',
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
              MESSAGES.COMMANDS.MOD.KICK.PROMPT.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.KICK.PROMPT.RETRY(message.author),
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
    const guild = message.guild!;
    const key = `${guild.id}:${member.id}:KICK`;
    guild.caseQueue.add(async () =>
      new KickAction({
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
