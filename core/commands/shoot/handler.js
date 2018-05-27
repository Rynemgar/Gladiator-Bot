const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');

class ShootCommand {
  constructor() {
    this.cooldown = 5000;
  }
  handler(message) {
    if (this.lastUsed + this.cooldown > Date.now()) return;

    const mention = message.mentions.users.size > 0;
    let response = randomElement(responses[mention ? 'mention' : 'noMention']);
    response = parseVariables(response, message);
    message.channel.send(response);

    this.lastUsed = Date.now();
  }
}

module.exports = new ShootCommand();