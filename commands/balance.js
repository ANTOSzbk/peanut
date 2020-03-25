const money = require('discord-money');
const Discord = require('discord.js');

exports.run = (client, message, _args) => {
    money.fetchBal(message.author.id).then(i => {
        const balanceEmbed = new Discord.RichEmbed().
        setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL).
        setTitle(`> *🏧 > $${i.money}*`).
        setFooter(`ATM.`).
        setTimestamp().
        setColor('#39ff14')
        message.channel.send(balanceEmbed);
    })
}

module.exports.aliases = [
    'stankonta',
    'bal'
]
module.exports.desc = 'Sprawdź balans swojego konta'