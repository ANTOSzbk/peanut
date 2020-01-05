exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
    const commandName = args[0];
    if (commandName === 'all') {
        let keys = Array.from( client.commands.keys() );
        console.log(keys);
        keys.forEach(( command ) => {
            console.log(command);
            delete require.cache[require.resolve(`./${command}.js`)];
            client.commands.delete(command);
            const props = require(`./${command}.js`);
            client.commands.set(command, props);
            // message.reply(`The command ${command} has been reloaded.`);
        })
        return message.reply(`Reloaded all commands - ${keys.join(', ')}.`).then(async message => {
            await message.react('✅').then(reaction => {
                setTimeout(() => { reaction.remove(client.user) }, 5000);
            })
        });
    }
    // Check if the command exists and is valid
    if (!client.commands.has(commandName)) {
        return message.reply("That command does not exist.");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded.`).then(async message => {
        await message.react('✅').then(reaction => {
            setTimeout(() => { reaction.remove(client.user) }, 5000);
        })
    });
};