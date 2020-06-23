import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { green, yellow, keyword, hex, bold } from 'chalk';
import { stripIndents } from 'common-tags';

export enum TOPICS {
  UNHANDLED_REJECTION = `UNHANLED_REJECTION`,
  DISCORD = 'DISCORD',
  DISCORD_AKAIRO = 'DISCORD_AKAIRO',
  RPC = 'RPC',
  METRICS = 'METRICS',
}

export enum EVENTS {
  INIT = 'INIT',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  WARN = 'WARN',
  READY = 'READY',
  GUILD_CREATE = 'GUILD_CREATE',
  GUILD_MEMBER_ADD = 'GUILD_MEMBER_ADD',
  MUTE = 'MUTE',
  IDENTIFY = 'IDENTIFY',
  DESTROY = 'DESTROY',
  CONNECT = 'CONNECT',
  DISCONNECT = 'DISCONNECT',
  COMMAND_ERROR = 'COMMAND_ERROR',
  COMMAND_BLOCKED = 'COMMAND_BLOCKED',
  COMMAND_CANCELLED = 'COMMAND_CANCELLED',
  COMMAND_STARTED = 'COMMAND_STARTED',
  COMMAND_FINISHED = 'COMMAND_FINISHED',
  MESSAGE_BLOCKED = 'MESSAGE_BLOCKED',
  MESSAGE_DELETE = 'MESSAGE_DELETE'
}

export const LoggerProvider = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: 'BOT' }),
    format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    format.printf((info: any): string => {
      const { timestamp, label, level, message, topic, event, ...rest } = info;
      let levelHex;
      switch (level) {
        case 'error':
          levelHex = '#d70000'
          break;
        case 'warn':
          levelHex = '#d7005f'
          break;
        case 'info':
          levelHex = '#afaf00'
          break;
        default: levelHex = '#afff00'
      }
      let topicHex;
      switch (topic) {
        case TOPICS.DISCORD_AKAIRO:
          topicHex = '#663300'
          break;
        case TOPICS.DISCORD:
          topicHex = '#0099ff'
          break;
        case TOPICS.UNHANDLED_REJECTION:
          topicHex = '#ff0000'
          break;
        default: topicHex = '#afff00'
      }
      return stripIndents`> ${keyword('plum')([`${timestamp}`])} 
      $ ${keyword('gold').bold([`[${label}]`])}${hex(levelHex).bold(`[${level.toUpperCase()}]`)}${hex(topicHex).bold(`[${topic}]`)}${event ? `${hex('#aaaa55').bold(`${`[${event}]`}`)}` : ''
        }: ${message}${
        Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''
        }`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.colorize({ level: true }),
      level: 'info',
    }),
    new DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      level: 'debug',
      filename: 'peanut-%DATE%.log',
      maxFiles: '14d',
    }),
  ],
});
