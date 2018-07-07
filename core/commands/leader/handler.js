const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const querySql = require('../../../connection.js');
const MessageController = require('../message-controller');
const colosseum = require('../../colosseum');

class LevelCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }

  handler(message) {
    if (message.guild) message.delete(1000);
    if (this.lastUsed + this.cooldown > Date.now()) return;
    this.lastUsed = Date.now();
   
        colosseum.send(`Top 10 most fierce Gladiators can be found at http://www.turtacus.com/leaderboard`);
        
  }
}

module.exports = new LevelCommand();