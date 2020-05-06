import { Argument, Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';
import { SETTINGS } from '../../../utils/constants';
import CreateWebhookCommand from '../createWebhook';
import { getGuildWebhooks } from '../../../helpers/guildData';

export default class SetConfigGuildLogCommand extends Command {
  public constructor() {
    super('config-set-guildlog', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.SET.GUILD_LOG.DESCRIPTION,
        usage: '<webhook>',
        examples: ['707163036477030450', 'My Webhook'],
      },
      category: 'config',
      channel: 'guild',
      clientPermissions: [Permissions.FLAGS.MANAGE_WEBHOOKS],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'webhook',
          match: 'content',
          type: Argument.union('number', 'string'),
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.SET.GUILD_LOG.PROMPT.START(
                message.author,
                message.guild
              ),
          },
        },
      ],
    });
  }
  public async exec(message: Message, { webhook }: { webhook: number }) {
    const guild = message.guild!;
    if (webhook === 0) {
      const createWebhook = new CreateWebhookCommand();
      const wh = await createWebhook.exec(message, {
        channel: 'guild-log',
        webhook: 'Guild Log',
      });
      if (!wh) return;
      this.client.webhooks.set(wh.id, wh);
      this.client.settings.set(guild, SETTINGS.GUILD_LOG, wh.id);
    } else {
      const webhooks = await getGuildWebhooks(message.guild!);
      this.client.settings.set(
        guild,
        SETTINGS.GUILD_LOG,
        webhooks[webhook - 1].id
      );
      const wh = (await guild.fetchWebhooks()).get(webhooks[webhook - 1].id);
      if (!wh) return;
      this.client.webhooks.set(wh.id, wh);
    }
    return message.util?.reply(MESSAGES.COMMANDS.CONFIG.SET.GUILD_LOG.REPLY);
  }
}
