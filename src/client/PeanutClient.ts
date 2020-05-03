import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import { Message } from 'discord.js';
import HasuraProvider from '../helpers/SettingsProvider';
import { EVENTS, TOPICS, LoggerProvider } from '../helpers/LoggerProvider';
import { SETTINGS } from '../utils/constants';
import { Logger } from 'winston';
import { join } from 'path';
import { MESSAGES } from '../utils/messages';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    config: PeanutOptions;
    settings: HasuraProvider;
    logger: Logger;
  }
}

interface PeanutOptions {
  owner?: string;
  token?: string;
}

export default class PeanutClient extends AkairoClient {
  public settings = new HasuraProvider();
  public logger = LoggerProvider;

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: (message: Message): string => {
      return this.settings.get(
        message.guild!,
        SETTINGS.PREFIX,
        process.env.COMMAND_PREFIX
      );
    },
    aliasReplacement: /-/g,
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    defaultCooldown: 3000,
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, '..', 'inhibitors'),
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners'),
  });

  public config: PeanutOptions;

  public constructor(config: PeanutOptions) {
    super(
      { ownerID: config.owner },
      {
        messageCacheMaxSize: 1000,
        disableMentions: 'everyone',
      }
    );

    this.config = config;
  }

  private async _init() {
    this.commandHandler.loadAll();
    this.logger.info(MESSAGES.COMMAND_HANDLER.LOADED, {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
    this.inhibitorHandler.loadAll();
    this.logger.info(MESSAGES.INHIBITOR_HANDLER.LOADED, {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
    this.listenerHandler.loadAll();
    this.logger.info(MESSAGES.LISTENER_HANDLER.LOADED, {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
    await this.settings.init();
    this.logger.info(MESSAGES.SETTINGS.INIT, {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
  }

  public async start() {
    await this._init();
    return this.login(this.config.token);
  }
}
