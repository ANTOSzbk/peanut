import PeanutClient from './client/PeanutClient';
import { PeanutGuild } from './helpers/structures/PeanutGuild';
import { TOPICS, EVENTS } from './helpers/providers/LoggerProvider';

PeanutGuild();

const client = new PeanutClient({
  owner: process.env.OWNERS,
  token: process.env.TOKEN,
});

client
  .on('error', (err) =>
    client.logger.error(err.message, {
      topic: TOPICS.DISCORD,
      event: EVENTS.ERROR,
    })
  )
  .on('shardError', (err, id) =>
    client.logger.error(err.message, {
      topic: TOPICS.DISCORD,
      event: `SHARD ${id} ERROR`,
    })
  )
  .on('warn', (info) =>
    client.logger.warn(info, { topic: TOPICS.DISCORD, event: EVENTS.WARN })
  );

client.start();
