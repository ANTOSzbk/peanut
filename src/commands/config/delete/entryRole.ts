import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';

export default class DeleteConfigMuteRoleCommand extends Command {
  public constructor() {
    super('config-del-entry', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.DELETE.ENTRY_ROLE.DESCRIPTION,
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public async exec(message: Message) {
    this.client.settings.delete(message.guild!, SETTINGS.ENTRY_ROLE);
    return message.util?.reply(
      MESSAGES.COMMANDS.CONFIG.DELETE.ENTRY_ROLE.REPLY
    );
  }
}
