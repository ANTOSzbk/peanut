import { Guild, Role } from 'discord.js';

export const getGuildRoles = (
  guild: Guild,
  filterEveryone: Boolean = true,
  filterExternal: Boolean = true
): Role[] => {
  const roles = Array.from(guild.roles.cache.values());
  const filteredRoles = roles.filter((role) => {
    let filter: Boolean = true;
    if (filterEveryone && filterExternal)
      filter = !role.managed && guild.roles.everyone !== role;
    return filter;
  });
  return filteredRoles;
};

export const getGuildChannels = (
  guild: Guild,
  type: Exclude<keyof typeof ChannelType, 'dm' | 'group' | 'unknown'> = 'text'
) => {
  const channels = Array.from(guild.channels.cache.values());
  const filteredChannels = channels.filter((channel) => channel.type === type);
  return filteredChannels;
};

export const getGuildWebhooks = async (guild: Guild) => {
  const webhooks = Array.from((await guild.fetchWebhooks()).values());
  return webhooks;
};
