const Discord = require('discord.js');

const _cooldown = new Discord.Collection();

exports.run = (client, message, args) => {
    const now = Date.now();
    const expirationDate = _cooldown.get(message.author.id) + parseInt(this.cooldown, 10);
    const timeleft = (expirationDate - now) / 1000;
    if (_cooldown.has(message.author.id)) return message.reply(`Możesz tworzyć ankietę raz na **2** minuty. Odczekaj ${timeleft.toFixed(0)} sekund przed ponownym użyciem.`)
    if (!args.length) return message.reply(`🗳️ **Brak danych do utworzenia ankiety**. Użyj: \n \`!poll [pytanie]\` - odpowiedzi tak/nie \n`);
    //\`!poll '[pytanie]' '[odp1]' '[odp2]' itd..\` - maksymalnie 4 odpowiedzi`);
    if (args.length > 4 && args.includes(`'`)) {
        return message.reply(`🗳️ Za dużo odpowiedzi, max 4.`).
        then(msg => msg.delete(3000)).
        catch(console.error);
    }
    const _question = args.join(' ');
    const pollEmbed = new Discord.RichEmbed().
    setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL).
    setTitle(`🗳️ ${_question}`).
    setColor('GREEN').
    setFooter(`Pytanie zadane przez ${message.guild.member(message.author).displayName}.`).
    addField('\u200b', '✔️ Tak', true).
    addField('\u200b', '❌ Nie', true).
    setTimestamp()
    message.channel.send(pollEmbed).then(async msg => {
        await msg.react('✔️');
        await msg.react('❌');
    })
    if (!_cooldown.has(message.author.id)) _cooldown.set(message.author.id, now)
    setTimeout(() => {
        _cooldown.delete(message.author.id);
    }, this.cooldown);
}

module.exports.aliases = [
    'ankieta',
    'sonda',
    'glosowanie',
    'głosowanie'
]
module.exports.cooldown = '120000';
module.exports.desc = 'Stwórz bardziej widoczną ankietę dla wszystkich'
module.exports.args = 'pytanie'