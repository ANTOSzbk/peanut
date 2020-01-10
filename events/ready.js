/* eslint-disable camelcase */
/* eslint-disable no-sync */
const Discord = require('discord.js');
const money = require('discord-money');
const quiz = require('../quiz.json');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();


const answer_A = ':regional_indicator_a:';
const answer_B = ':regional_indicator_b:';
const answer_C = ':regional_indicator_c:';
const answer_D = ':regional_indicator_d:';


module.exports = async client => {
    console.log('Bot is ready.');
    await client.user.setPresence({
        game: {
            name: "> Napisz do mnie !help",
            type: 'PLAYING'
        },
        status: "online"
    });
    const questionChannel = client.channels.find(c => c.id === '629329206576152599')
    const questionEmbed = new Discord.RichEmbed().
    setAuthor(`Codzienne pytanie`, `https://img.icons8.com/plasticine/2x/question-mark.png`).
    setTimestamp().
    setFooter(`Liczy się tylko pierwsza odpowiedź, zastanów się!`)
    var randomQuestion = quiz[Math.floor(Math.random() * quiz.length)];

    if (fs.existsSync('./question.txt')) {
        randomQuestion.question = fs.readFileSync('./question.txt', 'utf8');
        quiz.forEach(q => {
            if (q.question == randomQuestion.question) Object.assign(randomQuestion, q);
        })
        console.log(`Wczytano istniejace pytanie z pliku .txt:\n`, randomQuestion);
    } else {
        randomQuestion = quiz[Math.floor(Math.random() * quiz.length)];
        fs.writeFile('./question.txt', randomQuestion.question, err => {
            if (err) throw err;
            console.log(`Zapisano do /question.txt/ pytanie '${randomQuestion.question}'`);
        });
        questionEmbed.setTitle(` \n${randomQuestion.question}\n\n`)
        questionEmbed.setDescription(`\n${answer_A} - ${randomQuestion.answer_A}\n\n${answer_B} - ${randomQuestion.answer_B}\n\n${answer_C} - ${randomQuestion.answer_C}\n\n${answer_D} - ${randomQuestion.answer_D}\n\n`);
        questionEmbed.setColor("#xxxxxx".replace(/x/g, _y => (Math.random() * 16 | 0).toString(16)))
        questionChannel.send(questionEmbed).then(async msg => {
            await msg.react('🇦');
            await msg.react('🇧');
            await msg.react('🇨');
            await msg.react('🇩');
        }).
        catch(console.error);
    }
    const correctMsg = `✅ Wybrałeś poprawną odpowiedź w codziennym quizie, gratulacje!`;
    const incorrectMsg = `❌ Wybrałeś niepoprawną odpowiedź w codziennym quizie, spróbuj następnym razem!`;
    const losuj_pytanie = new CronJob('*/20 * * * * *', () => {
    // const losuj_pytanie = new CronJob('0 0 17 * * *', () => {
        let db = new sqlite3.Database('./userMoney.sqlite');
        const correct = new Map();
        db.all(`SELECT * FROM moneyset WHERE answer IS NOT NULL`, (err, rows) => {
            let aString = randomQuestion[`answer_${randomQuestion.correct_answer}`];
            if (err) throw err;
            for (let row of rows) {
                if (client.users.has(row.userID)) {
                    const user = client.users.find(u => row.userID === u.id);
                    if (randomQuestion.correct_answer === row.answer) {
                        const bonus = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
                        user.send(`${correctMsg} \nW nagrodę otrzymujesz **${bonus}** kredytów. 💰`);
                        correct.set(user.id, bonus);
                        money.updateBal(user.id, bonus);
                    } else user.send(`${incorrectMsg} \nPrawidłowa odpowiedź to **${randomQuestion.correct_answer}** - **${aString}**.`);
                } else console.log(`Uzytkownik o id '${row.userID}' odpowiedzial na pytanie, lecz jest nieosiagalny.`);
            }
            console.log(`Wyslano wiadomosc o odpowiedzi na pytanie do ${rows.length} uzytkownikow.`)
     });

     db.close();
        setTimeout(() => {
            console.log(correct);
            db = new sqlite3.Database('./userMoney.sqlite');
            db.run(`UPDATE moneyset SET answer = NULL WHERE answer IS NOT NULL`, updateErr => {
                if (updateErr) throw updateErr;
            });
            randomQuestion = quiz[Math.floor(Math.random() * quiz.length)]
            // prevent same question twice in a row
            //randomQuestion.question === rQuestion_tmp ? randomQuestion = quiz[Math.floor(Math.random() * quiz.length)] : randomQuestion = randomQuestion;
            //rQuestion_tmp = randomQuestion.question;
            fs.writeFile('./question.txt', randomQuestion.question, err => {
                if (err) throw err;
                console.log(`Zapisano do /question.txt/ pytanie '${randomQuestion.question}'`);
            });
            questionEmbed.setTitle(` \n${randomQuestion.question}\n\n`)
            questionEmbed.setDescription(`\n${answer_A} - ${randomQuestion.answer_A}\n\n${answer_B} - ${randomQuestion.answer_B}\n\n${answer_C} - ${randomQuestion.answer_C}\n\n${answer_D} - ${randomQuestion.answer_D}\n\n`);
            questionEmbed.setColor("#xxxxxx".replace(/x/g, _y => (Math.random() * 16 | 0).toString(16)))
            questionChannel.send(questionEmbed).then(async msg => {
                await msg.react('🇦');
                await msg.react('🇧');
                await msg.react('🇨');
                await msg.react('🇩');
            }).
            catch(console.error);
            db.close();
        }, 3000);
    })
    losuj_pytanie.start();
}