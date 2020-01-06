exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission(['ADMINISTRATOR', 'MANAGE_GUILD']))
        return message.reply(`Nie masz uprawnień do użycia tej komendy.`);
    if (!args || args.length < 1) return message.reply("Należy podać nazwę komendy.");
    const commandName = args[0];
    if (commandName === 'all') {
        let keys = Array.from(client.commands.keys());
        keys.forEach((command) => {
            delete require.cache[require.resolve(`./${command}.js`)];
            client.commands.delete(command);
            const props = require(`./${command}.js`);
            client.commands.set(command, props);
        })
        return message.reply(`Przeładowano wszystkie komendy - \`${keys.join(', ')}\`.`).then(async message => {
            await message.react('✅').then(reaction => {
                setTimeout(() => {
                    reaction.remove(client.user)
                }, 5000);
            })
        });
    }
    // Check if the command exists and is valid
    if (!client.commands.has(commandName)) {
        return message.reply("Komenda nie istnieje.");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`Przeładowano komendę \`${commandName}\`.`).then(async message => {
        await message.react('✅').then(reaction => {
            setTimeout(() => {
                reaction.remove(client.user)
            }, 5000);
        })
    });
};

module.exports.aliases = ['rld', 'reload'];