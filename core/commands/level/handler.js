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
    querySql(`INSERT IGNORE INTO Levels (userId) VALUES (${message.author.id})`).catch(console.error);
    querySql(`
      SELECT Level 
      FROM Levels 
      WHERE UserID = ${message.author.id}
    `)
      .then((results) => {
        const level = results[0].Level;
        message.channel.send(`You are currently Level ${level}`);
      });
    
    if (this.lastUsed + this.cooldown > Date.now()) return;

       
    
    this.lastUsed = Date.now();
  }
}

module.exports = new LevelCommand();