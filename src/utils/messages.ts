import { greenBright, yellow, blue, yellowBright } from 'chalk';

export const MESSAGES = {
  SETTINGS: {
    INIT: 'Bot settings initialized',
  },
  COMMAND_HANDLER: {
    LOADED: 'Command handler loaded',
  },
  LISTENER_HANDLER: {
    LOADED: 'Listener handler loadeed',
  },
  INHIBITOR_HANDLER: {
    LOADED: 'Inhibitor handler loaded',
  },
  EVENTS: {
    READY: {
      LOG: (tag: string, id: string) =>
        `${yellow(`${tag}`)} [${blue(`${id}`)}] started successfully.`,
      ACTIVITY: (username: string) => `${username} ready to help.`,
    },
    GUILD_CREATE: {
      LOG: (tag: string, guildName: string, guildId: string) =>
        `${yellow(`${tag}`)} just joined ${guildName} [${guildId}].`,
    },
  },
};
