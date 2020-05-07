export const PRODUCTION = process.env.NODE_ENV === 'production';

export enum ACTIONS {
  BAN = 1,
  UNBAN,
  SOFTBAN,
  KICK,
  MUTE,
  WARN,
}

export enum SETTINGS {
  CASES = 'CASES',
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
  CASES: number;
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

export enum COLORS {
  BAN = 16718080,
  UNBAN = 8450847,
  SOFTBAN = 16745216,
  KICK = 16745216,
  MUTE = 16763904,
  TAG = 16776960,
  WARN = 16776960,

  MEMBER_JOIN = 8450847,
  MEMBER_LEFT = 16745216,
}
