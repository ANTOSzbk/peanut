const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

exports.run = async (client, message, args) => {
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
                //var user = client.users.find("id", row.userID);
                var user = client.users.find(user => user.id == row.userID);
                user = (user !== null) ? user.tag : "Użytkownik opuścił serwer";
            } else {
                var user = message.guild.members.find(user => user.id == `${row.userID}`);
                //var user = message.guild.members.find("id", `${row.userID}`);
                user = (user !== null) ? user.user.tag : "Użytkownik opuścił serwer";
            }
            if (x < 10 && user !== null) {
                Leaders.push(`[ ${x} ] > ** ${user} ** \n 
                ** \u200b\u200b\u200b\u200b\u200b\u200b 💰 $${row.money.toLocaleString()} ** 💰 \n -------------------- \n`);
                // embed.addField(`\u200b`, `[ ${x} ] - **${user}**`, true)
                // embed.addField(`\u200b`, `**> $${row.money.toLocaleString()} 💰 \n\n\n**`, true)
                // embed.addField(`\u200b`, `---------------`)
                x++;
            } else if (Leaders.length == 10) {
                return;
            }
        });
        embed.setDescription(Leaders);
        embed.addField(`\u200b`, `**@${message.author.username}**, Twoja pozycja w rankingu globalnym to **${p}**.`)
        message.channel.send({
            embed
        });
    });
}