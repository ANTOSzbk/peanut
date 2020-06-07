import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';

export default class ConfigCommand extends Command {
  public constructor() {
    super('reaction-role', {
      aliases: ['reaction-role', 'rr'],
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.DESCRIPTION,
        usage: '<method> <...arguments>',
      },
      category: 'util',
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
        ['reaction-role-disable', 'disable'],
        ['reaction-role-enable', 'enable'],
        ['reaction-role-clear', 'clear'],
        ['reaction-role-check', 'check'],
      ],
      otherwise: (msg: Message) => {
        const prefix = (this.handler.prefix as PrefixSupplier)(msg);
        return MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.REPLY(prefix);
      },
    };
    return Flag.continue(method);
  }
}
