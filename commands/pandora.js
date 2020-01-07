const money = require('discord-money');
const moment = require('moment');
const Discord = require('discord.js');

const _used = new Discord.Collection();
let times = 0;
const _cooldown = new Discord.Collection();

exports.run = async (client, message, args) => {
    const now = Date.now();
    const expirationDate = _cooldown.get(message.author.id) + this.cooldown;
    let timeleft = (expirationDate - now) / 1000;
    var hours = Math.floor(timeleft / 3600);
    var minutes = Math.floor((timeleft - (hours * 3600)) / 60);
    var seconds = Math.floor(timeleft - (hours * 3600) - (minutes * 60));
    const timestring = [hours + ` godzin`, minutes + ` minut`, seconds + ` sekund`];
    if (parseInt(hours) == 0) timestring.shift();
    if (!_used.has(message.author.id)) times = 0;
    const cdEmbed = new Discord.RichEmbed()
    .setAuthor('Puszka pandory', 'https://antoszbk.xyz/surface.png')
    .setColor("#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16)))
    .setTitle(`> *Puszka świeci pustkami.*`)
    .setDescription(`> Wróć ponownie za ${timestring.join(' ')}.`)
    .setFooter(`Puszka otwarta przez ${message.guild.member(message.author.id).displayName}.`)
    .setTimestamp()
    message.delete();
    if (_cooldown.has(message.author.id) && _used.get(message.author.id) >= 4)
        //return message.reply(`> Możesz otworzyć **5** puszek pandory co 6 godzin.\nOdczekaj \`${timestring.join(' ')}\` przed ponownym użyciem.`)
        return message.channel.send(cdEmbed);
    if (message.channel.id != '628638653555671054') return;
    const items = [
        '5.000 punktów doświadczenia', '10.000 punktów doświadczenia', '15.000 punktów doświadczenia', '20.000 punktów doświadczenia', '5.000 sztuk złota',
        '10.000 sztuk złota', '15.000 sztuk złota', '20.000 sztuk złota', 'Czary pierwszego poziomu', 'Czary drugiego poziomu', 'Czary trzeciego poziomu', 'Czary czwartego poziomu',
        'Czary piątego poziomu', 'Wszystkie czary Magii Wody', 'Wszystkie czary Magii Ziemi', 'Wszystkie czary Magii Powietrza', 'Wszystkie czary Magii Ognia',
        '200 kredytów do kasyna <:PogU:629747969553596418>'
    ];
    const randomItem = Math.floor(Math.random() * items.length);
    if (randomItem == (items.length) - 1)
        await money.updateBal(message.author.id, 200);
    const prizeMsg = await message.reply(`***Trwa otwieranie puszki pandory...***`)//.then(msg => msg.delete(1500));
    const prizeEmbed = new Discord.RichEmbed()
        .setAuthor('Puszka pandory', 'https://antoszbk.xyz/surface.png')
        .setColor("#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16)))
        .setTitle(`> **> ${items[randomItem]} <**`)
        .setFooter(`Puszka otwarta przez ${message.guild.member(message.author.id).displayName}.`)
        .setTimestamp()
    _used.set(message.author.id, times++);
    console.log(_used.get(message.author.id));
    if (!_cooldown.has(message.author.id) || _used.get(message.author.id) == 4) _cooldown.set(message.author.id, now)
    setTimeout(() => {
        _cooldown.delete(message.author.id);
        _used.delete(message.author.id);
    }, this.cooldown);
    return setTimeout(() => {
        prizeMsg.edit(prizeEmbed);
    }, 2000);
}

module.exports.cooldown = 21600000 //
module.exports.aliases = ['puszka']