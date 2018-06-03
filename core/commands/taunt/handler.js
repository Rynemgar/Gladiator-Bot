const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const MessageController = require('../message-controller');

class TauntCommand extends MessageController  {
  constructor() {
    super();
    this.cooldown = 5000;
  }
  handler(message) {
    message.delete(1000);
    const target = message.mentions.users.first();
    if (this.lastUsed + this.cooldown > Date.now()) return;

    if (target && message.author.id === target.id) {
      message.channel.send(`${message.author} you want to taunt yourself?!`);
    return;
    }
    const mention = message.mentions.users.size > 0;
    let response = randomElement(responses[mention ? 'mention' : 'noMention']);
    response = parseVariables(response, message);
    message.channel.send(response);

    this.lastUsed = Date.now();
  }
}

module.exports = new TauntCommand();