import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { TOPICS, EVENTS } from '../../../helpers/providers/LoggerProvider';

export default class MessageDeleteReactionRoleListener extends Listener {
  public constructor() {
    super('messageDeleteReactionRole', {
      emitter: 'client',
      event: 'messageDelete',
      category: 'client',
    });
  }

  public async exec(message: Message) {
    const cachedReactionRoleMessages = Array.from(this.client.reactionMessages.items.keys())
    if (cachedReactionRoleMessages.includes(message.id)) {
      this.client.logger.info(`A reaction-role message being remotely deleted by user. Removing it from bot cache and database. ID: [${message.id}]`, { topic: TOPICS.DISCORD, event: EVENTS.MESSAGE_DELETE })
      this.client.reactionMessages.delete(message.id)
    }
  }
}