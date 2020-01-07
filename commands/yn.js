exports.run = (client, message, args) => {
    const responseArr = ['Tak', 'Nie', 'Mój wywiad donosi: NIE', 'Prawdopodobnie', 'Prawie jak tak', 'YES, YES, YES', 'Tego nawet ja nie wiem']
    const randomResponse = responseArr[Math.floor(Math.random() * responseArr.length)]
    if(!args.length) return message.reply('Nie wiem, zadaj najpierw pytanie');

    message.reply(randomResponse);
    const lastStr = args[args.length-1];
    if(lastStr.includes('?')) args[args.length-1] = lastStr.substr(null, lastStr.length-1);
    if(args[0].toLowerCase() === 'czy' && args[2].toLowerCase() === 'to') {
        if (randomResponse === 'Tak' || randomResponse === 'YES, YES, YES') return message.reply(`${args[1]} to ${args.slice(3, args.length).join(' ')}`);
        if (randomResponse === 'Nie' || randomResponse === 'Mój wywiad donosi: NIE') return message.reply(`${args[1]} to nie ${args.slice(3, args.length).join(' ')}`);
    }
}