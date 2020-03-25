const money = require('discord-money');
const Discord = require('discord.js');

const _cooldown = new Discord.Collection();

exports.run = (_client, message, _args) => {
    if (message.channel.id != '628638653555671054') return;
    const now = Date.now();
    const expirationDate = _cooldown.get(message.author.id) + this.cooldown;
    let timeleft = (expirationDate - now) / 1000;
    var hours = Math.floor(timeleft / 3600);
    var minutes = Math.floor((timeleft - (hours * 3600)) / 60);
    var seconds = Math.floor(timeleft - (hours * 3600) - (minutes * 60));
    const timestring = [
        `${hours} godzin`,
        `${minutes} minut`,
        `${seconds} sekund`
    ];
    if (parseInt(hours, 10) == 0) timestring.shift();

    var getRndInteger = function getRndInteger (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const bonus = getRndInteger(100, 200);
    if (!_cooldown.has(message.author.id)) {
        money.updateBal(message.author.id, bonus).then(_i => {
            message.channel.send({
                embed: {
                    author: {
                        icon_url: message.author.avatarURL,
                        name: `${message.author.username}#${message.author.discriminator}`
                    },
                    color: 3447003,
                    description: `> 🏧 Aby sprawdzić stan konta użyj \`!balance\`.`,
                    title: `> 💰 Otrzymujesz bonus w wysokości $${bonus}!`
                }
            });
        })
        _cooldown.set(message.author.id, now)
        setTimeout(() => {
            _cooldown.delete(message.author.id);
        }, this.cooldown);
    } else {
        message.channel.send({
            embed: {
                author: {
                    icon_url: message.author.avatarURL,
                    name: `${message.author.username}#${message.author.discriminator}`
                },
                color: 3447003,
                description: `> Wróć ponownie za ${timestring.join(' ')}.`,
                title: `> 🏧 ❌ Otrzymałeś swój dzienny bonus \`!daily\`.`
                // When you got your daily already, this message will show up
            }
        });
    }
}

module.exports.cooldown = 43200000
module.exports.desc = 'Otrzymaj codzienny bonus kredytów'