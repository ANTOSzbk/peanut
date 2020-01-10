const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

exports.run = (client, message, _args) => {
    if(!message.guild) return;
    const restrictedChannel = client.channels.find(c => c.id === '628638653555671054');
    if (message.channel.id != restrictedChannel.id) return message.author.send(`Tej komendy można użyć tylko na kanale ${restrictedChannel.name}.`);
    let db = new sqlite3.Database('./userMoney.sqlite');
    //const Leaders = [];
    const embed = new Discord.RichEmbed().
    setTimestamp().
    setFooter('🎰 Tabela liderów 🎰').
    setColor('GOLD').
    setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL);

    db.all(`SELECT userID,money FROM moneyset ORDER BY money DESC`, [], (err, rows) => {
        if (err) {
            return console.log(err);
        }
        var x = 1;
        let p = 1;
        let f = false;
        let user = '';
        rows.forEach(row => {
            if (message.author.id != row.userID && f == false) p += 1;
            if (message.author.id === row.userID) f = true;
            if (!global) {
                user = client.users.find(u => u.id == row.userID);
                user = (user !== null) ? user.tag : user.tag;
            } else {
                user = message.guild.members.find(u => u.id == `${row.userID}`);
                user = (user !== null) ? user.displayName : `Cannot find user`;
            }

            if (x < 10 && user !== null) {
                embed.addField(`${x} > **${user}**`, ` \u200b\u200b > **$**${row.money.toLocaleString()}`);
                x += 1;
            }
        });
        embed.addField(`\u200b`, `**@${message.author.username}**, Twoja pozycja w rankingu globalnym to **${p}**.`)
        message.channel.send({
            embed
        });
    });
    db.close();
}

module.exports.aliases = [
    'top',
    'top10',
    'leaders'
]
module.exports.desc = 'Sprawdź swoją pozycję oraz dziesięciu aktualnych liderów na serwerze'