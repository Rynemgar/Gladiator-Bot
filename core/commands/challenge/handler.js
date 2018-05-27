const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');

class ChallengeCommand {
  constructor() {
    this.cooldown = 5000;
  }

  handler(message) {
    if (this.lastUsed + this.cooldown > Date.now()) return;

    const mention = message.mentions.users.size > 0;
    let response = randomElement(responses[mention ? 'mention' : 'noMention']);
    response = parseVariables(response, message);
    message.channel.send(response);
    
    if (mention) {
      challenges.addChallenge(message.author, message.mentions.users.first());
    }

    this.lastUsed = Date.now();
  }
}


module.exports = new ChallengeCommand();