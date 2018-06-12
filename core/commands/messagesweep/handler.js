const config = require('../../../config');
const MessageController = require('../message-controller');

class MessageSweepCommand extends MessageController {
  constructor() {
		super();
		this.global = true;
    this.cooldown = 0;
  }
  handler(message) {
    const args = message.content.slice().split(/ +/);
		const amount = parseInt(args[0]) + 1;
		
		if(message.author.id !== config.ownerID) {
      message.channel.send("Only our Emperor can command this!");
			return; //stop other people commanding bot
		}
			
		else if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
  }
}
module.exports = new MessageSweepCommand();