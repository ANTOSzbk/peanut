import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';
import { TextChannel } from 'discord.js';

export default class DeleteReactionRoleMessageCommand extends Command {
  public constructor() {
    super('reaction-role-delete', {
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DELETE.DESCRIPTION,
      },
      category: 'util',
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
        `${message.author}, Peanut did not found Reaction-Role message with given ID. Maybe it is not his.`
      );

    try {
      await this.client.reactionMessages.delete(msg.id);
      return message.util?.send(
        `${message.author}, Deleted a reaction role message with **ID**: ${msg.id}.`
      );
    } catch {
      return message.util?.send('An unknown error occured while deleting the reaction role message.');
    }
  }
}
