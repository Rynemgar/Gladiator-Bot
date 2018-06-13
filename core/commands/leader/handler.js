const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const knex = require('../../../utils/knex');
const MessageController = require('../message-controller');
const colosseum = require('../../colosseum');

class LevelCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }

  handler(message) {
    message.delete(1000);
    if (this.lastUsed + this.cooldown > Date.now()) return;

    this.lastUsed = Date.now();
    
    knex('Levels')
    .select('UserId', 'Wins', 'Losses')
    .orderBy('Wins', 'desc')
    .limit(10)
      .then((results) => {
        const users = results.map((user) => {
          return Object.assign({}, user, {
              userObject: colosseum.getMemberById(user.UserId)
            }
          )
        });
        colosseum.send(`Top 10 most fierce Gladiators!`);
        let i = 1;
        // Prepend message with ``` to trigger code block
        let message = '```';

        for (const user of users) {
          // Set username if they have a user object with discord, otherwise unknown (probably in dev server or left the server)
          const username = user.userObject ? (user.userObject.nickname || user.userObject.user.username) : 'Unknown';

          // prepend each users message with a new line. Have to remove all indentation for this message
          message += `${i}. ${username}. Wins: ${user.Wins}, Losses: ${user.Losses}`;

          // Increment the leader number
          i++;
        }

        // Append message with ``` to end code block
        message += '```';
        colosseum.send(message);
      })
      .catch(console.error);
  }
}

module.exports = new LevelCommand();