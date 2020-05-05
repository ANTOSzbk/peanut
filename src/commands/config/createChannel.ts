import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import { PermissionResolvable } from 'discord.js';
import { TextChannel } from 'discord.js';

export default class CreateChannelCommand extends Command {
  public constructor() {
    super('create-channel', {
      aliases: ['create-channel'],
      description: {
        content: MESSAGES.COMMANDS.CONFIG.CREATE_ROLE.DESCRIPTION,
        usage: '<channel>',
        examples: ['#new-channel', 'new-channel'],
      },
      category: 'config',
      channel: 'guild',
      clientPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'channel',
          match: 'content',
          type: 'string',
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.CREATE_CHANNEL.PROMPT.START(
                message.author
              ),
          },
        },
      ],
    });
  }

  public async exec(message: Message, { channel }: { channel: string }) {
    if (!channel) return;
    if (message.guild?.channels.cache.some((c) => c.name === channel))
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.CREATE_CHANNEL.EXISTS(channel)
      );
    const newChannel = await message.guild?.channels.create(channel, {
      type: 'text',
    });
    message.util?.reply(
      MESSAGES.COMMANDS.CONFIG.CREATE_CHANNEL.REPLY(newChannel!)
    );
    return newChannel;
  }
}
