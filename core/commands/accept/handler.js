const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');

class AcceptCommand {
  constructor() {
    this.cooldown = 30000;
  }
  handler(message) {
    message.delete(1000);
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