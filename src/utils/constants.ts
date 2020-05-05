export const PRODUCTION = process.env.NODE_ENV === 'production';

export enum SETTINGS {
  PREFIX = 'PREFIX',
  MODERATION = 'MODERATION',
  MOD_ROLE = 'MOD_ROLE',
  MOD_LOG = 'MOD_LOG',
  MUTE_ROLE = 'MUTE_ROLE',
  ENTRY_ROLE = 'ENTRY_ROLE',
  MINIGAMES = 'MINIGAMES',
  GUILD_LOG = 'GUILD_LOG',
  BLACKLIST = 'BLACKLIST',
  MEMBER_LOG = 'MEMBER_LOG',
}

export interface Settings {
  PREFIX: string;
  MODERATION: boolean;
  MOD_ROLE: string;
  MOD_LOG: string;
  MUTE_ROLE: string;
  ENTRY_ROLE: string;
  MINIGAMES: boolean;
  GUILD_LOG: string;
  BLACKLIST: string[];
  MEMBER_LOG: {
    ID: string;
    MENTION: boolean;
  };
}
