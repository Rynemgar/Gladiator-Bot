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
        SELECT Potions,
              StatPoints
        FROM Levels
        WHERE UserId = ${message.author.id}
        `))

      .then((results) => {
        const stock = results[0] ? results[ 0 ].Potions : 0;
        const stats = results[0] ? results[ 0 ].StatPoints : 0;
        
        message.reply(`you are currently holding ${stock} potions and have ${stats} Stat Points available to spend.
To purchase more potions at 25 TRTL each, tip Gladiator bot in the following way:

.tip *amount* @Gladiator Bot potions

You must include the word potions!

To purchase more stat points at 100 TRTL each, tip Gladiator bot in the following way:

.tip *amount* @Gladiator Bot spoints

You must include the word spoints!`);
      })
      .catch(console.error);


    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();
  }
}

module.exports = new StockCommand();