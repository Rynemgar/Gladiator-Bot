const config = require('../../config');

class MessageController {
  handleMessage(message) {
    const isGlobalMessage = this.global;
    const isInColosseum = message.channel.name === 'colosseum';
    const isInDevServer = message.guild.id === config.devServer;

    if (isGlobalMessage || isInColosseum || isInDevServer) {
      this.handler(message);
    }
  }
}