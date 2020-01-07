const money = require('discord-money');
const moment = require('moment');
const Discord = require('discord.js');

const _cooldown = new Discord.Collection();

exports.run = async (client, message, args) => {
    if (message.channel.id != '628638653555671054') return;
    const now = Date.now();
    const expirationDate = _cooldown.get(message.author.id) + this.cooldown;
    let timeleft = (expirationDate - now) / 1000;
    var hours = Math.floor(timeleft / 3600);
    var minutes = Math.floor((timeleft - (hours * 3600)) / 60);
    var seconds = Math.floor(timeleft - (hours * 3600) - (minutes * 60));
    const timestring = [hours + ` godzin`, minutes + ` minut`, seconds + ` sekund`];
    if (parseInt(hours) == 0) timestring.shift();

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    bonus = getRndInteger(100, 200);
    if (!_cooldown.has(message.author.id)) {
        money.updateBal(message.author.id, bonus).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, they can't get it back again.
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: `> 💰 Otrzymujesz bonus w wysokości $${bonus}!`,
                    description: `> 🏧 Aby sprawdzić stan konta użyj \`!balance\`.`,
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.avatarURL
                    }
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
                color: 3447003,
                title: `> 🏧 ❌ Otrzymałeś swój dzienny bonus \`!daily\`.`, // When you got your daily already, this message will show up.
                description: `> Wróć ponownie za ${timestring.join(' ')}.`, 
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                }
            }
        });
    }
}

module.exports.cooldown = 43200000