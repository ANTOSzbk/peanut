import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';

export default class ReactionRoleCommand extends Command {
  public constructor() {
    super('reaction-role', {
      aliases: ['reaction-role', 'rr'],
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DESCRIPTION,
        usage: '<method> <...arguments>',
      },
      category: 'reactionMessages',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public *args() {
    const method = yield {
      type: [
        ['reaction-role-create', 'create'],
        ['reaction-role-delete', 'delete'],
        ['reaction-role-toggle', 'toggle'],
        ['reaction-role-clear', 'clear'],
        ['reaction-role-list', 'list'],
      ],
      otherwise: (msg: Message) => {
        const prefix = (this.handler.prefix as PrefixSupplier)(msg);
        return MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.REPLY(prefix);
      },
    };
    return Flag.continue(method);
  }
}
