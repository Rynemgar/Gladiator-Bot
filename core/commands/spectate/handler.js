const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const arena = require('../../arena/arena');

class SpectateCommand {
  constructor() {
    this.cooldown = 5000;
  }
  handler(message) {
    message.delete(1000);
    const target = message.mentions.users.first();
    if (this.lastUsed + this.cooldown > Date.now()) return;

    if (arena.inProgress) {
      message.channel.send(`${message.author} sits down to enjoy the show. 
      Currently ${arena.gladiator1.userObject} (${arena.gladiator1.health}hp) is fighting ${arena.gladiator2.userObject} (${arena.gladiator2.health}hp)`);
    } else {
      message.channel.send(`${message.author} sits down to watch an empty arena...`);
    }

    this.lastUsed = Date.now();
  }
}

module.exports = new SpectateCommand();