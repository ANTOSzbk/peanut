import { greenBright, yellow, blue, yellowBright } from 'chalk';

export const MESSAGES = {
  EVENTS: {
    READY: {
      LOG: (tag: string, id: string) =>
        `${greenBright('[READY]')}: ${yellow(`${tag}`)} [${blue(
          `${id}`
        )}] started successfully.`,
      ACTIVITY: (username: string) => `${username} ready to help.`,
    },
    GUILD_CREATE: {
      LOG: (tag: string, guildName: string, guildId: string) => {
        `${yellowBright('GUILD_CREATE')}: ${yellow(
          `${tag}`
        )} just joined ${guildName} [${guildId}].`;
      },
    },
  },
};
