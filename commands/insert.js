const sqlite3 = require('sqlite3').verbose();

exports.run = async (client, message, args) => {
    let db = new sqlite3.Database('./userMoney.sqlite');
    db.run(`ALTER TABLE moneyset ADD answer text`)
    db.run(`UPDATE moneyset SET answer = 'brak' WHERE userID = '${message.author.id}'`);
}