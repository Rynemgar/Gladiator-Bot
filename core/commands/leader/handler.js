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
        LIMIT 10
        ORDER BY Wins DESC
  `)
        .then((results) => {
            colosseum.send(`${results}`)
        })
    
    .catch(console.error);
  }
}