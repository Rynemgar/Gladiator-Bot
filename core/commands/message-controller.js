const config = require('../../config');

class MessageController {
  handleMessage(message) {
    const isGlobalMessage = this.global;
    const isInColosseum = message.channel.name === 'colosseum';

    if (isGlobalMessage || isInColosseum) {
      this.handler(message);
    }
  }
}

module.exports = MessageController;