import { yellow, blue } from 'chalk';
import { stripIndents } from 'common-tags';
import { User, Guild, Webhook, TextChannel, Message, Role } from 'discord.js';
import { getGuildChannels, getGuildRoles, getGuildWebhooks } from '../helpers/structures/PeanutGuild';
import { PrefixSupplier } from 'discord-akairo';
import { GuildMember } from 'discord.js';

export const MESSAGES = {
  SETTINGS: {
    INIT: 'Bot guilds settings initialized',
  },
  REACTION_MESSAGES: {
    INIT: 'Reaction messages initialized.',
  },
  COMMAND_HANDLER: {
    PROMPT: {
      MODIFY_START: (str: string) => `${str}\n\nType \`cancel\` to cancel the command.`,
      MODIFY_RETRY: (str: string) => `${str}\n\nType \`cancel\` to cancel the command.`,
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
      LOG: (tag: string, id: string) => `${yellow(`${tag}`)} [${blue(`${id}`)}] started successfully.`,
      ACTIVITY: (username: string) => `${username} ready to help.`,
    },
    GUILD_CREATE: {
      LOG: (tag: string, guildName: string, guildId: string) =>
        `${yellow(`${tag}`)} just joined ${guildName} [${guildId}].`,
    },
    GUILD_MEMBER_ADD: {
      ERROR: (error: any, user: GuildMember) => `There was an error adding entry role to user ${user.user.tag}: ${error}`,
      ENTRY_ROLE: (user: GuildMember, guild: Guild, role: Role) => `Added role to new user ${user.user.tag} in guild ${guild.name} - ${role.name} [${role.id}].`
    }
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
      REPLY: (prefix: string | string[] | Promise<string | string[]>) => `  A list of available commands.
        For additional info on a command, type \`${prefix}help <command>\`
      `,
    },
    UTIL: {
      REACTION_MESSAGES: {
        DESCRIPTION: stripIndents`With this command you can create a Reaction Role ('RR') Message.
        Available methods:
        • \`create\` - starts a message creation wizard. 
        • \`clear\` - deletes all RR messages created by Peanut in this guild.   
        • \`check\` - displays all RR messages created by Peanut in this guild with current status.   
        • \`delete\` \`<message ID>\` - deletes a RR message from channel and Peanut database (requires Discord Developer HUD).
        • \`toggle\` \`<message ID>\` - disables/enables a RR message by given ID (requires Discord Developer HUD).
        `,
        REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
        For more information check \`${prefix}help rr\`.
        `,
        CREATE: {
          DESCRIPTION: 'Creates a reaction role message.',
        },
        CHECK: {
          DESCRIPTION:
            'Shows all the available reaction role messages in the guild with their current status.',
        },
        DELETE: {
          DESCRIPTION: 'Deletes a single reaction role message with specific ID from the guild.',
          PROMPT: {
            START: (message: Message) =>
              `${message.author}, what is the ID of reaction message to remove?`,
            RETRY: (author: User) => `${author}, That is not a valid message ID. Try again.`,
          },
          NO_MESSAGE: (author: User) =>
            `${author}, Peanut did not found Reaction-Role message with given ID. Maybe it is not his.`,
          SUCCESS: (author: User, id: String) =>
            `${author}, Deleted a reaction role message with **ID**: ${id}.`,
          UNKNOWN_ERROR: `An unknown error occured while deleting the reaction role message.`,
        },
        TOGGLE: {
          DESCRIPTION: 'Enables/disables a reaction role message with specific ID in the guild.',
          PROMPT: {
            START: (message: Message) =>
              `${message.author}, what is the ID of reaction message to enable/disable?`,
            RETRY: (author: User) => `${author}, That is not a valid message ID. Try again.`,
          },
          NO_MESSAGE: (author: User) =>
            `${author}, Peanut did not found Reaction-Role message with given ID. Maybe it is not his.`,
          SUCCESS: (author: User, id: String, toggle: Boolean) =>
            `${author}, ${!toggle ? 'Disabled' : 'Enabled'} a reaction role message with **ID**: ${id}.`,
          UNKNOWN_ERROR: `An unknown error occured while enabling/disabling the reaction role message.`,
        },
        CLEAR: {
          DESCRIPTION: 'Deletes all of reaction role messages in the guild.',
          NO_MESSAGES: (author: User) =>
            `${author}, Peanut did not found any Reaction-Role messages in this guild.`,
          SUCCESS: (author: User) =>
            `${author}, All reaction role messages in this guild deleted successfully.`,
          UNKNOWN_ERROR: `An unknown error occured while deleting the reaction role messages.`,
        },
      },
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
      REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
      When you beg me so much I just can't not help you~
      Check \`${prefix}help config\` for more information.
      `,
      CREATE_WEBHOOK: {
        DESCRIPTION: 'Creates a Webhook in the guild on a newly created channel',
        PROMPT: {
          PROMPT_1: (author: User | null) => `${author}, type in a new channel name for a Webhook.`,
          PROMPT_2: (author: User | null) => `${author}, type in a new Webhook name.`,
        },
        REPLY: (webhook: Webhook, channel: TextChannel) =>
          `successfully created Webhook with name **${webhook.name}** and ID **${webhook.id}** on channel **${channel.name}**.`,
      },
      CREATE_ROLE: {
        DESCRIPTION: 'Creates a role in the guild.',
        PROMPT: {
          START: (author: User | null) => `${author}, type in the new role name.`,
        },
        EXISTS: (role: string) => `role with name ${role} already exists.`,
        REPLY: (role: Role) => `successfully created role with name **${role.name}**.`,
      },
      CREATE_CHANNEL: {
        DESCRIPTION: 'Creates a text channel in the guild.',
        PROMPT: {
          START: (author: User | null) => `${author}, type in the new channel name.`,
        },
        EXISTS: (channel: string) => `channel with name ${channel} already exists.`,
        REPLY: (channel: TextChannel) => `successfully created channel with name **${channel.name}**.`,
      },
      CLEAR: {
        DESCRIPTION: 'Clears the guild config.',
        REPLY: 'cleared the guild config.',
      },
      CHECK: {
        DESCRIPTION: 'Checks the guild config.',
      },
      START: {
        DESCRIPTION: 'Starts the configuration wizard.',
        SKIP: (skipped: string[]) =>
          stripIndents`following modules were skipped due to being already set: \`${skipped.join(
            '`, `'
          )}\``,
        EMPTY: (
          prefix: string | string[] | Promise<string | string[]>
        ) => stripIndents`it seems like you are all set up. You can change now your configuration manually via \`${prefix}config <set/toggle>\`.
        If you want to use different prefix for your commands use \`${prefix}prefix <prefix>\`.
        To check your current configuration use \`${prefix}config check\``,
        FINISHED: (prefix: string | string[] | Promise<string | string[]>) =>
          stripIndents`config wizard sucessfully finished. You can change now your configuration manually via \`${prefix}config <set/toggle>\`.
          If you want to use different prefix for your commands use \`${prefix}prefix <prefix>\`.
          To check your current configuration use \`${prefix}config check\``,
      },
      TOGGLE: {
        DESCRIPTION: 'Toggles a value in the config.',
        REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
					Available keys for \`toggle\` are: \`mod/moderation\`.
					Check \`${prefix}help config\` for more information.
				`,

        MOD: {
          DESCRIPTION: 'Toggle moderation features on the server.',
          REPLY_ACTIVATED: 'successfully activated moderation commands!',
          REPLY_DEACTIVATED: 'successfully deactivated moderation commands!',
        },
      },
      DELETE: {
        DESCRIPTION: 'Deletes a value to the config.',
        REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
					When you beg me so much I just can't not help you~
					Check \`${prefix}help config\` for more information.
				`,
        GUILD_LOG: {
          DESCRIPTION: 'Deletes logs on the server.',
          REPLY: 'deleted guild log channel.',
        },

        CASES: {
          DESCRIPTION: 'Deletes the case number of the guild.',
          REPLY: 'deleted cases.',
        },

        MEMBER_LOG: {
          DESCRIPTION: 'Deletes member log on the server.',
          REPLY: 'deleted member log channel.',
        },

        MOD: {
          DESCRIPTION: 'Deletes the mod role.',
          REPLY: 'deleted moderation role.',
        },

        MOD_LOG: {
          DESCRIPTION: 'Deletes the mod log.',
          REPLY: 'deleted moderation log channel.',
        },

        MUTE: {
          DESCRIPTION: 'Deletes the mute role of the guild.',
          REPLY: 'deleted mute role.',
        },
        ENTRY_ROLE: {
          DESCRIPTION: 'Deletes the entry role of the guild.',
          REPLY: 'deleted entry role.',
        },
      },
      SET: {
        DESCRIPTION: 'Sets a value to the config.',
        REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
        When you beg me so much I just can't not help you~
        Check \`${prefix}help config\` for more information.
      `,

        RESTRICT: {
          DESCRIPTION: 'Sets the restriction roles of the guild.',
          REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
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
            REPLY: (role: string) => `set restricted role for embeds to **${role}**`,
          },

          EMOJI: {
            DESCRIPTION: 'Sets the restriction role for emojis of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the emoji restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the emoji restricted role.`,
            },
            REPLY: (role: string) => `set restricted role for emojis to **${role}**`,
          },

          REACTION: {
            DESCRIPTION: 'Sets the restriction role for reactions of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the reaction restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the reaction restricted role.`,
            },
            REPLY: (role: string) => `set restricted role for reactions to **${role}**`,
          },

          TAG: {
            DESCRIPTION: 'Sets the restriction role for tags of the guild.',
            PROMPT: {
              START: (author: User | null) =>
                `${author}, what role should act as the tag restricted role?`,
              RETRY: (author: User | null) =>
                `${author}, please mention a proper role to be the tag restricted role.`,
            },
            REPLY: (role: string) => `set restricted role for tags to **${role}**`,
          },
        },

        CASES: {
          DESCRIPTION: 'Sets the case number of the guild.',
          REPLY: (cases: number) => `Set cases to **${cases}**`,
        },

        ENTRY_ROLE: {
          DESCRIPTION: 'Sets entry role of the guild.',
          PROMPT: {
            START: async (message: Message) => {
              const roles = getGuildRoles(message.guild!);
              const options = [`**0** - create new entry Role`];
              roles.forEach((role, i) => options.push(`**${i + 1}** - <@&${role.id}>`));
              return stripIndents(`${message.author}, what role should become entry Role?
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
              const webhooks = await getGuildWebhooks(guild!);
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
          REPLY: (channel: string) => `set member log channel to **${channel}**`,
          PROMPT: {
            START: (message: Message) => {
              const channels = getGuildChannels(message.guild!);
              const options: any[] = [`**0** - create new member log Channel`];
              channels.forEach((channel, i) => options.push(`**${i + 1}** - <#${channel.id}>`));
              return stripIndents(`${message.author}, what Channel should be member log channel?
              Available options:
              ${options.join('\n')}`);
            },
            START_2: (message: Message) =>
              `${message.author}, should member be mentioned in his welcome message? (Yes/No)`,
            RETRY_2: (message: Message) => `${message.author}, please type in Yes or No.`,
          },
        },

        MOD: {
          DESCRIPTION: 'Sets the mod role many of the commands use for permission checking.',
          REPLY: (role: string) => `set moderation role to **${role}**`,
          PROMPT: {
            START: async (message: Message) => {
              const roles = getGuildRoles(message.guild!);
              const options = [`**0** - create new moderator Role`];
              roles.forEach((role, i) => options.push(`**${i + 1}** - <@&${role.id}>`));
              return stripIndents(`${message.author}, what Role should become moderator Role?
              Available options:
              ${options.join('\n')}`);
            },
          },
        },

        MOD_LOG: {
          DESCRIPTION: 'Sets the mod log many of the commands use to log moderation actions.',
          PROMPT: {
            START: (message: Message) => {
              const channels = getGuildChannels(message.guild!);
              const options: any[] = [`**0** - create new mod log Channel`];
              channels.forEach((channel, i) => options.push(`**${i + 1}** - <#${channel.id}>`));
              return stripIndents(`${message.author}, what Channel should be mod log channel?
                Available options:
                ${options.join('\n')}`);
            },
          },
          REPLY: (channel: string) => `set moderation log channel to **${channel}**`,
        },

        MUTE: {
          DESCRIPTION: 'Sets the mute role of the guild.',
          REPLY: (role: string) => `set mute role to **${role}**`,
          PROMPT: {
            START: async (message: Message) => {
              const roles = getGuildRoles(message.guild!);
              const options = [`**0** - create new mute Role`];
              roles.forEach((role, i) => options.push(`**${i + 1}** - <@&${role.id}>`));
              return stripIndents(`${message.author}, what Role should become mute Role?
              Available options:
              ${options.join('\n')}`);
            },
          },
        },
      },
    },
    MOD: {
      CASES: {
        DESCRIPTION: stripIndents`Available methods:
					 • show \`<number>\`
					 • delete \`<number>\`
					Required: \`<>\` | Optional: \`[]\`
				`,
        REPLY: (prefix: string | string[] | Promise<string | string[]>) => stripIndents`
					When you beg me so much I just can't not help you~
					Check \`${prefix}help cases\` for more information.
				`,

        DELETE: {
          DESCRIPTION: 'Delete a case from the database.',
          PROMPT: {
            START: (author: User | null) => `${author}, what case do you want to delete?`,
            RETRY: (author: User | null) => `${author}, please enter a case number.`,
          },
          NO_CASE_NUMBER: 'at least provide me with a correct number.',
          NO_CASE:
            "I looked where I could, but I couldn't find a case with that Id, maybe look for something that actually exists next time!",
          DELETE: 'You sure you want me to delete this case?',
          DELETING: (id: number) => `Deleting **${id}**...`,
          TIMEOUT: 'timed out. Cancelled delete.',
          CANCEL: 'cancelled delete.',
          REPLY: (id: number) => `Successfully deleted case **${id}**`,
        },

        SHOW: {
          DESCRIPTION: 'Inspect a case, pulled from the database.',
          PROMPT: {
            START: (author: User | null) => `${author}, what case do you want to look up?`,
            RETRY: (author: User | null) => `${author}, please enter a case number.`,
          },
          NO_CASE_NUMBER: 'at least provide me with a correct number.',
          NO_CASE:
            "I looked where I could, but I couldn't find a case with that Id, maybe look for something that actually exists next time!",
        },
      },
      BAN: {
        DESCRIPTION: 'Bans a member.',
        PROMPT: {
          START: (author: User | null) => `${author}, what member do you want to ban?`,
          RETRY: (author: User | null) => `${author}, please mention a member.`,
        },
      },

      DURATION: {
        DESCRIPTION: 'Sets the duration for a mute and reschedules it.',
        PROMPT: {
          START: (author: User | null) => `${author}, what case do you want to add a duration to?`,
          RETRY: (author: User | null) => `${author}, please enter a case number.`,
        },
        PROMPT_2: {
          START: (author: User | null) => `${author}, for how long do you want the mute to last?`,
          RETRY: (author: User | null) => `${author}, please use a proper time format.`,
        },
        NO_CASE_NUMBER: 'at least provide me with a correct number.',
        NO_CASE:
          "I looked where I could, but I couldn't find a case with that Id, maybe look for something that actually exists next time!",
        WRONG_MOD: "you'd be wrong in thinking I would let you fiddle with other peoples achievements!",
        NO_MESSAGE: "looks like the message doesn't exist anymore!",
        REPLY: (id: number) => `Successfully updated duration for case **#${id}**`,
      },

      HISTORY: {
        DESCRIPTION: 'Check the history of a member.',
        NO_PERMISSION: 'you know, I know, we should just leave it at that.',
      },

      KICK: {
        DESCRIPTION: 'Kicks a member.',
        PROMPT: {
          START: (author: User | null) => `${author}, what member do you want to kick?`,
          RETRY: (author: User | null) => `${author}, please mention a member.`,
        },
      },

      MUTE: {
        DESCRIPTION: 'Mutes a member.',
        PROMPT: {
          START: (author: User | null) => `${author}, what member do you want to mute?`,
          RETRY: (author: User | null) => `${author}, please mention a member.`,
        },
        PROMPT_2: {
          START: (author: User | null) => `${author}, for how long do you want the mute to last?`,
          RETRY: (author: User | null) => `${author}, please use a proper time format.`,
        },
      },

      REASON: {
        DESCRIPTION: 'Sets/Updates the reason of a modlog entry.',
        PROMPT: {
          START: (author: User | null) => `${author}, what case do you want to add a reason to?`,
          RETRY: (author: User | null) => `${author}, please enter a case number.`,
        },
        NO_CASE_NUMBER: 'at least provide me with a correct number.',
        NO_CASE:
          "I looked where I could, but I couldn't find a case with that Id, maybe look for something that actually exists next time!",
        WRONG_MOD: "you'd be wrong in thinking I would let you fiddle with other peoples achievements!",
        NO_MESSAGE: "looks like the message doesn't exist anymore!",
        REPLY: (ids: number[]) =>
          `Successfully set reason for ${
          ids.length === 1 ? `case **#${ids[0]}**` : `cases **#${ids[0]}-#${ids[ids.length - 1]}**`
          }`,
      },

      SOFTBAN: {
        DESCRIPTION: 'Softbans a member.',
        PROMPT: {
          START: (author: User | null) => `${author}, what member do you want to softban?`,
          RETRY: (author: User | null) => `${author}, please mention a member.`,
        },
      },

      UNBAN: {
        DESCRIPTION: 'Unbans a user.',
        PROMPT: {
          START: (author: User | null) => `${author}, what member do you want to unban?`,
          RETRY: (author: User | null) => `${author}, please mention a member.`,
        },
      },

      WARN: {
        DESCRIPTION: 'Warns a user.',
        PROMPT: {
          START: (author: User | null) => `${author}, what member do you want to warn?`,
          RETRY: (author: User | null) => `${author}, please mention a member.`,
        },
      },
    },
  },
  ACTIONS: {
    INVALID_MEMBER: 'you have to provide a valid user on this guild.',
    INVALID_USER: 'you have to provide a valid user not on this guild.',
    NO_STAFF: "nuh-uh! You know you can't do this.",
    CURRENTLY_MODERATED: 'that user is currently being moderated by someone else.',
    NO_MUTE: 'there is no mute role configured on this server.',

    BAN: {
      AWAIT_MESSAGE: 'Are you sure you want me to ban this user from the guild?',
      TIMEOUT: 'timed out. Cancelled ban.',
      CANCEL: 'cancelled ban.',
      MESSAGE: (guild: Guild, reason?: string) => stripIndents`
				**You have been banned from ${guild.name}**
				${reason ? `\n**Reason:** ${reason}\n` : ''}
				You can appeal your ban by DMing \`${
        guild.owner?.user.tag
        }\` or guild moderators with a message why you think you deserve to have your ban lifted.
			`,
      AUDIT: (tag: string, cases: number) => `Banned by ${tag} | Case #${cases}`,
      DM_BLOCKED: (tag: string) => `Error sending ban info message to user ${tag} - he has DM blocked.`,
      ERROR: (error: string) => `there was an error banning this member \`${error}\``,
      PRE_REPLY: (tag: string) => `Banning **${tag}**...`,
      REPLY: (tag: string) => `Successfully banned **${tag}**`,
    },

    KICK: {
      MESSAGE: (guild: string, reason?: string) => stripIndents`
				**You have been kicked from ${guild}**
				${reason ? `\n**Reason:** ${reason}\n` : ''}
				You may rejoin whenever.
			`,
      AUDIT: (tag: string, cases: number) => `Kicked by ${tag} | Case #${cases}`,
      DM_BLOCKED: (tag: string) => `Error sending kick info message to user ${tag} - he has DM blocked.`,
      ERROR: (error: string) => `there was an error kicking this member \`${error}\``,
      PRE_REPLY: (tag: string) => `Kicking **${tag}**...`,
      REPLY: (tag: string) => `Successfully kicked **${tag}**`,
    },

    MUTE: {
      AUDIT: (tag: string, cases: number) => `Muted by ${tag} | Case #${cases}`,
      ERROR: (error: string) => `there was an error muting this member \`${error}\``,
      PRE_REPLY: (tag: string) => `Muting **${tag}**...`,
      REPLY: (tag: string) => `Successfully muted **${tag}**`,
    },

    SOFTBAN: {
      MESSAGE: (guild: string, reason?: string) => stripIndents`
				**You have been softbanned from ${guild}**
				${reason ? `\n**Reason:** ${reason}\n` : ''}
				A softban is a kick that uses ban + unban to remove your messages from the server.
				You may rejoin whenever.
      `,
      DM_BLOCKED: (tag: string) => `Error sending ban info message to user ${tag} - he has DM blocked.`,
      AUDIT: (tag: string, cases: number) => `Softbanned by ${tag} | Case #${cases}`,
      ERROR: (error: string) => `there was an error softbanning this member \`${error}\``,
      PRE_REPLY: (tag: string) => `Softbanning **${tag}**...`,
      REPLY: (tag: string) => `Successfully softbanned **${tag}**`,
    },

    UNBAN: {
      AUDIT: (tag: string, cases: number) => `Unbanned by ${tag} | Case #${cases}`,
      ERROR: (error: string) => `there was an error unbanning this member \`${error}\``,
      PRE_REPLY: (tag: string) => `Unbanning **${tag}**...`,
      REPLY: (tag: string) => `Successfully unbanned **${tag}**`,
    },

    WARN: {
      PRE_REPLY: (tag: string) => `Warning **${tag}**...`,
      REPLY: (tag: string) => `Successfully warned **${tag}**`,
    },
  },
};
