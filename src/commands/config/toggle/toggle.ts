import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';

export default class ToggleCommand extends Command {
  public constructor() {
    super('config-toggle', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.TOGGLE.DESCRIPTION,
        usage: '<method> <...arguments>',
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public *args(): object {
    const method = yield {
      type: [['config-toggle-moderation', 'mod', 'moderation']],
      otherwise: (msg: Message) => {
        const prefix = (this.handler.prefix as PrefixSupplier)(msg);
        return MESSAGES.COMMANDS.CONFIG.TOGGLE.REPLY(prefix);
      },
    };

    return Flag.continue(method);
  }
}
