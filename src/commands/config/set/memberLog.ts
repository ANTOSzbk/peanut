import { Argument, Command, Flag } from 'discord-akairo';
import { Message, Permissions, TextChannel } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';
import CreateChannelCommand from '../createChannel';

export default class SetConfigMemberLogCommand extends Command {
  public constructor() {
    super('config-set-memberlog', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.DESCRIPTION,
        usage: '<channel>',
        examples: ['#member-log', 'member-log'],
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'channel',
          match: 'content',
          type: Argument.union('number', 'channel'),
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.PROMPT.START(message),
          },
        },
        {
          id: 'mention',
          type: (_message, phrase) => {
            console.log(phrase);
            if (phrase.toLowerCase() === 'yes') return phrase;
            if (phrase.toLowerCase() === 'no') return phrase;
            else return null;
          },
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.PROMPT.START_2(message),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.PROMPT.RETRY_2(message),
            retries: 5,
          },
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { channel, mention }: { channel: TextChannel | number; mention: string }
  ) {
    const guild = message.guild!;
    const memberlog = this.client.settings.get(guild, SETTINGS.MEMBER_LOG, {
      ID: '',
      MENTION: false,
    });
    if (mention.toLowerCase() === 'yes') memberlog.MENTION = true;
    else if (mention.toLowerCase() === 'no') memberlog.MENTION = false;
    if (channel instanceof TextChannel) {
      memberlog.ID = channel.id;
      this.client.settings.set(guild, SETTINGS.MEMBER_LOG, memberlog);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.REPLY(channel.name)
      );
    }
    if (channel === 0) {
      const createChannel = new CreateChannelCommand();
      const createdChannel = await createChannel.exec(message, {
        channel: 'member-log',
      });
      if (!createdChannel || createdChannel instanceof Message) return;
      memberlog.ID = createdChannel.id;
      this.client.settings.set(guild, SETTINGS.MEMBER_LOG, memberlog);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.REPLY(createdChannel.name)
      );
    } else {
      const channels = Array.from(guild.channels.cache.values()).filter(
        (channel) => channel.type === 'text'
      );
      memberlog.ID = channels[channel - 1].id;
      this.client.settings.set(guild, SETTINGS.MEMBER_LOG, memberlog);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MEMBER_LOG.REPLY(
          channels[channel - 1].name
        )
      );
    }
  }
}
