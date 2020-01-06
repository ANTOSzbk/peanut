const Discord = require('discord.js');
const quiz = require('../quiz.json');
const CronJob = require('cron').CronJob;
const fs = require('fs');

module.exports = async (client) => {
    console.log('Bot is ready.');
    await client.user.setPresence({
        game: {
            name: "> Napisz do mnie !help",
            type: 'PLAYING'
        },
        status: "online"
    });
    var randomQuestion = '';
    if (fs.existsSync('./question.txt')) {
        randomQuestion = fs.readFile('./question.txt', (err, data) => {
            if (err) throw err;
            console.log(`Pytanie istnieje. Wczytano treść '${data}'`);
        });
    } else {
        randomQuestion = quiz[Math.floor(Math.random() * quiz.length)].question;
        fs.writeFile('./question.txt', randomQuestion, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
    let rQuestion_tmp = randomQuestion;
    const losuj_pytanie = new CronJob('0 0 0 * * *', () => {
        randomQuestion = quiz[Math.floor(Math.random() * quiz.length)].question;
        // prevent same question twice in a row
        randomQuestion === rQuestion_tmp ? randomQuestion = quiz[Math.floor(Math.random() * quiz.length)].question : randomQuestion = randomQuestion;
        rQuestion_tmp = randomQuestion;
        fs.writeFile('./question.txt', randomQuestion, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
    losuj_pytanie.start();
    losuj_pytanie.addCallback(() => {
        console.log(`Pytanie do codziennego quiza zostało wylosowane. \n ${randomQuestion}`);
    })
}