const Discord = require('discord.js');

module.exports = async (client, guild) => {
    // ------ LOG THE SERVER JOINED
    console.log(`> Joined server ${guild.name}.`);
    // ------
    //
    // const _RoleChannel = guild.channels.some(c => c.name === 'wybierz-role'); // channel for role selction
    // const _SocialMediaChannel = guild.channels.some(c => c.name === 'social-media'); // channel for social media info
    // const _RulesChannel = guild.channels.some(c => c.name === 'regulamin'); // channel for rules info
    // if(!_RoleChannel) {
    //     console.log(`> Role selection channel not found. Creating one...`)
    //     var RoleChannel = await guild.createChannel('wybierz-role', { type: 'text', position: '2' })
    //     .then(i => console.log(`Created channel ${i.name}`))
    //     .catch(console.error)
    // }
    // if(!_SocialMediaChannel) {
    //     console.log(`> Social media info channel not found. Creating one...`)
    //     var SocialMediaChannel = await guild.createChannel('social-media', { type: 'text', position: '3' })
    //     .then(i => console.log(`Created channel ${i.name}`))
    //     .catch(console.error)
    // }
    // if(!_RulesChannel) {
    //     console.log(`> Rules info channel not found. Creating one...`)
    //     var RulesChannel = await guild.createChannel('regulamin', { type: 'text', position: '4' })
    //     .then(i => console.log(`Created channel ${i.name}`))
    //     .catch(console.error)
    // }
    // const rulesEmbed = new Discord.RichEmbed()
    //     .setTitle('Regulamin serwera Discord - Dziupla Barona')
    //     .setAuthor(guild.name, guild.iconURL)
    //     .setColor('RED')
    //     .setDescription('\u200b \n Zasady: \n\n ⛔️ Nie spamuj, nie zaśmiecaj czatu zbędnymi wiadomościami. Nie nadużywaj CAPS LOCKA. \n\n ⛔️ Zakaz propagowania nienawiści, pornografii, rasizmu oraz treści kontrowersyjnych (poza kanałem NSFW). \n\n ⛔️ Zakaz reklamowania stron i serwerów trzecich. \n\n ⛔️ Nie używaj @everyone / @here bez powodu. \n\n ⛔️ Nie kłóć się z administracją. Mają rację. \n\n ✅ Zareaguj używając tego emoji, aby uzyskać możliwość pisania oraz rolę widza. ');
    // const socialmediaEmbed = new Discord.RichEmbed()
    //     .setTitle('Social Media')
    //     .setColor('BLUE')
    //     .addField('🔷 Facebook', '[InomagicH3](https://fb.gg/inomagich3)', false)
    //     .addField('🔶 Twitch', '[Inomagic](https://twitch.tv/inomagic)', false)
    //     .addField('🔷 Grupa Facebook', '[Dziupla Barona](https://www.facebook.com/groups/188974848545701/)', false)
    //     .addField('🔶 Twitch NvidiaGeForce', '[NvidiaGeForcePL](https://twitch.tv/NVIDIAGeForcePL)', false)
    // const rolesEmbed = new Discord.RichEmbed()
    //     .setTitle('Zareaguj odpowiednio aby przypisać dla siebie rolę na serwerze')
    //     .setColor('GREEN')
    //     // ALL REACTION EMOJI IDS ARE SERVER-UNIQUE - need to replace it with other emojis of your choice
    //     .addField('\u200b', '**Heroes 3**  -  <:h3:628305671934181437>')
    //     .addField('\u200b', `**Playerunknown's Battlegrounds**  -  <:pubg:628606431867830312>`)
    //     .addField('\u200b', '**Ashes of Creation**  -  <:ashesofcreation:628607656340357137>')
    //     .addField('\u200b', '**Grand Theft Auto V**  -  <:gta5:628606935758798848>')
    //     .addField('\u200b', `**League of Legends** - <:lol:629329922384723988>`)
    //     .addField('\u200b', '**World of Warcraft** - <:wow:629375134540496927>')
    //     .addField('\u200b', '**Tibia** - <:tibia:629343146597416970>')
    //     .addField('\u200b', '**Metin 2** - <:metin2:629343702279651329>')
    // RulesChannel.send(rulesEmbed).then(async (message) => {
    //     await message.react('✅');
    //     await message.react('❎');
    //     rulesMessageid = message.id;
    // });
    // SocialMediaChannel.send(socialmediaEmbed);
    // RoleChannel.send(rolesEmbed).then(async (message) => {
    //     // ALL REACTION EMOJI IDS ARE SERVER-UNIQUE - need to replace it with other emojis of your choice
    //     await message.react('628305671934181437');
    //     await message.react('628606431867830312');
    //     await message.react('628607656340357137');
    //     await message.react('628606935758798848');
    //     await message.react('629329922384723988');
    //     await message.react('629375134540496927');
    //     await message.react('629343146597416970');
    //     await message.react('629343702279651329');
    //     roleMessageid = message.id;
    // }).catch(console.error);
    //
}