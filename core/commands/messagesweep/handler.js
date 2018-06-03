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
    let messageCount;
    const args = message.content.split(' ');
    if (args.length > 1) {
    messageCount = parseInt(args[1].slice(1));
    } else {
         messageCount = 5;
} 
  message.channel.fetchMessages({limit: messageCount}).then(messages => message.channel.bulkDelete(messages));
  }
}

module.exports = new MessageSweepCommand();