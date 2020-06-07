import { Provider } from 'discord-akairo';
import { Guild, Message, Channel } from 'discord.js';
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

export default class ReactionMessagesProvider extends Provider {
  public ['constructor']: typeof ReactionMessagesProvider;
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
        channel: (rMessage.channel as unknown) as TextChannel,
        reactions: rMessage.reactions,
      };
      const channel = await messageData.channel.fetch();
      const message = await channel.messages.fetch(rMessage.message, true);
      console.log(`Fetched ${message.id}`);
      message
        ? this.items.set(rMessage.message, messageData)
        : this.client.logger.info(`[REACTION_MESSAGE]: Message with ID ${rMessage.message} not found.`, {
            topic: TOPICS.DISCORD,
            event: EVENTS.WARN,
          });
    }
  }

  public get<K extends keyof GraphQLReactionMessages, T = undefined>(
    message: string | Message,
    key: K,
    defaultValue?: T
  ): ReactionMessages | any {
    const id = this.constructor.getMessageId(message);
    if (this.items.has(id)) {
      const rMessage = this.items.get(id);
      if (key === 'channel') return rMessage.channel ?? undefined;
      if (key === 'reactions') return rMessage.reactions ?? undefined;
      if (key === 'message') return rMessage.message ?? undefined;
    }
    return defaultValue as T;
  }

  public async set(message: string | Message, channel: string | TextChannel, reactions: any) {
    const id = this.constructor.getMessageId(message);
    const channelId = this.constructor.getChannelId(channel);
    const data = this.items.get(id) || {};
    data.reactions = reactions;
    if (!data.channel) data.channel = channelId;
    this.items.set(id, data);

    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.UPDATE_REACTION_MESSAGES,
      variables: {
        message: id,
        channel: data.channel ? data.channel : channelId,
        reactions: data.reactions,
      },
    });
    let rMessages: GraphQLReactionMessages;
    if (PRODUCTION) rMessages = res.insert_reactionMessages.returning[0];
    else rMessages = res.insert_reactionMessagesDev.returning[0];
    return rMessages;
  }

  public async delete(message: string | Message) {
    const id = this.constructor.getMessageId(message);
    const data = this.items.get(id) || {};
    delete data.reactions;

    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.UPDATE_REACTION_MESSAGES,
      variables: {
        channel: data.channel,
        reactions: {},
        message: id,
      },
    });

    let rMessages: GraphQLReactionMessages;
    if (PRODUCTION) rMessages = res.insert_reactionMessages.returning[0];
    else rMessages = res.insert_reactionMessagesDev.returning[0];
    return rMessages;
  }

  public async clear(message: string | Message) {
    const id = this.constructor.getMessageId(message);
    const data = this.items.get(id) || {};
    delete data.reactions;

    const { data: res } = await graphQLClient.mutate<any, ReactionMessagesInsertInput>({
      mutation: MUTATION.UPDATE_REACTION_MESSAGES,
      variables: {
        channel: data.channel,
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

  public getReactionMessagesInGuild(guild: string | Guild): string[] {
    const id = this.constructor.getGuildId(guild);
    const reactionMessages = [];
    for (const [key, value] of this.items.entries()) {
      if (value.guild === id) reactionMessages.push(key);
    }
    return reactionMessages;
  }
}
