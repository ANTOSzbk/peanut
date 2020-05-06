import { Command, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';
import { Settings } from '../../../utils/constants';

export default class StartConfigCommand extends Command {
  public constructor() {
    super('config-start', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.START.DESCRIPTION,
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public async exec(message: Message) {
    const prefix = (this.handler.prefix as PrefixSupplier)(message);
    const commands = this.client.commandHandler.modules.filter(
      (cmd) => cmd.id.match(/config-set-.*/g) !== null
    );
    const settings: Settings = this.client.settings.items.get(
      message.guild!.id!
    );
    if (settings.ENTRY_ROLE) commands.delete('config-set-entry');
    if (settings.GUILD_LOG) commands.delete('config-set-guildlog');
    if (settings.MEMBER_LOG) commands.delete('config-set-memberlog');
    if (settings.MOD_LOG) commands.delete('config-set-modlog');
    if (settings.MOD_ROLE) commands.delete('config-set-mod');
    if (settings.MUTE_ROLE) commands.delete('config-set-mute');
    if (!commands.size)
      return message.util?.reply(MESSAGES.COMMANDS.CONFIG.START.EMPTY(prefix));
    for await (let command of commands.values()) {
      await this.client.commandHandler.runCommand(
        message,
        command,
        await command.parse(message, '')
      );
    }
    return message.util?.reply(MESSAGES.COMMANDS.CONFIG.START.FINISHED(prefix));
  }
}
