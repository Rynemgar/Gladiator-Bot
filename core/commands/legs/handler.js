const arena = require('../../arena/arena');

class legsCommand {
  constructor() {
    this.cooldown = 1000;
  }
  handler(message) {
    if (this.lastUsed > Date.now() + this.cooldown) return;

    if (arena.inProgress) {
      const result = arena.attackLegs(message.author);
      switch (result.message) {
        case 'WIN':
          // handle win conditions
          message.channel.send(`${result.winner.userObject} was victorious. ${result.loser.userObject} remains lifeless on the ground.`);
          break;
        case 'HIT':
          //Handle hit
          message.channel.send(`${result.gladiator.userObject} lands a glancing slice to the legs of ${result.target.userObject}. ${result.target.health}hp remaining!`);
          break;
        case 'MISS':
          // Handle miss
          message.channel.send(`${result.gladiator.userObject} swings at ${result.target.userObject} but they ducked out of the way. ${result.target.health}hp remaining!`);
          break;
        case 'NOT_GLADIATOR':
          // Handle not gladiator
          message.channel.send(`${message.author} is trying to get in on the action. GUARDS?!`);
          break;
        default:
          console.log(result);
      }
    }

    this.lastUsed = Date.now();
  }
}

module.exports = new legsCommand();