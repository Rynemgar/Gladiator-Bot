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
      querySql(`
        SELECT UserId, 
                Wins,
                Losses 
        FROM Levels
        ORDER BY Wins DESC
        LIMIT 10
  `)
        .then((results) => {
            message.channel.send(`${results}`)
        })
    
    .catch(console.error);
    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();
  }
}

module.exports = new LevelCommand();