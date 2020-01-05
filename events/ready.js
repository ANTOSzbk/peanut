const Discord = require('discord.js');

module.exports = async (client) => {
    console.log('Bot is ready.');
    await client.user.setPresence({
        game: {
            name: "> Napisz do mnie !help",
            type: 'PLAYING'
        },
        status: "online"
    });
}