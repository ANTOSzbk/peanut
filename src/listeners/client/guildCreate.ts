/* eslint-disable no-unused-vars */
import { Listener } from 'discord-akairo';
import { MESSAGES } from '../../utils/messages';
import { Guild } from 'discord.js';
import { EVENTS, TOPICS } from '../../helpers/LoggerProvider';

export default class GuildCreateListener extends Listener {
  public constructor() {
    super('guildCreate', {
      emitter: 'client',
      event: 'guildCreate',
      category: 'client',
    });
  }

  public async exec(guild: Guild) {
    this.client.logger.info(
      MESSAGES.EVENTS.GUILD_CREATE.LOG(
        this.client.user?.tag ?? '',
        guild.name,
        guild.id
      ),
      {
        topic: TOPICS.DISCORD,
        event: EVENTS.GUILD_CREATE,
      }
    );
  }
}
