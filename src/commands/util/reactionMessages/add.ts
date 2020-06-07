import { Command } from 'discord-akairo';
import { Message, Permissions, Role, GuildEmoji, Emoji, MessageEmbed } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';
import * as emoji from 'node-emoji';
import { stripIndents } from 'common-tags';

// TODO:
// * add support for animated custom emojis
// * condition to not duplicate emojis (roles can be duplicated)
// * color of an embed set by USER

export default class AddReactionMessageCommand extends Command {
  previewMessage: Message | undefined;
  reactionEmbed: MessageEmbed | undefined;
  arguments: Message[] = [];
  public async before(message: Message) {
    this.reactionEmbed = new MessageEmbed()
      .setTitle('Use any of reaction to retrieve a role!')
      .setDescription('Reacting to this message will reward you with a role.')
      .setFooter(`Reaction Role Message Preview`);
    this.previewMessage = await message.channel.send(
      stripIndents`**NOTE**: Embed below is a preview. Output message will be send separately.`,
      this.reactionEmbed
    );
  }
  public async cleanup(message: Message, argsOnly: boolean = false) {
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
      category: 'util',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      argumentDefaults: {},
      args: [
        {
          id: 'emojiRole',
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
            args.map((arg, _, arr) => {
              const role = this.client.util.resolveRole(arg, msg.guild?.roles.cache!);
              if (role) return (parsedArgs.role = role);
              const unicode = emoji.find(arg);
              const custom = this.client.util.resolveEmoji(arg, msg.guild?.emojis.cache!);
              if (unicode) return (parsedArgs.emoji = unicode.emoji);
              if (custom) return (parsedArgs.emoji = custom);
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
              return parsedArgs;
            }
            await msg.react('❎');
            return null;
          },
          prompt: {
            time: 10 * 1000,
            infinite: true,
            modifyStart: () =>
              stripIndents`\nPlease type in an **EMOJI AND ROLE** as following (order does not matter) \`<emoji> <@MyRole> [optional description]\`
              **Example**: \`🍔 @Hamburger Lover for hamburger lovers\`\n 
              Type \`stop\` whenever you are done or \`cancel\` if you want to start over again.`,
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
                ?.edit(stripIndents`\nPlease type in a **DESCRIPTION** for embed \`<description>\`
            **Example**: \`Reacting to this message will reward you with a role.\`\n
            Type \`skip\` if you don't want any description or \`cancel\` if you want to start over again.`);
            },
            modifyRetry: () => 'Provided description is too long (max 256 characters). Try again.',
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
              stripIndents`\nPlease type in a **TITLE** for embed \`<title>\`
            **Example**: \`Use any of reaction to retrieve a role!\`\n
            Type \`skip\` if you don't want any title or \`cancel\` if you want to start over again.`,
            modifyRetry: () => 'Provided title is too long (max 256 characters). Try again.',
          },
        },
        // {
        //   id: 'color',
        //   match: 'text',
        //   type: Argument.validate('color', (_msg, phrase, value) => {
        //     if (phrase === 'skip') {
        //       this.reactionEmbed?.setColor('blue');
        //       if (this.previewMessage) {
        //         const prevContent = this.previewMessage.content;
        //         this.previewMessage.edit(prevContent, this.reactionEmbed);
        //       }
        //     } else {
        //       this.reactionEmbed?.setColor(value);
        //       if (this.previewMessage) {
        //         const prevContent = this.previewMessage.content;
        //         this.previewMessage.edit(prevContent, this.reactionEmbed);
        //       }
        //     }
        //     return true;
        //   }),
        //   prompt: {
        //     modifyStart: () =>
        //       stripIndents`\nPlease type in a color for embed in hex or text format \`<color>]\`
        //     **Example**: \`#FFFFFF/white\`\n
        //     Type \`skip\` if you want to keep default color or \`cancel\` if you want to start over again.`,
        //     modifyRetry: () => 'Could not resolve color from the input. Try again.',
        //     ended: async (msg: Message) => await this.cleanup(msg, true),
        //     timeout: async (msg: Message) => await this.cleanup(msg, true),
        //   },
        // },
      ],
    });
  }
  public async exec(
    message: Message,
    {
      emojiRole,
      description,
    }: // description,
    // title,
    // color,
    {
      emojiRole: [{ role: Role; emoji: string | GuildEmoji; optionalText?: String | null }];
      description: string;
      //   title: string;
      //   color: ColorResolvable;
    }
  ) {
    this.reactionEmbed?.addField('\u200b', '\u200b');
    this.reactionEmbed?.setFooter('Reaction Role Message', this.client.user?.displayAvatarURL());
    await this.cleanup(message);
    const reactionMsg = await message.channel.send(this.reactionEmbed);
    emojiRole.forEach(async (emojiRole) => {
      await reactionMsg.react(emojiRole.emoji);
    });
    return;
  }
}
