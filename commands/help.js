const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const helpEmbed = new Discord.RichEmbed()
            .setDescription('Dostępne komendy: \n\n **!pandora** - otwórz sobie puszkę pandory! \n\n **!yn** - zapytaj Pomocnika Barona :) (tak lub nie) \n\n ** ---------------- KASYNO ----------------** \n\n **!slots** `[ilość kredytów]` - zagraj w grę slots! \n\n **!daily** - otrzymaj codzienny bonus kredytów \n\n **!balance** - sprawdź balans swojego konta \n\n **!leaderboard** - sprawdź swoją pozycję oraz aktualnych liderów Slots \n\n **!daj** `[@nazwa_użytkownika] [ilość kredytów]` - przekaż innemu użytkownikowi swoje kredyty \n\n ** --------------------------------------------- ** \n\n*Bot jest nadal w fazie produkcji, więcej wkrótce ;)*')
            .setColor('BLUE')
        message.channel.send(helpEmbed);
}