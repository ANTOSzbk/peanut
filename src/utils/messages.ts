import { yellow, blue } from 'chalk';
import { stripIndents } from 'common-tags';
import { User, Guild, Webhook, TextChannel, Message } from 'discord.js';
import { Role } from 'discord.js';

export const MESSAGES = {
  SETTINGS: {
    INIT: 'Bot settings initialized',
  },
  COMMAND_HANDLER: {
    PROMPT: {
      MODIFY_START: (str: string) =>
        `${str}\n\nType \`cancel\` to cancel the command.`,
      MODIFY_RETRY: (str: string) =>
        `${str}\n\nType \`cancel\` to cancel the command.`,
      TIMEOUT: 'Time ran out, the command has been cancelled.',
      ENDED: 'Too many retries. The command has been cancelled.',
      CANCEL: 'The command has been cancelled.',
    },
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
  COMMANDS: {
    PREFIX: {
      DESCRIPTION: 'Displays or changes the prefix of the guild.',
      REPLY: (prefix: string | string[] | Promise<string | string[]>) =>
        `The current prefix for this guild is: \`${prefix}\``,
      REPLY_2: (prefix: string) => `the prefix has been reset to \`${prefix}\``,
      REPLY_3: (prefix: string) => `the prefix has been set to \`${prefix}\``,
    },
    HELP: {
      DESCRIPTION:
        'Displays a list of available commands, or detailed information for a specified command.',
      REPLY: (
        prefix: string | string[] | Promise<string | string[]>
      ) => `  A list of available commands.
        For additional info on a command, type \`${prefix}help <command>\`
      `,
    },
    CONFIG: {
      DESCRIPTION: stripIndents`Available methods:
      • set \`<key> <...arguments>\`
      • delete \`<key>\`
      • clear
      • toggle \`<key>\`
      Available keys:
      • mod \`<Role/RoleId>\`
      • logs \`<webhook>\`
      • memberLog \`<Channel/ChannelId>\` \`mention?[Yes/No]\`
      • modLog \`<Channel/ChannelId>\`
      • muted \`<Role/RoleId>\`
      Required: \`<>\` | Optional: \`[]\`
      `,
      REPLY: (
        prefix: string | string[] | Promise<string | string[]>
      ) => stripIndents`
      When you beg me so much I just can't not help you~
      Check \`${prefix}help config\` for more information.
      `,
      CREATE_WEBHOOK: {
        DESCRIPTION:
          'Creates a Webhook in the guild on a newly created channel',
        PROMPT: {
          PROMPT_1: (author: User | null) =>
            `${author}, type in a new channel name for a Webhook.`,
          PROMPT_2: (author: User | null) =>
            `${author}, type in a new Webhook name.`,
        },
        REPLY: (webhook: Webhook, channel: TextChannel) =>
          `successfully created Webhook with name **${webhook.name}** and ID **${webhook.id}** on channel **${channel.name}**.`,
      },
      CREATE_ROLE: {
        DESCRIPTION: 'Creates a role in the guild.',
        PROMPT: {
          START: (author: User | null) =>
            `${author}, type in the new role name.`,
        },
        EXISTS: (role: string) => `role with name ${role} already exists.`,
        REPLY: (role: Role) =>
          `successfully created role with name **${role.name}**.`,
      },
      CREATE_CHANNEL: {
        DESCRIPTION: 'Creates a text channel in the guild.',
        PROMPT: {
          START: (author: User | null) =>
            `${author}, type in the new channel name.`,
        },
        EXISTS: (channel: string) =>
          `role with name ${channel} already exists.`,
        REPLY: (channel: TextChannel) =>
          `successfully created role with name **${channel.name}**.`,
      },
      CLEAR: {
        DESCRIPTION: 'Clears the guild config.',
        REPLY: 'cleared the guild config.',
      },
      SET: {
        DESCRIPTION: 'Sets a value to the config.',
        REPLY: (
          prefix: string | string[] | Promise<string | string[]>
        ) => stripIndents`
        When you beg me so much I just can't not help you~
        Check \`${prefix}help config\` for more information.
      `,

        RESTRICT: {
          DESCRIPTION: 'Sets the restriction roles of the guild.',
          REPLY: (
            prefix: string | string[] | Promise<string | string[]>
          ) => stripIndents`
          When you beg me so much I just can't not help you~
          Check \`${prefix}help config\` for more information.
        `,

          EMBED: {
            DESCRIPTION: 'Sets the restriction role for embeds of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the embed restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the embed restricted role.`,
            },
            REPLY: (role: string) =>
              `set restricted role for embeds to **${role}**`,
          },

          EMOJI: {
            DESCRIPTION: 'Sets the restriction role for emojis of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the emoji restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the emoji restricted role.`,
            },
            REPLY: (role: string) =>
              `set restricted role for emojis to **${role}**`,
          },

          REACTION: {
            DESCRIPTION:
              'Sets the restriction role for reactions of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the reaction restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the reaction restricted role.`,
            },
            REPLY: (role: string) =>
              `set restricted role for reactions to **${role}**`,
          },

          TAG: {
            DESCRIPTION: 'Sets the restriction role for tags of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the tag restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the tag restricted role.`,
            },
            REPLY: (role: string) =>
              `set restricted role for tags to **${role}**`,
          },
        },

        CASES: {
          DESCRIPTION: 'Sets the case number of the guild.',
          REPLY: (cases: number) => `set cases to **${cases}**`,
        },

        ENTRY_ROLE: {
          DESCRIPTION: 'Sets entry role of the guild.',
          PROMPT: {
            START: async (message: Message) => {
              const roles = Array.from(message.guild!.roles.cache.values());

              const options = [`**0** - create new entry Role`];
              roles
                .filter(
                  (role) =>
                    !role.managed && message.guild!.roles.everyone !== role
                )
                .forEach((role, i) =>
                  options.push(`**${i + 1}** - <@&${role.id}>`)
                );
              return stripIndents(`${
                message.author
              }, what role should become entry Role?
              Available options:
              ${options.join('\n')}`);
            },
          },
          REPLY: (role: string) => `set entry role to ${role}`,
        },

        GUILD_LOG: {
          DESCRIPTION: 'Sets guild log on the server.',
          PROMPT: {
            START: async (author: User | null, guild: Guild | null) => {
              const webhooks = Array.from(
                (await guild!.fetchWebhooks()).values()
              );
              const options: any[] = [`**0** - create new Webhook`];
              webhooks.forEach((webhook, i) =>
                options.push(`**${i + 1}** - ${webhook.name} - [${webhook.id}]`)
              );

              return stripIndents(`${author}, what Webhook should send the messages?
              Available options:
              ${options.join('\n')}`);
            },
          },
          REPLY: 'activated guild logs.',
        },

        MEMBER_LOG: {
          DESCRIPTION: 'Sets member log on the server.',
          REPLY: (channel: string) =>
            `set member log channel to **${channel}**`,
          PROMPT: {
            START: (message: Message) => {
              const channels = Array.from(
                message.guild!.channels.cache.values()
              );
              const options: any[] = [`**0** - create new member log Channel`];
              channels
                .filter((channel) => channel.type === 'text')
                .forEach((channel, i) =>
                  options.push(`**${i + 1}** - <#${channel.id}>`)
                );
              return stripIndents(`${
                message.author
              }, what Channel should be member log channel?
              Available options:
              ${options.join('\n')}`);
            },
            START_2: (message: Message) =>
              `${message.author}, should member be mentioned in his welcome message? (Yes/No)`,
            RETRY_2: (message: Message) =>
              `${message.author}, please type in Yes or No.`,
          },
        },

        MOD: {
          DESCRIPTION:
            'Sets the mod role many of the commands use for permission checking.',
          REPLY: (role: string) => `set moderation role to **${role}**`,
          PROMPT: {
            START: async (message: Message) => {
              const roles = Array.from(message.guild!.roles.cache.values());

              const options = [`**0** - create new Moderator Role`];
              roles
                .filter(
                  (role) =>
                    !role.managed && message.guild!.roles.everyone !== role
                )
                .forEach((role, i) =>
                  options.push(`**${i + 1}** - <@&${role.id}>`)
                );
              return stripIndents(`${
                message.author
              }, what Role should become moderator Role?
              Available options:
              ${options.join('\n')}`);
            },
          },
        },

        MOD_LOG: {
          DESCRIPTION:
            'Sets the mod log many of the commands use to log moderation actions.',
          PROMPT: {
            START: (message: Message) => {
              const channels = Array.from(
                message.guild!.channels.cache.values()
              );
              const options: any[] = [`**0** - create new mod log Channel`];
              channels
                .filter((channel) => channel.type === 'text')
                .forEach((channel, i) =>
                  options.push(`**${i + 1}** - <#${channel.id}>`)
                );
              return stripIndents(`${
                message.author
              }, what Channel should be mod log channel?
                Available options:
                ${options.join('\n')}`);
            },
          },
          REPLY: (channel: string) =>
            `set moderation log channel to **${channel}**`,
        },

        MUTE: {
          DESCRIPTION: 'Sets the mute role of the guild.',
          REPLY: (role: string) => `set mute role to **${role}**`,
          PROMPT: {
            START: async (message: Message) => {
              const roles = Array.from(message.guild!.roles.cache.values());
              const options = [`**0** - create new mute Role`];
              roles
                .filter(
                  (role) =>
                    !role.managed && message.guild!.roles.everyone !== role
                )
                .forEach((role, i) =>
                  options.push(`**${i + 1}** - <@&${role.id}>`)
                );
              return stripIndents(`${
                message.author
              }, what Role should become mute Role?
              Available options:
              ${options.join('\n')}`);
            },
          },
        },
      },
    },
  },
};
