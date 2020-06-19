import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
import { SETTINGS } from '../utils/constants';

export default class ModRoleInhibitor extends Inhibitor {
  public constructor() {
    super('modRole', {
      reason: 'modRole',
    });
  }

  public exec(message: Message) {
    if (!message.guild) return false;
    if (message.util?.parsed?.command?.categoryID !== 'mod') {
      return false;
    }
    const staffRole = this.client.settings.get(message.guild, SETTINGS.MOD_ROLE);
    if (!staffRole) {
      this.client.logger.warn(`Command ${message.util.parsed.command.id} was used but no MOD_ROLE is set within guild ${message.guild.name} [${message.guild.id}].`)
      return true;
    }
    const hasStaffRole = message.member?.roles.cache.has(staffRole);
    if (!hasStaffRole) {
      this.client.logger.warn(`Command ${message.util.parsed.command.id} used without permission by user ${message.author.tag} in guild ${message.guild.name} [${message.guild.id}].`)
      return true;
    }
    return false;
  }
}