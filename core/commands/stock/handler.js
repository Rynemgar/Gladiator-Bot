const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const querySql = require('../../../connection.js');
const MessageController = require('../message-controller');

class StockCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }

  handler(message) {
    if (message.guild) message.delete(1000);
    querySql(`INSERT IGNORE INTO Levels (userId) VALUES (${message.author.id})`)
      .then(() => querySql(`
        SELECT Potions
        FROM Levels
        WHERE UserId = ${message.author.id}
        `))

      .then((results) => {
        const stock = results[0] ? results[ 0 ].Potions : 0;
        
        message.reply(`you are currently holding ${stock} potions.
To purchase more at 150 TRTL each, tip Gladiator bot in the following way:

.tip *amount* @Gladiator Bot potions

You must include the word potions!`);
      })
      .catch(console.error);


    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();
  }
}

module.exports = new StockCommand();