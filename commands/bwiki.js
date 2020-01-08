const Discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const req = function req (url) {
    var xhr = new XMLHttpRequest();
    // a new request
    let encodedUrl = encodeURI(url);
    xhr.open("GET", encodedUrl, false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.onreadystatechange = function onreadystatechange (_oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) console.log("Error", xhr.statusText);
        }
    }
    try {
        xhr.send(null);
    } catch (e) {
        console.log(`Error sending request: ${e}.`)
        throw e;
    }
    return xhr.responseText;
}

exports.run = (_client, message, args) => {
    const argsToUpper = [];
    const resultEmbed = new Discord.RichEmbed().
    setAuthor('Bloodstone Wiki', 'https://www.bloodstone.com.pl/images/c/c9/Logo.png', 'https://www.bloodstone.com.pl/wiki/Strona_g%C5%82%C3%B3wna').
    setTimestamp().
    setColor('#668cff')
    if (!args.length) {
        resultEmbed.setDescription(`**Brak frazy do wyszukania.**\nUżyj: \`!bwiki [fraza]\` lub \`!bs [fraza]\``)
        return message.channel.send(resultEmbed);
    }
    args.forEach((word, i) => {
        argsToUpper[i] = word.charAt(0).toUpperCase() + word.slice(1);
    })
    const searchUrl = `https://www.bloodstone.com.pl/api.php?action=opensearch&format=json&search=${argsToUpper.join(' ')}`;
    const resultJSON = JSON.parse(req(searchUrl));
    if (resultJSON[1][0] == null || resultJSON[3][0] == null) {
        resultEmbed.setFooter(`Brak wyników wyszukiwania dla ${args.join(' ')}.`);
        resultEmbed.setDescription(`**Brak wyników wyszukiwania.**`);
        return message.channel.send(resultEmbed)
    }
    const resultMap = resultJSON[1].map((x, i) => `[${x}](${resultJSON[3][i]})`, this);
    if (resultJSON[1][0].toLowerCase() === args.join(' ').toLowerCase()) {
        const identyko = resultMap[0];
        resultMap.shift();
        resultEmbed.setDescription(`**> > ${identyko}\n\n${resultMap.join(`\n`)}**`)
    } else {
        resultEmbed.setDescription(`**${resultMap.join(`\n`)}**`);
    }
    resultEmbed.setFooter(`Wyniki wyszukiwania ${args.join(' ')}.`)
    message.channel.send(resultEmbed);
}

module.exports.aliases = [
    'bloodstone',
    'bs'
]
module.exports.desc = 'Przeszukaj polską Wikipedię Bloodstone (API nieczułe na wielkość znaków :<)'
module.exports.args = 'fraza'