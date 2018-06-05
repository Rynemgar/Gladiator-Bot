const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const arena = require('../../arena/arena');
const MessageController = require('../message-controller');

class SayCommand extends MessageController {
  constructor() {
    super();
    this.global = true;
    this.cooldown = 5000;
  }
  handler(message) {
    message.delete(1);
    message.channel.send(`${message.content.replace}('!say ','')`)

    this.lastUsed = Date.now();
  }
}

module.exports = new SayCommand();