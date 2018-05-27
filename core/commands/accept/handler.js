const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');

class AcceptCommand {
  constructor() {
    this.cooldown = 1000;
  }
  handler(message) {
    if (this.lastUsed > Date.now() + this.cooldown) return;

    const challenge = challenges.acceptChallenge(message.author);

    if (challenge.success) {
      message.channel.send(`${challenge.data.challenger} and ${challenge.data.target} step into the arena.`);
    } else {
      // could handle challenge.message responses here if desired. could get spammy though
      console.log(challenge);
      message.channel.send(`it broke...`)
    }

    this.lastUsed = Date.now();
  }
}

module.exports = new AcceptCommand();