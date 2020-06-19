import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';
import { PrefixSupplier } from 'discord-akairo';

export default class CheckConfigCommand extends Command {
  public constructor() {
    super('config-check', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.CHECK.DESCRIPTION,
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public async exec(message: Message) {
    const guild = message.guild!;
    const prefix = this.client.settings.get(guild, SETTINGS.PREFIX);
    const mod = this.client.settings.get(guild, SETTINGS.MODERATION);
    const mute = this.client.settings.get(guild, SETTINGS.MUTE_ROLE);
    const modlog = this.client.settings.get(guild, SETTINGS.MOD_LOG);
    const guildlog = this.client.settings.get(guild, SETTINGS.GUILD_LOG);
    const modrole = this.client.settings.get(guild, SETTINGS.MOD_ROLE);
    const entryrole = this.client.settings.get(guild, SETTINGS.ENTRY_ROLE);
    const memberlog = this.client.settings.get(guild, SETTINGS.MEMBER_LOG, {
      ID: '',
      MENTION: false,
    });
    let guildlogChannel;
    if (guildlog) {
      guildlogChannel = (await message.guild?.fetchWebhooks())?.get(guildlog)
        ?.channelID;
    }

    return message.util?.send(
      new MessageEmbed()
        .setColor('DARK_GOLD')
        .setTitle(`Peanut guild configuration`)
        .setDescription(`> Guild: **${message.guild?.name}**
        Prefix in this guild is: \`${prefix ? prefix : (this.handler.prefix as PrefixSupplier)(message)}\`.
        Moderation functionalities are ${!!mod ? '**enabled `✔️`**' : '**disabled `❌`**. \n To enable use `config toggle mod` otherwise you won\'t be able to use moderation commands'}.
        `)
        .addField('Mod event log', `${modlog ? `${guild.channels.cache.get(modlog)}` : `To enable use \`config set modlog\``}`, true)
        .addField('Status', `${modlog ? '**Enabled `✔️`**' : '**Disabled `❌`**'}`, true)
        .addField('\u200b', '\u200b', true)
        .addField('Guild event log', `${guildlogChannel ? `${guild.channels.cache.get(guildlogChannel)}` : `To enable use \`config set guildlog\``}`, true)
        .addField('Status', `${guildlog ? '**Enabled `✔️`**' : '**Disabled `❌`**'}`, true)
        .addField('\u200b', '\u200b', true)
        .addField('Member log', `${memberlog.ID ? `${guild.channels.cache.get(memberlog.ID)}` : `To enable use \`config set memberlog\``}`, true)
        .addField('Status', `${memberlog.ID ? `**Enabled \`✔️\`** ${memberlog.MENTION ? '(w/ mention)' : ''}` : '**Disabled `❌`**'}`, true)
        .addField('\u200b', '\u200b', true)
        .addField('Mod role', `${modrole ? `${guild.roles.cache.get(modrole)}` : `To enable use \`config set mod\``}`, true)
        .addField('Status', `${modrole ? `**Enabled \`✔️\`**` : '**Disabled `❌`**'}`, true)
        .addField('\u200b', '\u200b', true)
        .addField('Entry role', `${entryrole ? `${guild.roles.cache.get(entryrole)}` : `To enable use \`config set entry\``}`, true)
        .addField('Status', `${entryrole ? `**Enabled \`✔️\`**` : '**Disabled `❌`**'}`, true)
        .addField('\u200b', '\u200b', true)
        .addField('Mute role', `${mute ? `${guild.roles.cache.get(mute)}` : `To enable use \`config set mute\``}`, true)
        .addField('Status', `${mute ? `**Enabled \`✔️\`**` : '**Disabled `❌`**'}`, true)
        .addField('\u200b', '\u200b', true)
        .setThumbnail(guild.iconURL() ?? '')
        .setFooter(`${message.guild?.name} configuration`, this.client.user?.displayAvatarURL())
        .setTimestamp(new Date())
    );
  }
}
