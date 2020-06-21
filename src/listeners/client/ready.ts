import { Listener } from 'discord-akairo';
import { MESSAGES } from '../../utils/messages';
import { SETTINGS } from '../../utils/constants';
import { TOPICS, EVENTS } from '../../helpers/providers/LoggerProvider';

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
      MESSAGES.EVENTS.READY.LOG(this.client.user?.tag ?? '', this.client.user?.id ?? ''),
      {
        topic: TOPICS.DISCORD,
        event: EVENTS.READY,
      }
    );
    this.client.user?.setActivity(MESSAGES.EVENTS.READY.ACTIVITY(this.client.user?.username));
    this.client.promServer.get('/metrics', (req, res) => {
      console.log('Received request at /metrics.')
      res.setHeader('Content-Type', this.client.prometheus.register.contentType)
      res.status(200).send(this.client.prometheus.register.metrics());
    })
    this.client.promServer.listen(5500);
    this.client.logger.info('Metrics listening on 5500', { topic: TOPICS.METRICS, event: EVENTS.READY });
    for (const guild of this.client.guilds.cache.values()) {
      const settings = this.client.settings.items.get(guild.id)
      if (!settings) this.client.settings.set(guild.id);
      const logs = this.client.settings.get(guild, SETTINGS.GUILD_LOG);
      if (!logs) continue;
      const webhook = (await guild.fetchWebhooks()).get(logs);
      if (!webhook) continue;
      this.client.webhooks.set(webhook.id, webhook);
    }

    await this.client.reactionMessages.init();
    this.client.logger.info(MESSAGES.REACTION_MESSAGES.INIT, {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
  }
}


