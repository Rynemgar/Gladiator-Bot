const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const arena = require('../../arena/arena');
const MessageController = require('../message-controller');
const config = require('../../../config');

class SaygenCommand extends MessageController {
  constructor() {
    super();
    this.global = true;
    this.cooldown = 0;
  }
  
  handler(message) {
    message.delete(10);
    const args = message.content.slice().split(/ +/);
    
    if(message.author.id !== config.ownerID) {
      message.channel.send("Only our Emperor can use my voice!");
			return; //stop other people commanding bot
    }
    
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }
    
  message.guild.channels.find("name", "colosseum").send(`${args.join(" ")}`);

    this.lastUsed = Date.now();
  }
}

module.exports = new SaygenCommand();