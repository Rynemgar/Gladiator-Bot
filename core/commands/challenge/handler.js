const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const querySql = require('../../../connection.js');
const MessageController = require('../message-controller');
const escape = require('mysql').escape;

class ChallengeCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }

  handler(message) {
    if (message.guild) message.delete(1000);
    if (this.lastUsed + this.cooldown > Date.now()) return;
    this.lastUsed = Date.now();

    querySql(`INSERT IGNORE INTO Levels (userId) VALUES (${message.author.id})`).catch(console.error);
    querySql(`UPDATE \`GladiatorBot\`.\`Levels\` 
    SET \`username\` = ${escape(message.author.username)}
    WHERE \`UserId\` = ${message.author.id};`)
    .catch(console.error);

    const target = message.mentions.users.first();
    if (arena.inProgress === true) {
      message.channel.send(`${message.author} there is already a battle in progress.  Please wait for it to finish before issuing your challenge`);
      return;
    }
    if (target && message.author.id === target.id) {
      message.channel.send(`${message.author} if you want to fall on your own sword, please do it elsewhere`);
    return;
    }
    
        const mention = message.mentions.users.size > 0;
    let response = randomElement(responses[mention ? 'mention' : 'noMention']);
    response = parseVariables(response, message);
    message.channel.send(response);
    
    if (mention) {
      challenges.addChallenge(message.author, message.mentions.users.first());
    }
  }
}


module.exports = new ChallengeCommand();