import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';

export default class DeleteReactionRoleMessageCommand extends Command {
  public constructor() {
    super('reaction-role-delete', {
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.DESCRIPTION,
      },
      category: 'reactionMessages',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'msg',
          match: 'text',
          type: 'guildMessage',
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.PROMPT.START(message),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.PROMPT.RETRY(message.author),
          },
        },
      ],
    });
  }

  public async exec(message: Message, { msg }: { msg: Message }) {
    if (!this.client.reactionMessages.items.has(msg.id))
      return message.util?.send(
        MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.NO_MESSAGE(message.author)
      );

    try {
      await this.client.reactionMessages.delete(msg.id);
      return message.util?.send(
        MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.SUCCESS(message.author, msg.id)
      );
    } catch {
      return message.util?.send(MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.UNKNOWN_ERROR);
    }
  }
}
