
const MessageController = require('../message-controller');
class GitCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 0;
  }
  handler(message) {
    if (message.guild) message.delete(1000);
    message.author.send(`You can find the most recently updated code at https://github.com/Rynemgar/Gladiator-Bot`)
  }
}

module.exports = new GitCommand();