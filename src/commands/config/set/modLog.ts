import { Argument, Command } from 'discord-akairo';
import { Message, Permissions, TextChannel } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';
import CreateChannelCommand from '../createChannel';

export default class SetConfigModChannelCommand extends Command {
  public constructor() {
    super('config-set-modlog', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.SET.MOD_LOG.DESCRIPTION,
        usage: '<channel>',
        examples: ['#mod-log', 'mog-log'],
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'channel',
          match: 'content',
          type: Argument.union('number', 'textChannel'),
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.SET.MOD_LOG.PROMPT.START(message),
          },
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { channel }: { channel: TextChannel | number }
  ) {
    const guild = message.guild!;
    if (channel instanceof TextChannel) {
      this.client.settings.set(message.guild!, SETTINGS.MOD_LOG, channel.id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MOD_LOG.REPLY(channel.name)
      );
    }
    if (channel === 0) {
      const createChannel = new CreateChannelCommand();
      const createdChannel = await createChannel.exec(message, {
        channel: 'mod-log',
      });
      if (!createdChannel || createdChannel instanceof Message) return;
      this.client.settings.set(guild, SETTINGS.MOD_LOG, createdChannel.id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MOD_LOG.REPLY(createdChannel.name)
      );
    } else {
      const channels = Array.from(guild.channels.cache.values()).filter(
        (channel) => channel.type === 'text'
      );
      this.client.settings.set(guild, SETTINGS.MOD_LOG, channels[channel].id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MOD_LOG.REPLY(channels[channel - 1].name)
      );
    }
  }
}
