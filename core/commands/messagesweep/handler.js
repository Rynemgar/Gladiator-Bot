const config = require('../../../config');
const fs = require('fs');

class MessageSweepCommand {
  constructor() {
    this.cooldown = 0;
  }
  handler(message) {
    message.delete(1000);
    if(message.author.id !== config.ownerID) {
      message.channel.send("Only our Emperor can command this!");
      return; //stop other people commanding bot
    }
    let messagecount = parseInt(message.content);
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  }
}

module.exports = new MessageSweepCommand();