/* eslint-disable no-unused-vars */
import { Listener } from 'discord-akairo';
import { MESSAGES } from '../../utils/messages';
import { Guild } from 'discord.js';

export default class GuildCreateListener extends Listener {
  public constructor() {
    super('guildCreate', {
      emitter: 'client',
      event: 'guildCreate',
      category: 'client',
    });
  }

  public async exec(guild: Guild) {
    console.log(
      MESSAGES.EVENTS.GUILD_CREATE.LOG(
        this.client.user?.tag ?? 'Peanut',
        guild.name,
        guild.id
      )
    );
  }
}
