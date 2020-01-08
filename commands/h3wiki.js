const Discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const req = function req (url) {
    var xhr = new XMLHttpRequest();
    // a new request
    let encodedUrl = encodeURI(url);
    xhr.open("GET", encodedUrl, false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
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

exports.run = (client, message, args) => {
    const resultEmbed = new Discord.RichEmbed().
        setAuthor('HoMM 3 Wiki [ENG]', 'https://heroes.thelazy.net/images/a/a6/H3logo.png', 'https://heroes.thelazy.net/index.php/Main_Page').
        setTimestamp().
        setColor('#668cff')
    if (!args.length) {
        resultEmbed.setDescription(`**Brak frazy do wyszukania.**\nUżyj: \`!h3wiki [fraza]\` lub \`!h3 [fraza]\``)
        return message.channel.send(resultEmbed);
    }

    const searchUrl = `https://heroes.thelazy.net//api.php?action=opensearch&format=json&search=${args.join(' ')}`;
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

module.exports.aliases = ['h3']
module.exports.desc = 'Przeszukaj angielską Wikipedię Heroes of Might and Magic 3'
module.exports.args = 'fraza'