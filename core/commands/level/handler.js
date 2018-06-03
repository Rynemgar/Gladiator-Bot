const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const querySql = require('../../../connection.js');

class LevelCommand {
  constructor() {
    this.cooldown = 5000;
  }

  handler(message) {
    message.delete(1000);
    querySql(`INSERT IGNORE INTO Levels (userId) VALUES (${message.author.id})`)
      .then(() => querySql(`
        SELECT Level,
              Wins,
              Losses,
              Streak 
        FROM Levels 
        WHERE UserID = ${message.author.id}
      `))

      .then((results) => {
        const level = results[0] ? results[ 0 ].Level : 0;
        const wins = results[0] ? results[ 0 ].Wins : 0;
        const losses = results[0] ? results[ 0 ].Losses : 0;
        const streak = results[0] ? results[ 0 ].Streak : 0;
        message.reply(`You are currently Level ${level} with a winning streak of ${streak} and a total of ${wins} wins and ${losses} losses!`);
      })
      .catch(console.error);


    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();
  }
}

module.exports = new LevelCommand();