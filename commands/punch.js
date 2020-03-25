const Discord = require('discord.js')

const _cooldown = new Discord.Collection()

exports.run = async (client, message, args) => {
    const now = Date.now();
    const expirationDate = _cooldown.get(message.author.id) + parseInt(this.cooldown, 10);
    const timeleft = (expirationDate - now) / 1000;
    const mentionedUser = message.mentions.users.first();
    const knockoutRole = message.guild.roles.get(`665263936664240139`);
    const mentionedMember = message.guild.member(mentionedUser);
    const messageAuthorMember = message.guild.member(message.author);
    const resultEmbed = new Discord.RichEmbed().
    setAuthor(`${message.guild.member(message.author.id).displayName}#${message.author.discriminator}`, message.author.avatarURL).
    setColor('BLUE');
    if (_cooldown.has(message.author.id)) return message.reply(`Odpocznij jeszcze ${timeleft.toFixed(1)} sekund zanim kogoś spróbujesz uderzyć.`)
    if (!message.guild) return message.reply(`Tej komendy można użyć tylko poprzez serwer.`)
    if (!args.length) {
        resultEmbed.setTitle(`> **!punch** \`@nazwa_użytkownika\``);
        resultEmbed.setDescription(`Ta komenda może zaboleć zarówno Ciebie jak i oponenta.`)
        resultEmbed.addField(`Dostępne aliasy`, `\`${this.aliases.join(`\`, \``)}\``)
        return message.channel.send(resultEmbed);
    }
    if (!mentionedMember) return message.reply(`Nie znaleziono takiego użytkownika. Upewnij się, że oznaczyłeś go przez **\`@\`**.`)
    const outcomes = [` Wyprowadzasz potężny cios na szczękę **${mentionedUser}** po czym ląduje on na glebie.`,
        `**${mentionedUser}** w porę się orientuje i unika Twojego ciosu.`,
        `**${mentionedUser}** wyprowadza potężny kontratak i nokautuje Cię.`
    ];
    const outcomeTitles = [`> 💫 NOKAUT 💫`, `> 💨 UNIK 💨`, `> 💫 NOKAUT 💫`];
    const embedColors = [`GREEN`, `GOLD`, `RED`];
    const embedFooter = [`${mentionedMember.displayName} ocknie się za minutę.`, `Wszyscy cali, dobra próba.`, `${messageAuthorMember.displayName} ocknie się za minutę.`];
    const randomOutcome = Math.floor(Math.random() * outcomes.length);
    resultEmbed.setTitle(`> 🥊 Wyprowadzanie ciosu...`)
    resultEmbed.setDescription(`Próbujesz uderzyć użytkownika **${!mentionedMember.displayName ? mentionedUser.tag : mentionedMember.displayName}...**`);
    const msg = await message.channel.send(resultEmbed);
    setTimeout(async () => {
        resultEmbed.setFooter(embedFooter[randomOutcome]);
        resultEmbed.setColor(embedColors[randomOutcome]);
        resultEmbed.setTitle(outcomeTitles[randomOutcome]);
        resultEmbed.setDescription(outcomes[randomOutcome]);
        resultEmbed.setTimestamp(Date.now() + 60000);
        if (randomOutcome === 0) {
            await mentionedMember.addRole(knockoutRole);
        }
        if (randomOutcome === 2) {
            await messageAuthorMember.addRole(knockoutRole);
        }
        return msg.edit(resultEmbed);
    }, 2000);
    if (!_cooldown.has(message.author.id)) _cooldown.set(message.author.id, now)
    setTimeout(async () => {
        await mentionedMember.removeRole(knockoutRole);
        await messageAuthorMember.removeRole(knockoutRole);
        _cooldown.delete(message.author.id);
    }, this.cooldown);
}

exports.aliases = [
    'zajeb',
    'jeb',
    'jebnij'
];
exports.cooldown = '60000';
exports.desc = `Ta komenda może zaboleć zarówno Ciebie jak i oponenta`;
exports.args = `@nazwa_uzytkownika`;