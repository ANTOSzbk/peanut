import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import { SETTINGS } from '../../utils/constants';

export default class PrefixCommand extends Command {
  public constructor() {
    super('prefix', {
      aliases: ['prefix'],
      description: {
        content: MESSAGES.COMMANDS.PREFIX.DESCRIPTION,
        usage: '[prefix]',
        examples: ['!', 'peanut;;'],
      },
      category: 'util',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'prefix',
          type: 'string',
        },
      ],
    });
  }

  public async exec(message: Message, { prefix }: { prefix: string }) {
    if (!prefix) {
      return message.util?.send(
        MESSAGES.COMMANDS.PREFIX.REPLY(
          (this.handler.prefix as PrefixSupplier)(message)
        )
      );
    }
    this.client.settings.set(message.guild!, SETTINGS.PREFIX, prefix);
    if (prefix === process.env.COMMAND_PREFIX) {
      return message.util?.reply(MESSAGES.COMMANDS.PREFIX.REPLY_2(prefix));
    }
    return message.util?.reply(MESSAGES.COMMANDS.PREFIX.REPLY_3(prefix));
  }
}
