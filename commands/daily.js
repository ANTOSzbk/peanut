const money = require('discord-money');
const moment = require('moment');

exports.run = async (client, message, args) => {
    // --  if(message.channel.id != '628638653555671054') return;
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    bonus = getRndInteger(100, 200);
    if (money[message.author.username + message.guild.name] != moment().format('L')) {
        money[message.author.username + message.guild.name] = moment().format('L')
        money.updateBal(message.author.id, bonus).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, they can't get it back again.
            message.channel.send({
                embed: {
                    color: 3447003,
                    description: '\u200b\nℹ Bonus dzienny może wynosić od $100 do $200. \n\n 💰 Otrzymałeś codzienny bonus w wysokości **$' + bonus + '**. \n\n 🏧 Aby sprawdzić stan konta użyj \`!balance\`.',
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: message.author.avatarURL
                    }
                }
            });
        })
    } else {
        message.channel.send({
            embed: {
                color: 3447003,
                description: '🏧 ❌ Otrzymałeś swój dzienny bonus \`!daily`\. Zapraszamy ' + moment().endOf('day').fromNow() + '.', // When you got your daily already, this message will show up.
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                }
            }
        });
    }
}