const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const MessageController = require('../message-controller');

class ShootCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }
  handler(message) {
    if (message.guild) message.delete(1000);
    const target = message.mentions.users.first();
    if (this.lastUsed + this.cooldown > Date.now()) return;

    if (target && message.author.id === target.id) {
      message.channel.send(`${message.author} if you want to shoot an arrow into your own heart, please do it elsewhere`);
    return;
    }

    const mention = message.mentions.users.size > 0;
    let response = randomElement(responses[mention ? 'mention' : 'noMention']);
    response = parseVariables(response, message);
    message.channel.send(response);

    this.lastUsed = Date.now();
  }
}

module.exports = new ShootCommand();