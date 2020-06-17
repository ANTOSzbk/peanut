import ms from '@naval-base/ms';
import { Command } from 'discord-akairo';
import { GuildMember, Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import MuteAction from '../../helpers/structures/case/Mute';

export default class MuteCommand extends Command {
  public constructor() {
    super('mute', {
      aliases: ['mute'],
      category: 'mod',
      description: {
        content: MESSAGES.COMMANDS.MOD.MUTE.DESCRIPTION,
        usage: '<member> <duration> [--ref=number] [--nsfw] [...reason]',
        examples: [
          '@UserToMute 20m',
          '@UserToMute 20m get a 20minute rest',
          '@UserToMute 14d --ref=1234 just shut up',
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
              MESSAGES.COMMANDS.MOD.MUTE.PROMPT.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.MUTE.PROMPT.RETRY(message.author),
          },
        },
        {
          id: 'duration',
          type: (_, str): number | null => {
            if (!str) return null;
            const duration = ms(str);
            if (duration && duration >= 300000 && !isNaN(duration))
              return duration;
            return null;
          },
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.MOD.MUTE.PROMPT_2.START(message.author),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.MOD.MUTE.PROMPT_2.RETRY(message.author),
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
      duration,
      ref,
      nsfw,
      reason,
    }: {
      member: GuildMember;
      duration: number;
      ref: number;
      nsfw: boolean;
      reason: string;
    }
  ) {
    if (member.id === message.author.id) return;
    const guild = message.guild!;
    const key = `${guild.id}:${member.id}:MUTE`;
    guild.caseQueue.add(async () =>
      new MuteAction({
        message,
        member,
        keys: key,
        reason,
        duration,
        ref,
        nsfw,
      }).commit()
    );
  }
}
