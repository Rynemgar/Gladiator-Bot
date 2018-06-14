const colosseum = require('../../colosseum');
const MessageController = require('../message-controller');
const config = require('../../../config');

class SaygenCommand extends MessageController {
  constructor() {
    super();
    this.global = true;
    this.cooldown = 0;
  }
  handler(message) {
    if (message.guild) message.delete(10);
    const args = message.content.split(' ').slice(1);

    if(message.author.id !== config.ownerID) {
      message.channel.send("Only our Emperor can use my voice!");
			return; //stop other people commanding bot
    }
    
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }
    
    colosseum.server.channels.find("name", "general").send(`${args.join(" ")}`);

    this.lastUsed = Date.now();
  }
}

module.exports = new SaygenCommand();