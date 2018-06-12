const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const knex = require('../../../utils/knex');
const MessageController = require('../message-controller');

class LevelCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }

  handler(message) {
    message.delete(1000);

    const insertLevel = knew.raw(knex('levels').insert({ userId: message.author.id }).toString().replace('insert', 'INSERT IGNORE'))
    const selectLevel = knex('levels').select('Level', 'Wins', 'Losses', 'Streak').where('UserID', message.author.id)

    Promise.all([insertLevel, selectLevel])
    .then(function(insertResult, selectResult) {
      
      const level = selectResult[0] ? selectResult[0].Level : 0;
      const wins = selectResult[0] ? selectResult[0].Wins : 0;
      const losses = selectResult[0] ? selectResult[0].Losses : 0;
      const streak = selectResult[0] ? selectResult[0].Streak : 0;

      message.reply(`You are currently Level ${level} with a winning streak of ${streak} and a total of ${wins} wins and ${losses} losses!`);
    })
    .catch(console.error);

    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();
  }
}

module.exports = new LevelCommand();