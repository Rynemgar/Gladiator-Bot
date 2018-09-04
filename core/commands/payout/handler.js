const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const querySql = require('../../../connection.js');
const MessageController = require('../message-controller');
const colosseum = require('../../colosseum');
const config = require('../../../config');

class PayoutCommand extends MessageController {
  constructor() {
    super();
    this.global = true;
    this.cooldown = 5000;
  }

  handler(message) {
    if (message.guild) message.delete(1000);
    if(message.author.id !== config.ownerID) {
        message.channel.send(`STOP! GUARDS! ${message.author} is trying to raid the vaults!`);
              return; //stop other people commanding bot
      }
      querySql(`
      SELECT UserId, 
              Wins,
              Losses 
      FROM Levels
      ORDER BY Wins DESC
      LIMIT 3
      `)
      .then((results) => {
        const users = results.map((user) => {
          return Object.assign({}, user, {
              userObject: colosseum.getMemberById(user.UserId)
            }
          )
        });
          message.channel.send(`.tip 1 ${users[0].userObject} with ${users[0].Wins} wins`);
          message.channel.send(`.tip 1 ${users[1].userObject} with ${users[1].Wins} wins`);
          message.channel.send(`.tip 1 ${users[2].userObject} with ${users[2].Wins} wins`);
      })

      querySql(`
        UPDATE Wins = 0, Losses = 0
        WHERE 1=1`)

    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();

}
}
module.exports = new PayoutCommand();