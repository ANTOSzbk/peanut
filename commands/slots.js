const money = require('discord-money');

exports.run = (client, message, args) => {
    //if (message.content.startsWith('!slots')) {
        //if(message.channel.id != '628638653555671054') return;
        //let args = message.content.slice(1).split(' ');
        //args.shift();
        if (!args.length) {
            message.reply('🎰 **Podaj ilość kredytów.** Użyj \n `!slots [ilość kredytów]`')
            return;
        }
        if (args.length > 1 || isNaN(args[0]) || args[0].valueOf() <= 0) {
            message.reply(`🎰 ❌ **Niepoprawna ilość kredytów.**`);
            return;
        } else {
            money.fetchBal(message.author.id).then(async (i) => {
                if (i.money < args[0].valueOf()) {
                    message.reply(`🎰 ❌ **Nie masz tyle siana. Potrzebujesz jeszcze $${args[0].valueOf() - i.money} 💰 żeby zagrać.**`);
                    return;
                }
                const Slots = ['🍌', '🍇', '🍒', '🍊'];
                let rSlot = [];
                let wSlot = [];
                for (i = 1; i < 10; i++) {
                    let j = Math.floor(Math.random() * Slots.length);
                    rSlot[i] = Slots[j];
                }
                const SlotsMsg = await message.channel.send(
                    `**[ 🎰 SLOTS 🎰 ]** \n ------------------ \n **${rSlot[1]}  :  ${rSlot[2]}  :  ${rSlot[3]}** \n\n **${rSlot[4]}  :  ${rSlot[5]}  :  ${rSlot[6]}**  < \n\n **${rSlot[7]}  :  ${rSlot[8]}  :  ${rSlot[9]}** \n ------------------`)
                setTimeout(() => {
                    for (i = 1; i < 10; i++) {
                        let j = Math.floor(Math.random() * Slots.length);
                        rSlot[i] = Slots[j];
                    }
                    SlotsMsg.edit(
                        `**[ 🎰 SLOTS 🎰 ]** \n ------------------ \n **${rSlot[1]}  :  ${rSlot[2]}  :  ${rSlot[3]}** \n\n **${rSlot[4]}  :  ${rSlot[5]}  :  ${rSlot[6]}**  < \n\n **${rSlot[7]}  :  ${rSlot[8]}  :  ${rSlot[9]}** \n ------------------`)
                }, 1000);
                setTimeout(async () => {
                    let winMsg = '';
                    for (i = 1; i < 10; i++) {
                        let j = Math.floor(Math.random() * Slots.length);
                        rSlot[i] = Slots[j];
                    }
                    // for (i = 0; i < 3; i++) {
                    //     let j = Math.floor(Math.random() * Slots.length);
                    //     wSlot[i] = Slots[j];
                    // }
                    let xyz = ['0', '1', '2', '3'];

                    let x = Math.floor(Math.random() * xyz.length);
                    let ex = xyz.indexOf(x.toString());

                    let y = Math.floor(Math.random() * xyz.length);
                    (y == x) ? y = Math.floor(Math.random() * xyz.length): y;
                    let ey = xyz.indexOf(y.toString());
                    xyz.fill(x.toString(), ey, ey + 1);
                    let y2 = Math.floor(Math.random() * xyz.length);


                    let z = Math.floor(Math.random() * xyz.length);
                    (z == x) ? z = Math.floor(Math.random() * xyz.length): z;
                    let ez = xyz.indexOf(z.toString());
                    xyz.fill(x.toString(), ez, ez + 1);
                    let z2 = Math.floor(Math.random() * xyz.length);



                    wSlot[0] = Slots[xyz[x]];
                    wSlot[1] = Slots[xyz[y2]];
                    wSlot[2] = Slots[xyz[z2]];

                    if (wSlot[0] == wSlot[1] && wSlot[1] == wSlot[2]) {
                        winMsg = `| : : :  **W I N**  : : : | \n\n <:PogU:629747969553596418> <@${message.author.id}> **wrzuca do maszyny ${args[0].toString()} kredytów i wygrywa ${(args[0].valueOf())*2} kredytów!** <:PogU:629747969553596418>`
                        await money.updateBal(message.author.id, (args[0].valueOf() * 2))
                    } else {
                        winMsg = `| : : : **L O S T** : : : | \n\n <:WeirdChamp:629747616350994465> <@${message.author.id}> **wrzuca do maszyny ${args[0].toString()} kredytów i przegrywa wszystko..** <:WeirdChamp:629747616350994465>`
                        await money.updateBal(message.author.id, -(args[0].valueOf()))
                    }
                    SlotsMsg.edit(
                        `**[ 🎰 SLOTS 🎰 ]** \n ------------------ \n **${rSlot[1]}  :  ${rSlot[2]}  :  ${rSlot[3]}** \n\n **${wSlot[0]}  :  ${wSlot[1]}  :  ${wSlot[2]}**  < \n\n **${rSlot[7]}  :  ${rSlot[8]}  :  ${rSlot[9]}** \n ------------------ \n ${winMsg}`)
                }, 2500);
            }).catch(console.error);
        }
    //}
}