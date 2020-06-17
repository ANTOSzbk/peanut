import { Command } from 'discord-akairo';
import { Message, Permissions, TextChannel } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';

export default class DeleteReactionRoleMessageCommand extends Command {
  public constructor() {
    super('reaction-role-clear', {
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CLEAR.DESCRIPTION,
      },
      category: 'util',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public async exec(message: Message) {
    const messages = await this.client.reactionMessages.getReactionMessagesInGuild(message.guild!);
    if (!messages.length)
      return message.util?.send(
        MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CLEAR.NO_MESSAGES(message.author)
      );

    try {
      for (const msg of messages) {
        const channelId = this.client.reactionMessages.get(msg, 'channel');
        const channel = this.client.channels.cache.get(channelId) as TextChannel;
        await channel.messages.delete(msg);
        this.client.reactionMessages.delete(msg);
      }
      return message.util?.send(MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CLEAR.SUCCESS(message.author));
    } catch {
      return message.util?.send(MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CLEAR.UNKNOWN_ERROR);
    }
  }
}
