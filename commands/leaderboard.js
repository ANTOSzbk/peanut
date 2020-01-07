const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

exports.run = async (client, message, args) => {
    //if(message.channel.id != '628638653555671054') return;
    let db = new sqlite3.Database('./userMoney.sqlite');
    const Leaders = [];
    const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setFooter('🎰 Tabela liderów 🎰')
        .setColor('GOLD')
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL);

    db.all(`SELECT userID,money FROM moneyset ORDER BY money DESC`, [], (err, rows) => {
        if (err) {
            return console.log(err);
        }
        var x = 1;
        let p = 1;
        let f = false;
        rows.forEach((row) => {
            if (message.author.id != row.userID && f == false) p++;
            if (message.author.id === row.userID) f = true;
            if (!global) {
                var user = client.users.find(user => user.id == row.userID);
                user = (user !== null) ? user.tag : user.tag;
            } else {
                var user = message.guild.members.find(user => user.id == `${row.userID}`);
                user = (user !== null) ? user.displayName : `Cannot find user`;
            }
            
            if (x < 10 && user !== null) {
                embed.addField(`${x} > **${user}**`, ` \u200b\u200b > **$**${row.money.toLocaleString()}`);
                x++;
            } else if (Leaders.length == 10) {
                return;
            }
        });
        embed.addField(`\u200b`, `**@${message.author.username}**, Twoja pozycja w rankingu globalnym to **${p}**.`)
        message.channel.send({
            embed
        });
    });
}

module.exports.aliases = ['top', 'top10', 'leaders']