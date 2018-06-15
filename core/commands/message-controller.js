const config = require('../../config');
const logger = require('../logger');

class MessageController {
  handleMessage(message) {
    if (message.content[ 0 ] !== config.prefix) return;
    const isBot = message.author.bot;
    const isGlobalMessage = this.global;
    const isInColosseum = message.channel.name === 'colosseum';

    if (!isBot && (isGlobalMessage || isInColosseum)) {
      const date = new Date();
      console.log(`[${date.toUTCString()}] ${message.author.username}: ${message.content}`);
      this.handler(message);
    }
  }
}

module.exports = MessageController;