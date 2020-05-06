import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';

export default class DeleteConfigMuteRoleCommand extends Command {
  public constructor() {
    super('config-del-mute', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.DELETE.MUTE.DESCRIPTION,
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public async exec(message: Message) {
    this.client.settings.delete(message.guild!, SETTINGS.MUTE_ROLE);
    return message.util?.reply(MESSAGES.COMMANDS.CONFIG.DELETE.MUTE.REPLY);
  }
}
