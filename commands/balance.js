const money = require('discord-money');

exports.run = (client, message, args) => {
    money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
            message.reply(`**Posiadasz na koncie: \n 🏧 >> $${i.money}** 💰`);
        })
}