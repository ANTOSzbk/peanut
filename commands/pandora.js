const CronJob = require('cron').CronJob;
const money = require('discord-money');
const moment = require('moment');

exports.run = async (client, message, args) => {
    if (isNaN(money[message.author.id + message.guild.name])) money[message.author.id + message.guild.name] = 0;
    let nullify = new CronJob('0 0 0 * * *', async () => {
        money[message.author.id + message.guild.name] = 0;
    });
    money[message.author.tag + message.guild.name] = moment().format('L');
    // if(money[message.author.tag + message.guild.name] != moment().format('L')) {
    //     money[message.author.id + message.guild.name] = 0;
    // }
    money[message.author.id + message.guild.name]++;
    console.log(money[message.author.id + message.guild.name].toString());
    if (money[message.author.id + message.guild.name] >= 6)
        if (money[message.author.tag + message.guild.name] == moment().format('L')) {
            //money[message.author.tag + message.guild.name] = moment().format('L');
            message.reply(`🎰 ❌ **Wykorzystałeś swój dzienny limit puszek pandory [5]. Spróbuj ponownie ${moment().endOf('day').fromNow()}.**`);
            nullify.start();
            //console.log(`Limit użytkownika ${message.author.tag} zostanie zrestartowany ${nullify.nextDate().format('LLL')}.`)
            return;
        }

    // -- if(message.channel.id != '628638653555671054') return;
    const items = [
        '5.000 punktów doświadczenia', '10.000 punktów doświadczenia', '15.000 punktów doświadczenia', '20.000 punktów doświadczenia', '5.000 sztuk złota',
        '10.000 sztuk złota', '15.000 sztuk złota', '20.000 sztuk złota', 'Czary pierwszego poziomu', 'Czary drugiego poziomu', 'Czary trzeciego poziomu', 'Czary czwartego poziomu',
        'Czary piątego poziomu', 'Wszystkie czary Magii Wody', 'Wszystkie czary Magii Ziemi', 'Wszystkie czary Magii Powietrza', 'Wszystkie czary Magii Ognia',
        '200 kredytów do kasyna <:PogU:629747969553596418>'
    ];
    const randomItem = Math.floor(Math.random() * items.length);
    if (randomItem == (items.length) - 1)
        await money.updateBal(message.author.id, 200);
    //const randomUpgrade = Math.floor(Math.random() * 3);
    const prizeMsg = await message.reply(`***Trwa otwieranie puszki pandory...***`);
    return setTimeout(() => {
        prizeMsg.edit(`<@${message.author.id}>, *Z puszki pandory otrzymujesz:*  \n\n --- **${items[randomItem]}** --- \n\n  Gratulacje!`);
    }, 2000);
}
