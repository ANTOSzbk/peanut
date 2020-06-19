import { Command } from 'discord-akairo';
import { Message, Permissions, Role, GuildEmoji, Emoji, MessageEmbed } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import * as emoji from 'node-emoji';
import { stripIndents } from 'common-tags';

// TODO:
// * add support for animated custom emojis

export default class CreateReactionRoleMessageCommand extends Command {
  previewMessage: Message | undefined;
  reactionEmbed: MessageEmbed | undefined;
  arguments: Message[] = [];
  parsedEmojis: (String | Emoji)[] = [];
  public async before(message: Message) {
    this.parsedEmojis = [];
    this.arguments = [];
    this.reactionEmbed = new MessageEmbed()
      .setTitle('Use any of reaction to retrieve a role!')
      .setDescription('Reacting to this message will reward you with a role.')
      .setColor('DARK_GOLD')
      .setFooter(`Reaction Role Message Preview`);
    this.previewMessage = await message.channel.send(
      stripIndents`**NOTE**: Embed below is a preview. Output message will be send separately.`,
      this.reactionEmbed
    );
  }
  private async cleanup(message: Message, argsOnly: boolean = false) {
    if (argsOnly) {
      await message.channel.bulkDelete(this.arguments.length);
      this.arguments = [];
      return;
    } else {
      await message.util?.lastResponse?.delete();
      await this.previewMessage?.delete();
      return;
    }
  }
  public constructor() {
    super('reaction-role-create', {
      // aliases: ['create'],
      description: {
        content: MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE,
        // usage: '',
      },
      category: 'reactionRoleMessages',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      argumentDefaults: {},
      args: [
        {
          id: 'emojiRoles',
          match: 'text',
          type: async (msg, phrase) => {
            const parsedArgs: {
              role?: Role | null;
              emoji?: String | Emoji | null;
              optionalText?: String | null;
            } = {};
            this.arguments?.push(msg);
            if (!phrase) return null;
            const args = phrase.split(' ');
            if (args.length < 2) {
              await msg.react('❎');
              return null;
            }
            args.map(async (arg, _, arr) => {
              const role = this.client.util.resolveRole(arg, msg.guild?.roles.cache!);
              if (role) return (parsedArgs.role = role);
              const unicode = emoji.find(arg);
              const custom = this.client.util.resolveEmoji(arg, msg.guild?.emojis.cache!);
              if (unicode)
                if (this.parsedEmojis?.includes(unicode.emoji)) {
                  await msg.react('❎');
                  return null;
                } else return (parsedArgs.emoji = unicode.emoji);
              if (custom)
                if (this.parsedEmojis?.includes(custom)) {
                  await msg.react('❎');
                  return null;
                } else return (parsedArgs.emoji = custom);
              if (arr.length > 2 && !role && !unicode && !custom) {
                const [, , ...description] = arr;
                return (parsedArgs.optionalText = description.join(' '));
              }
            });
            if (parsedArgs.role && parsedArgs.emoji) {
              this.reactionEmbed!.addField(
                '\u200b',
                stripIndents`${
                  parsedArgs.emoji instanceof Emoji
                    ? `<:${parsedArgs.emoji.name}:${parsedArgs.emoji.id}>`
                    : parsedArgs.emoji
                  }${parsedArgs.optionalText ? ` - ${parsedArgs.optionalText}` : ''} -> <@&${
                  parsedArgs.role.id
                  }>`
              );
              await msg.react('✅');
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                await this.previewMessage.edit(prevContent, this.reactionEmbed);
              }
              this.parsedEmojis?.push(parsedArgs.emoji);
              return parsedArgs;
            }
            await msg.react('❎');
            return null;
          },
          prompt: {
            time: 60 * 1000,
            infinite: true,
            modifyStart: () =>
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.PROMPT_1,
            modifyRetry: undefined,
          },
        },
        {
          id: 'description',
          match: 'text',
          type: async (msg, phrase) => {
            await this.cleanup(msg, true);
            this.arguments?.push(msg);
            if (!phrase) return null;
            if (phrase.length > 256) return null;
            if (phrase === 'skip') {
              this.reactionEmbed?.setDescription('\u200b');
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                await this.previewMessage.edit(prevContent, this.reactionEmbed);
              }
              return phrase;
            } else {
              this.reactionEmbed?.setDescription(phrase);
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                await this.previewMessage.edit(prevContent, this.reactionEmbed);
              }
              return phrase;
            }
          },
          prompt: {
            modifyStart: async (msg) => {
              await msg.util?.lastResponse
                ?.edit(MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.PROMPT_2);
            },
            modifyRetry: () => MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.TOO_LONG('description'),
          },
        },
        {
          id: 'title',
          match: 'text',
          type: async (msg, phrase) => {
            await this.cleanup(msg, true);
            this.arguments?.push(msg);
            if (!phrase) return null;
            if (phrase.length > 256) return null;
            if (phrase === 'skip') {
              this.reactionEmbed?.setTitle('\u200b');
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                await this.previewMessage.edit(prevContent, this.reactionEmbed);
              }
              return phrase;
            } else {
              this.reactionEmbed?.setTitle(phrase);
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                await this.previewMessage.edit(prevContent, this.reactionEmbed);
              }
              return phrase;
            }
          },
          prompt: {
            modifyStart: () =>
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.PROMPT_3,
            modifyRetry: () => MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.TOO_LONG('title'),
          },
        },
        {
          id: 'color',
          match: 'text',
          type: async (msg, phrase: any) => {
            await this.cleanup(msg, true);
            this.arguments?.push(msg);
            if (!phrase) return null;
            if (phrase === 'skip') {
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                this.previewMessage.edit(prevContent, this.reactionEmbed);
                return phrase;
              }
            } else if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(phrase)) {
              this.reactionEmbed?.setColor(phrase);
              if (this.previewMessage) {
                const prevContent = this.previewMessage.content;
                this.previewMessage.edit(prevContent, this.reactionEmbed);
                return phrase;
              }
            }
            return null;
          },
          prompt: {
            modifyStart: () =>
              MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.PROMPT_4,
            modifyRetry: () => MESSAGES.COMMANDS.UTIL.REACTION_MESSAGES.CREATE.PROMPTS.INVALID_COLOR,
          },
        },
      ],
    });
  }
  public async exec(
    message: Message,
    {
      emojiRoles,
    }: {
      emojiRoles: [{ role: Role; emoji: string | GuildEmoji; optionalText?: String | null }];
    }
  ) {
    this.reactionEmbed?.addField('\u200b', '\u200b');
    this.reactionEmbed?.setFooter('Reaction Role Message', this.client.user?.displayAvatarURL());
    await this.cleanup(message);
    const reactionMsg = await message.channel.send(this.reactionEmbed);
    const reactions: { emoji: string; role: string }[] = [];
    for (const emojiRole of emojiRoles) {
      await reactionMsg.react(emojiRole.emoji);
      const reaction = {
        emoji: emojiRole.emoji instanceof GuildEmoji ? emojiRole.emoji.id : emojiRole.emoji,
        role: emojiRole.role.id,
      };
      reactions.push(reaction);
    }
    await this.client.reactionMessages.create(reactionMsg.id, reactionMsg.channel.id, reactions);
    return;
  }
}
