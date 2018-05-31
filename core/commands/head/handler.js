const arena = require('../../arena/arena');

class HeadCommand {
  constructor() {
    this.cooldown = 0;
  }
  handler(message) {
    message.delete(7500);
    if (this.lastUsed + this.cooldown > Date.now()) return;

    if (arena.inProgress) {
      const result = arena.attackHead(message.author);
      switch (result.message) {
        case 'WIN':
          // handle win conditions
          message.channel.send(`${result.winner.userObject} was victorious. ${result.loser.userObject} remains lifeless on the ground.`);
          break;
        case 'HIT':
          //Handle hit
          message.channel.send(`${result.gladiator.userObject} lands a significant blow to the head of ${result.target.userObject}. ${result.target.health}hp remaining!`);
          break;
        case 'MISS':
          // Handle miss
          message.channel.send(`${result.gladiator.userObject} lines up for a hit to ${result.target.userObject} and misses extraordinarily. ${result.target.health}hp remaining!`);
          break;
        case 'TURN':
          // Handle out of turn
          message.channel.send('How about you give your opponent a chance?  The fans don\'t like one sided battles');
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

module.exports = new HeadCommand();