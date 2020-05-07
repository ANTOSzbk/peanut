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
    let skip: string[] = [];
    if (settings.ENTRY_ROLE) {
      skip.push('Entry Role');
      commands.delete('config-set-entry');
    }
    if (settings.GUILD_LOG) {
      skip.push('Guild Log');
      commands.delete('config-set-guildlog');
    }
    if (settings.MEMBER_LOG) {
      skip.push('Member Log');
      commands.delete('config-set-memberlog');
    }
    if (settings.MOD_LOG) {
      skip.push('Mod Log');
      commands.delete('config-set-modlog');
    }
    if (settings.MOD_ROLE) {
      skip.push('Mod Role');
      commands.delete('config-set-mod');
    }
    if (settings.MUTE_ROLE) {
      skip.push('Mute Role');
      commands.delete('config-set-mute');
    }
    if (skip.length)
      message.util?.reply(MESSAGES.COMMANDS.CONFIG.START.SKIP(skip));
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
