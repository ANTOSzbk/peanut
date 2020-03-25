const money = require('discord-money');

exports.run = (client, message, args) => {
        const mentionedUser = message.mentions.users.first();
        if (!args.length) {
            message.reply('🏧 ❌ **Brak lub niepoprawna nazwa użytkownika.** Użyj: \n `!daj [@nazwa_użytkownika] [ilość kredytów]`');
            return;
        }
        if (!client.users.some(u => u === mentionedUser)) {
            message.reply('🏧 ❌ **Nie znaleziono takiego użytkownika w bazie. \n Upewnij się, że go poprawnie oznaczyłeś używając \'@\'.** Użyj: \n `!daj [@nazwa_użytkownika] [ilość kredytów]`');
            return;
        }
        if (message.author.id === mentionedUser.id) {
            message.reply('🏧 ❌ **Dobra próba oszukania systemu, ale wybierz kogoś innego niż siebie. <:PepeR:628649312154288180>**');
            return;
        }
        if (args[1] == 0 || isNaN(args[1]) || args.length > 2) {
            message.reply('🏧 ❌ **Brak lub niepoprawna ilość kredytów [1 - 1000].** Użyj: \n `!daj [@nazwa_użytkownika] [ilość kredytów]`');
            return;
        }
        money.fetchBal(message.author.id).then(async i => {
            if (args[1].valueOf() > i.money) {
                message.reply(`🏧 ❌ **Nie masz tyle siana. Twój stan konta wynosi $${i.money} 💰.**`);
                return;
            }
            await money.updateBal(message.author.id, -(args[1].valueOf()));
            await money.updateBal(mentionedUser.id, args[1].valueOf());
            message.reply(`🏧 ✔️ **Przekazałeś ${args[1].toString()} kredytów dla użytkownika <@${mentionedUser.id}>.**`)
        })
}

module.exports.desc = 'Przekaż innemu członkowi serwera swoje kredyty'
module.exports.args = '@nazwa_użytkownika ilość_kredytów'