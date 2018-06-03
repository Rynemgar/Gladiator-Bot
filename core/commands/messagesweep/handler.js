const config = require('../../../config');
const fs = require('fs');
const MessageController = require('../message-controller');

class MessageSweepCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 0;
  }
  handler(message) {
    message.delete(1000);
    if(message.author.id !== config.ownerID) {
      message.channel.send("Only our Emperor can command this!");
      return; //stop other people commanding bot
    }
    let messagecount = parseInt(5);
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  }
}

module.exports = new MessageSweepCommand();