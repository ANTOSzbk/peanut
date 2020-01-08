/* eslint-disable no-sync */
const Discord = require('discord.js');
const money = require('discord-money');
const quiz = require('../quiz.json');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./userMoney.sqlite');

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
    const questionChannel = client.channels.find(c => c.id === '663584733862690835')
    const questionEmbed = new Discord.RichEmbed().
    setTimestamp().
    setFooter(`Liczy się tylko pierwsza odpowiedź, zastanów się!`)
    var randomQuestion = quiz[Math.floor(Math.random() * quiz.length)];

    if (fs.existsSync('./question.txt')) {
        randomQuestion.question = fs.readFileSync('./question.txt', 'utf8');
        quiz.forEach(q => {
            if(q.question == randomQuestion.question) randomQuestion.correct_answer = q.correct_answer;
        })
        console.log(randomQuestion.question, randomQuestion.correct_answer);
    } else {
        randomQuestion = quiz[Math.floor(Math.random() * quiz.length)];
        fs.writeFile('./question.txt', randomQuestion.question, err => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        questionEmbed.setTitle(`❓ ${randomQuestion.question}`)
        questionEmbed.setDescription(`${answer_A} - ${randomQuestion.answer_A}\n\n\
        ${answer_B} - ${randomQuestion.answer_B}\n\n\
        ${answer_C} - ${randomQuestion.answer_C}\n\n\
        ${answer_D} - ${randomQuestion.answer_D}\n\n`);
        questionEmbed.setColor("#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16)))
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
    // const losuj_pytanie = new CronJob('*/20 * * * * *', () => {
    const losuj_pytanie = new CronJob('0 0 12 * * *', () => {
        client.users.forEach(async user => {
            db.get(`SELECT * FROM moneyset WHERE userID = '${user.id}' AND answer IS NOT NULL`, async (err, row) => {
                if (err) throw err;
                if (!row) {
                    // var stmt = db.prepare("INSERT INTO moneyset (userID, money, lastDaily, answer) VALUES (?,?,?,?)");
                    // stmt.run(user.id, 0, 'Not Collected', null);
                    // stmt.finalize();
                    // console.log(`Created a row for ${user.tag} in ready event.`)
                    //console.log(row);
                } else {
                    if (row.answer != null) {
                        console.log(randomQuestion.question, randomQuestion.correct_answer);
                        if (randomQuestion.correct_answer === row.answer) {
                            const bonus = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
                            user.send(`${correctMsg} W nagrodę otrzymujesz ${bonus} kredytów. 💰`);
                            await money.updateBal(user.id, bonus);
                        } else user.send(`${incorrectMsg} Prawidłowa odpowiedź to ${randomQuestion.correct_answer}.`);
                        db.run(`UPDATE moneyset SET answer = NULL WHERE userID = '${user.id}'`, err => {
                            if (err) throw err;
                        });
                    }
                }

            });
        });
        //db.run(`UPDATE moneyset SET answer = NULL WHERE userID = '', '' `)
        setTimeout(() => {
            randomQuestion = quiz[Math.floor(Math.random() * quiz.length)]
            // prevent same question twice in a row
            //randomQuestion.question === rQuestion_tmp ? randomQuestion = quiz[Math.floor(Math.random() * quiz.length)] : randomQuestion = randomQuestion;
            //rQuestion_tmp = randomQuestion.question;
            fs.writeFile('./question.txt', randomQuestion.question, err => {
                if (err) throw err;
                console.log(`Zapisano do /question.txt/ pytanie '${randomQuestion.question}'`);
            });
            questionEmbed.setTitle(`❓ ${randomQuestion.question}`)
            questionEmbed.setDescription(`${answer_A} - ${randomQuestion.answer_A}\n\n\
                        ${answer_B} - ${randomQuestion.answer_B}\n\n\
                        ${answer_C} - ${randomQuestion.answer_C}\n\n\
                        ${answer_D} - ${randomQuestion.answer_D}\n\n`);
            questionEmbed.setColor("#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16)))
            questionChannel.send(questionEmbed).then(async msg => {
                await msg.react('🇦');
                await msg.react('🇧');
                await msg.react('🇨');
                await msg.react('🇩');
            }).
            catch(console.error);
        }, 3000);
    })
    losuj_pytanie.start();
}