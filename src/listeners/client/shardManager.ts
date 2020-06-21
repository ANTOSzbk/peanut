import { Listener } from 'discord-akairo';
import { MESSAGES } from '../../utils/messages';
import { TOPICS } from '../../helpers/providers/LoggerProvider';

export class ShardDisconnectListener extends Listener {
  public constructor() {
    super('shardDisconnected', {
      emitter: 'client',
      event: 'shardDisconnect',
      category: 'client',
    });
  }

  public exec(event: any, id: number) {
    this.client.logger.warn(MESSAGES.EVENTS.SHARD_DISCONNECT.LOG(event.code), {
      topic: TOPICS.DISCORD,
      event: `SHARD ${id} DISCONNECT`,
    });
    this.client.promServer.close();
    this.client.logger.info(`Metrics server closed.`, { topic: TOPICS.METRICS, event: `SHARD ${id} DISCONNECT` });
  }
}

export class ShardReconnectListener extends Listener {
  public constructor() {
    super('shardReconnecting', {
      emitter: 'client',
      event: 'shardReconnecting',
      category: 'client',
    });
  }

  public exec(id: number) {
    this.client.logger.info(MESSAGES.EVENTS.SHARD_RECONNECT.LOG, {
      topic: TOPICS.DISCORD,
      event: `SHARD ${id} RECONNECTING`,
    });
    this.client.promServer.close();
    this.client.logger.info(`Metrics server closed.`, { topic: TOPICS.METRICS, event: `SHARD ${id} RECONNECTING` });
  }
}

export default class ShardResumeListener extends Listener {
  public constructor() {
    super('shardResume', {
      emitter: 'client',
      event: 'shardResume',
      category: 'client',
    });
  }

  public exec(id: number) {
    this.client.logger.info(MESSAGES.EVENTS.SHARD_RESUME.LOG, {
      topic: TOPICS.DISCORD,
      event: `SHARD ${id} RESUME`,
    });
    this.client.promServer.listen(5500);
    this.client.logger.info(`Metrics listening on 5500`, { topic: TOPICS.METRICS, event: `SHARD ${id} RESUME` });
  }
}
