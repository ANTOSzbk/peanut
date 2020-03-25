/* eslint-disable no-param-reassign */
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let aliases = {};
    let cooldown = {};
    let desc = {};
    let phrase = {};
    let aliasMap = new Map();
    client.commands.forEach((v, k) => {
        aliases[k] = v.aliases;
        cooldown[k] = v.cooldown;
        desc[k] = v.desc;
        phrase[k] = v.args;
    })
    Object.entries(aliases).forEach(([
        v,
        k
    ]) => {
        k ? k.map(val => aliasMap.set(val, v)) : false;
    })
    const helpEmbed = new Discord.RichEmbed().
    setAuthor(client.user.username, client.user.displayAvatarURL).
    setColor('BLUE')
    if (!args.length) {
        helpEmbed.setTitle(`Dostępne komendy: `)
        helpEmbed.setDescription(`\n**\`${Object.keys(aliases).join('`, `')}\`**\n\nAby dowiedzieć się więcej o komendzie wpisz: **\n> !help \`komenda\`**`)
        message.channel.send(helpEmbed);
    } else {
        if (args.toString().charAt(0) === '!') args = args.toString().substr(1);
        if (!client.commands.has(args.toString()) && !aliasMap.has(args.toString())) return message.reply(`Nie znaleziono komendy o nazwie ${args}.`)
        aliasMap.has(args.toString()) ? args = aliasMap.get(args.toString()) : false;
        helpEmbed.setTitle(`> **!${args}**  \`${phrase[args] ? phrase[args] : '\u200b'}\``);
        helpEmbed.setDescription(`\n${desc[args]}.\n`);
        if (cooldown[args]) helpEmbed.addField('Użycie możliwe co', `${parseInt((cooldown[args] / 3600000), 10) > 0 ? `${cooldown[args] / 3600000} godzin` : `${cooldown[args] / 60000} minut`}.`)
        if (aliases[args]) helpEmbed.addField('Dostępne aliasy komendy', `\`!${aliases[args].join('`, `!')}\``)
        message.channel.send(helpEmbed);
    }
}

module.exports.desc = 'Wyświetl dostępne komendy/informacje o komendzie';
module.exports.args = 'brak/komenda'