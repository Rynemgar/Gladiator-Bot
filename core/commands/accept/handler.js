const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const querySql = require('../../../connection.js');
const MessageController = require('../message-controller');
const escape = require('mysql').escape;

class AcceptCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 1000;
  }
  handler(message) {
    if (message.guild) message.delete(10000);
    querySql(`INSERT IGNORE INTO Levels (userId) VALUES (${message.author.id})`).catch(console.error);
    querySql(`UPDATE \`GladiatorBot\`.\`Levels\` 
    SET \`username\` = ${escape(message.author.username)}
    WHERE \`UserId\` = ${message.author.id};`)
    .catch(console.error);
    if (this.lastUsed + this.cooldown > Date.now()) return;

    const challenge = challenges.acceptChallenge(message.author);

    if (challenge.success) {
      message.channel.send(`${challenge.data.challenger} and ${challenge.data.target} step into the arena.  Use the commands *head *body or *legs to attack your opponent!`);
    } else {
      // could handle challenge.message responses here if desired. could get spammy though
      console.log(challenge);
      message.channel.send(`You can't accept that challenge right now.  Either you weren't challenged or a battle is already ongoing`)
    }

    this.lastUsed = Date.now();
  }
}

module.exports = new AcceptCommand();