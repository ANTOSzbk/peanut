import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { Message, Collection, Webhook } from 'discord.js';
import SettingsProvider from '../helpers/providers/SettingsProvider';
import ReactionMessagesProvider from '../helpers/providers/ReactionMessagesProvider';
import CaseHandler from '../helpers/structures/CaseHandler';
import Queue from '../helpers/structures/Queue';
import { Registry, register, Counter } from 'prom-client';
import { createServer, Server } from 'http'
import { EVENTS, TOPICS, LoggerProvider } from '../helpers/providers/LoggerProvider';
import { SETTINGS } from '../utils/constants';
import { Logger } from 'winston';
import { join } from 'path';
import { parse } from 'url'
import { MESSAGES } from '../utils/messages';
import MuteScheduler from '../helpers/structures/MuteScheduler';
import { create } from 'domain';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    caseHandler: CaseHandler;
    muteScheduler: MuteScheduler;
    config: PeanutOptions;
    settings: SettingsProvider;
    reactionMessages: ReactionMessagesProvider;
    webhooks: Collection<string, Webhook>;
    logger: Logger;
    prometheus: {
      messagesCounter: Counter<string>,
      commandCounter: Counter<string>,
      register: Registry,
    }
    promServer: Server,
  }
}

declare module 'discord.js' {
  interface Guild {
    caseQueue: Queue;
  }
}

interface PeanutOptions {
  owner?: string;
  token?: string;
}

export default class PeanutClient extends AkairoClient {
  public settings = new SettingsProvider();
  public logger = LoggerProvider;
  public reactionMessages = new ReactionMessagesProvider(this);

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: (message: Message): string =>
      this.settings.get(message.guild!, SETTINGS.PREFIX, process.env.COMMAND_PREFIX),
    aliasReplacement: /-/g,
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    defaultCooldown: 3000,
    argumentDefaults: {
      prompt: {
        modifyStart: (_, str) => MESSAGES.COMMAND_HANDLER.PROMPT.MODIFY_START(str),
        modifyRetry: (_, str) => MESSAGES.COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
        timeout: MESSAGES.COMMAND_HANDLER.PROMPT.TIMEOUT,
        ended: MESSAGES.COMMAND_HANDLER.PROMPT.ENDED,
        cancel: MESSAGES.COMMAND_HANDLER.PROMPT.CANCEL,
        retries: 3,
        time: 40000,
      },
      otherwise: '',
    },
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, '..', 'inhibitors'),
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners'),
  });

  public config: PeanutOptions;
  public caseHandler = new CaseHandler(this);
  public muteScheduler = new MuteScheduler(this);

  public prometheus = {
    messagesCounter: new Counter({ name: 'peanut_messages_counter', help: 'Total number of messages seen by Peanut.' }),
    commandCounter: new Counter({ name: 'peanut_command_counter', help: 'Total number of commands used.' }),
    register
  }

  public promServer = createServer((req, res) => {
    if (parse(req.url ?? '').pathname === '/metrics') {
      console.log('Received request at /metrics.')
      res.writeHead(200, { 'Content-Type': this.prometheus.register.contentType });
      res.write(this.prometheus.register.metrics());
    }
    res.end();
  })
  public constructor(config: PeanutOptions) {
    super(
      { ownerID: config.owner },
      {
        messageCacheMaxSize: 1000,
        disableMentions: 'everyone',
      }
    );

    this.config = config;

    process.on('unhandledRejection', (err: any) =>
      this.logger.error(err, { topic: TOPICS.UNHANDLED_REJECTION })
    );

    if (process.env.LOGS) {
      this.webhooks = new Collection();
    }
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
