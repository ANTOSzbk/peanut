import { Provider } from 'discord-akairo';
import { Guild, Message, Channel, Collection } from 'discord.js';
import { PRODUCTION, ReactionMessages } from '../../utils/constants';
import { graphQLClient } from '../../utils/graphQL/apolloClient';
import { QUERY, MUTATION } from '../../utils/queries/reactionMessages';
import {
  ReactionMessages as GraphQLReactionMessages,
  ReactionMessagesInsertInput,
} from '../../utils/graphQL/graphQLTypes';
import PeanutClient from '../../client/PeanutClient';
import { TextChannel } from 'discord.js';
import { TOPICS, EVENTS } from './LoggerProvider';

export type ReactionItems = {
  channel: string;
  disabled: boolean;
  reactions: { emoji: string; role: string }[] | any[];
};

export default class ReactionMessagesProvider extends Provider {
  public ['constructor']: typeof ReactionMessagesProvider;
  public items!: Collection<string, ReactionItems>;
  public constructor(private readonly client: PeanutClient) {
    super();
  }

  public async init() {
    const { data } = await graphQLClient.query<any, ReactionMessagesInsertInput>({
      query: QUERY.REACTION_MESSAGES,
    });

    let rMessages: GraphQLReactionMessages[];
    if (PRODUCTION) rMessages = data.reactionMessages;
    else rMessages = data.reactionMessagesDev;
    for (const rMessage of rMessages) {
      const messageData = {
        channel: rMessage.channel,
        disabled: rMessage.disabled,
        reactions: rMessage.reactions,
      };
      try {
        const channel = (await this.client.channels.fetch(rMessage.channel, true)) as TextChannel;
        const message = await channel.messages.fetch(rMessage.message, true);
        if (message) this.items.set(rMessage.message, messageData);
      } catch (err) {
        this.client.logger.info(`[REACTION_MESSAGE]: Message with ID ${rMessage.message} not found.`, {
          topic: TOPICS.DISCORD,
          event: EVENTS.WARN,
        });
        this.items.sweep((_value, key) => key === rMessage.message);
        await this.delete(rMessage.message);
      }
    }
  }

  public get<K extends keyof ReactionItems, T>(
    message: string | Message,
    key: K,
    defaultValue?: T
  ) {
    const id = this.constructor.getMessageId(message);
    if (this.items.has(id)) {
      const rMessage = this.items.get(id)!;
      return rMessage[key];
    }
    return defaultValue as T;
  }

  public async set<K extends keyof ReactionItems, V extends ReactionItems[K]>(
    message: string | Message,
    key: K,
    value: V
  ) {
    const id = this.constructor.getMessageId(message);
    const data = this.items.get(id);
    let tmp = {
      channel: data?.channel,
      reactions: data?.reactions,
      disabled: data?.disabled,
    } as ReactionItems;
    tmp[key] = value;
    this.items.set(id, tmp);
    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.UPDATE_REACTION_MESSAGES,
      variables: {
        message: id,
        ...tmp
      },
    });
    let rMessages: GraphQLReactionMessages;
    if (PRODUCTION) rMessages = res.update_reactionMessages.returning[0];
    else rMessages = res.update_reactionMessagesDev.returning[0];
    return rMessages;
  }

  public async create(message: string | Message, channel: string | TextChannel, reactions: any) {
    const id = this.constructor.getMessageId(message);
    const channelId = this.constructor.getChannelId(channel);
    const data = this.items.get(id);
    if (data) {
      data.reactions = reactions;
      data.channel = channelId;
      data.disabled = false;
      this.items.set(id, data);
    } else this.items.set(id, { channel: channelId, reactions: reactions, disabled: false });
    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.INSERT_REACTION_MESSAGES,
      variables: {
        message: id,
        channel: data ? data.channel : channelId,
        reactions: data ? data.reactions : reactions,
        disabled: false,
      },
    });
    let rMessages: GraphQLReactionMessages;
    if (PRODUCTION) rMessages = res.insert_reactionMessages.returning[0];
    else rMessages = res.insert_reactionMessagesDev.returning[0];
    return rMessages;
  }

  public async delete(message: string | Message) {
    const id = this.constructor.getMessageId(message);
    const data = this.items.get(id);
    this.items.delete(id);

    data && delete data.reactions;
    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.DELETE_REACTION_MESSAGES,
      variables: {
        message: id,
      },
    });

    let rMessages: GraphQLReactionMessages;
    if (PRODUCTION) rMessages = res.delete_reactionMessages.returning[0];
    else rMessages = res.delete_reactionMessagesDev.returning[0];
    return rMessages;
  }

  public async clear(message: string | Message) {
    const id = this.constructor.getMessageId(message);
    const data = this.items.get(id);
    data && delete data.reactions;

    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.UPDATE_REACTION_MESSAGES,
      variables: {
        channel: data && data.channel,
        reactions: {},
        message: id,
      },
    });

    let rMessages: GraphQLReactionMessages;
    if (PRODUCTION) rMessages = res.insert_reactionMessages.returning[0];
    else rMessages = res.insert_reactionMessagesDev.returning[0];
    return rMessages;
  }

  private static getGuildId(guild: string | Guild) {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return '0';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError(
      'Invalid guild specified. Must be a Guild instance, guild ID, "global", or null.'
    );
  }

  private static getMessageId(message: string | Message) {
    if (message instanceof Message) return message.id;
    if (typeof message === 'string' && /^\d+$/.test(message)) return message;
    throw new TypeError(
      'Invalid channel or message specified. Must be a message instance, message or null.'
    );
  }

  private static getChannelId(channel: string | Channel) {
    if (channel instanceof Channel) return channel.id;
    if (channel === null) return '0';
    if (typeof channel === 'string' && /^\d+$/.test(channel)) return channel;
    throw new TypeError('Invalid channel specified. Must be a Channel instance, channel ID or null.');
  }

  public async getReactionMessagesInGuild(guild: string | Guild): Promise<string[]> {
    const id = this.constructor.getGuildId(guild);
    const reactionMessages = [];
    for (const [key, value] of this.items.entries()) {
      const channel = (await this.client.channels.fetch(value.channel)) as TextChannel;
      if (channel.guild.id === id) reactionMessages.push(key);
    }
    return reactionMessages;
  }
}
