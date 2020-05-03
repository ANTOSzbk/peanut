import { Listener } from 'discord-akairo';
import { MESSAGES } from '../../utils/messages';
import { SETTINGS } from '../../utils/constants';
import { TOPICS, EVENTS } from '../../helpers/LoggerProvider';

export default class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
      category: 'client',
    });
  }

  public async exec() {
    this.client.logger.info(
      MESSAGES.EVENTS.READY.LOG(
        this.client.user?.tag ?? '',
        this.client.user?.id ?? ''
      ),
      {
        topic: TOPICS.DISCORD,
        event: EVENTS.READY,
      }
    );
    this.client.user?.setActivity(
      MESSAGES.EVENTS.READY.ACTIVITY(this.client.user?.username)
    );
    for (const guild of this.client.guilds.cache.values()) {
      const logs = this.client.settings.get(guild, SETTINGS.GUILD_LOG);
      if (!logs) continue;
    }
  }
}
