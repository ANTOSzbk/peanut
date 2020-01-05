const Discord = require("discord.js");
const config = require("./config.json");
const money = require('discord-money');
const sqlite3 = require("sqlite3").verbose();
const moment = require('moment');
const Enmap = require('enmap');
const fs = require('fs');

moment.locale('pl');

const client = new Discord.Client();

client.config = config;


const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await user.createDM();

    // if the message is already in the cache, don't re-emit the event
    if (channel.messages.has(data.message_id)) return;

    // if you're on the master/v12 branch, use `channel.messages.fetch()`
    const message = await channel.fetchMessage(data.message_id);

    // custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
    // if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    client.emit(events[event.t], reaction, user);
});


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        // Load the command file itself
        let props = require(`./commands/${file}`);
        // Get just the command name from the file name
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        // Here we simply store the whole thing in the command Enmap. We're not running it right now.
        client.commands.set(commandName, props);
    });
});

client.on('messageReactionAdd', async (messageReaction, user) => {

    let channel = messageReaction.message.channel;
    let gMember = messageReaction.message.guild.member(user);
    if (user.bot) return;
    if (channel.name === 'wybierz-role') {
        const emoji = messageReaction.emoji.toString();
        switch (emoji) {
            case '<:h3:628305671934181437>':
                await gMember.addRole('628287056073981973');
                break;
            case '<:pubg:628606431867830312>':
                await gMember.addRole('628615033638617100');
                break;
            case '<:ashesofcreation:628607656340357137>':
                await gMember.addRole('628615104644120576');
                break;
            case '<:gta5:628606935758798848>':
                await gMember.addRole('628615214765703169');
                break;
            case '<:lol:629329922384723988>':
                await gMember.addRole('629329645581369366');
                break;
            case '<:wow:629375134540496927>':
                await gMember.addRole('629329776666214416');
                break;
            case '<:tibia:629343146597416970>':
                await gMember.addRole('629344320020938774');
                break;
            case '<:metin2:629343702279651329>':
                await gMember.addRole('629344414640111617');
                break;
            default:
                messageReaction.remove(user);
                break;
        }
    }
    if (channel.name === 'regulamin') {
        const emoji = messageReaction.emoji.toString();
        switch (emoji) {
            case '✅':
                await gMember.addRole('628286186510745675');
                break;
            case '❎':
                await messageReaction.remove(user);
                break;
            default:
                messageReaction.remove(user);
                break;
        }
    }

});

client.on('messageReactionRemove', async (messageReaction, user) => {
    let channel = messageReaction.message.channel;
    let gMember = messageReaction.message.guild.member(user);
    if (user.bot) return;
    if (channel.name === 'wybierz-role') {
        //let roleMessage =  await channel.fetchMessage(roleMessageid);
        const emoji = messageReaction.emoji.toString();
        switch (emoji) {
            case '<:h3:628305671934181437>':
                await gMember.removeRole('628287056073981973');
                break;
            case '<:pubg:628606431867830312>':
                await gMember.removeRole('628615033638617100');
                break;
            case '<:ashesofcreation:628607656340357137>':
                await gMember.removeRole('628615104644120576');
                break;
            case '<:gta5:628606935758798848>':
                await gMember.removeRole('628615214765703169');
                break;
            case '<:lol:629329922384723988>':
                await gMember.removeRole('629329645581369366');
                break;
            case '<:wow:629330158955790337>':
                await gMember.removeRole('629329776666214416');
                break;
            case '<:tibia:629343146597416970>':
                await gMember.removeRole('629344320020938774');
                break;
            case '<:metin2:629343702279651329>':
                await gMember.removeRole('629344414640111617');
                break;
            default:
                console.error;
        }
    }
    if (channel.name === 'regulamin') {
        const emoji = messageReaction.emoji.toString();
        switch (emoji) {
            case '✅':
                await gMember.removeRole('628286186510745675');
                break;
            default:
                console.error;
        }
    }

});

client.login(client.config.token);