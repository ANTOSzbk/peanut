import { Provider } from 'discord-akairo';
import { Guild } from 'discord.js';
import { PRODUCTION, Settings } from '../utils/constants';
import { graphQLClient } from '../utils/graphQL/apolloClient';
import { QUERY, MUTATION } from '../utils/queries/settings';
import {
  Settings as GraphQLSettings,
  SettingsInsertInput,
} from '../utils/graphQL/graphQLTypes';

export default class HasuraProvider extends Provider {
  public ['constructor']: typeof HasuraProvider;

  public async init() {
    const { data } = await graphQLClient.query<any, SettingsInsertInput>({
      query: QUERY.SETTINGS,
    });

    let settings: GraphQLSettings[];
    if (PRODUCTION) settings = data.settings;
    else settings = data.settingsDev;
    for (const setting of settings) {
      this.items.set(setting.guild, setting.settings);
    }
  }

  public get<K extends keyof Settings, T = undefined>(
    guild: string | Guild,
    key: K,
    defaultValue?: T
  ): Settings[K] | T {
    const id = this.constructor.getGuildId(guild);
    if (this.items.has(id)) {
      const value = this.items.get(id)[key];
      return value ?? defaultValue;
    }

    return defaultValue as T;
  }

  public async set(guild: string | Guild, key: string, value: any) {
    const id = this.constructor.getGuildId(guild);
    const data = this.items.get(id) || {};
    data[key] = value;
    this.items.set(id, data);

    const { data: res } = await graphQLClient.mutate<any, SettingsInsertInput>({
      mutation: MUTATION.UPDATE_SETTINGS,
      variables: {
        guild: id,
        settings: data,
      },
    });
    let settings: GraphQLSettings;
    if (PRODUCTION) settings = res.insert_settings.returning[0];
    else settings = res.insert_settingsDev.returning[0];
    return settings;
  }

  public async delete(guild: string | Guild, key: string) {
    const id = this.constructor.getGuildId(guild);
    const data = this.items.get(id) || {};
    delete data[key];

    const { data: res } = await graphQLClient.mutate<any, SettingsInsertInput>({
      mutation: MUTATION.UPDATE_SETTINGS,
      variables: {
        guild: id,
        settings: data,
      },
    });

    let settings: GraphQLSettings;
    if (PRODUCTION) settings = res.insert_settings.returning[0];
    else settings = res.insert_settingsDev.returning[0];
    return settings;
  }

  public async clear(guild: string | Guild) {
    const id = this.constructor.getGuildId(guild);
    this.items.delete(id);

    const { data: res } = await graphQLClient.mutate<any, SettingsInsertInput>({
      mutation: MUTATION.DELETE_SETTINGS,
      variables: {
        guild: id,
      },
    });

    let settings: GraphQLSettings;
    if (PRODUCTION) settings = res.delete_settings.returning[0];
    else settings = res.delete_settingsDev.returning[0];
    return settings;
  }

  private static getGuildId(guild: string | Guild) {
    if (guild instanceof Guild) return guild.id;
    if (guild === 'global' || guild === null) return '0';
    if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
    throw new TypeError(
      'Invalid guild specified. Must be a Guild instance, guild ID, "global", or null.'
    );
  }
}
