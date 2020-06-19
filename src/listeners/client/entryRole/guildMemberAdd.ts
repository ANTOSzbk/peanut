import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';
import { SETTINGS } from '../../../utils/constants';
import { TOPICS, EVENTS } from '../../../helpers/providers/LoggerProvider';



export default class GuildMemberAddRoleListener extends Listener {
  public constructor() {
    super('guildMemberAddRole', {
      emitter: 'client',
      event: 'guildMemberAdd',
      category: 'client',
    });
  }

  public async exec(member: GuildMember) {
    const entryRole = this.client.settings.get(member.guild, SETTINGS.ENTRY_ROLE);
    if (entryRole) {
      try {
        await member.roles.add(entryRole);
        this.client.logger.info(
          MESSAGES.EVENTS.GUILD_MEMBER_ADD.ENTRY_ROLE(member, member.guild, this.client.util.resolveRole(entryRole, member.guild.roles.cache)),
          {
            topic: TOPICS.DISCORD,
            event: EVENTS.GUILD_MEMBER_ADD
          });
      } catch (error) {
        this.client.logger.error(MESSAGES.EVENTS.GUILD_MEMBER_ADD.ERROR(error, member), { topic: TOPICS.DISCORD, event: EVENTS.GUILD_MEMBER_ADD });
      }
    }
  }
}