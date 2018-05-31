const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');

class BowCommand {
  constructor() {
    this.cooldown = 5000;
  }
  handler(message) {
    message.delete(1000);
    const target = message.mentions.users.first();
    if (this.lastUsed + this.cooldown > Date.now()) return;

    if (target && message.author.id === target.id) {
      message.channel.send(`${message.author} how do you even bow to yourself?`);
    return;
    }

    const mention = message.mentions.users.size > 0;
    let response = randomElement(responses[mention ? 'mention' : 'noMention']);
    response = parseVariables(response, message);
    message.channel.send(response);

    this.lastUsed = Date.now();
  }
}

module.exports = new BowCommand();