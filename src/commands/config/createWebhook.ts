import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';

export default class CreateWebhookCommand extends Command {
  public constructor() {
    super('create-webhook', {
      aliases: ['create-webhook'],
      description: {
        content: MESSAGES.COMMANDS.CONFIG.CREATE_WEBHOOK.DESCRIPTION,
        usage: '<channel> <webhook>',
        examples: ['Log-Channel Log Webhook', 'Log-Channel'],
      },
      category: 'config',
      channel: 'guild',
      clientPermissions: [Permissions.FLAGS.MANAGE_WEBHOOKS],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'channel',
          match: 'content',
          type: 'string',
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.CREATE_WEBHOOK.PROMPT.PROMPT_1(
                message.author
              ),
          },
        },
        {
          id: 'webhook',
          match: 'content',
          type: 'string',
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.CREATE_WEBHOOK.PROMPT.PROMPT_2(
                message.author
              ),
          },
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { channel, webhook }: { channel: string; webhook: string }
  ) {
    const newChannel = await message.guild?.channels.create(channel);
    const newWebhook = await newChannel?.createWebhook(webhook);
    if (this.client) this.client.webhooks.set(newWebhook!.id, newWebhook!);
    message.util?.reply(
      MESSAGES.COMMANDS.CONFIG.CREATE_WEBHOOK.REPLY(newWebhook!, newChannel!)
    );
    return newWebhook;
  }
}
