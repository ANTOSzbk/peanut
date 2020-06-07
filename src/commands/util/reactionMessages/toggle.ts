import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';

export default class ToggleReactionRoleMessageCommand extends Command {
  public constructor() {
    super('reaction-role-toggle', {
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.TOGGLE.DESCRIPTION,
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
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.TOGGLE.PROMPT.START(message),
            retry: (message: Message) =>
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.TOGGLE.PROMPT.RETRY(message.author),
          },
        },
      ],
    });
  }

  public async exec(message: Message, { msg }: { msg: Message }) {
    if (!this.client.reactionMessages.items.has(msg.id))
      return message.util?.send(
        MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.TOGGLE.NO_MESSAGE(message.author)
      );

    try {
      const toggle: boolean = this.client.reactionMessages.get(msg, 'disabled');
      await this.client.reactionMessages.set(msg.id, 'disabled', !toggle);
      return message.util?.send(
        MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.TOGGLE.SUCCESS(message.author, msg.id, toggle)
      );
    } catch (err) {
      console.log(err);
      return message.util?.send(MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.TOGGLE.UNKNOWN_ERROR);
    }
  }
}
