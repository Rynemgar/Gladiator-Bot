const arena = require('../../arena/arena');
const MessageController = require('../message-controller');
const querySql = require('../../../connection');
const bold = "**";

class PotionCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 1000;
  }
  handler(message) {
    if (message.guild) message.delete(7500);
    if (this.lastUsed + this.cooldown > Date.now()) return;
    
    querySql(`
      SELECT
        Potions
      FROM Levels
      WHERE UserID = ${message.author.id}
      `)
      .then((results) => {
        const potionAmt = results[0] && results[ 0 ].Potions;
        console.log(results);
      
    
    
    if (arena.inProgress) {
      if (!potionAmt) {
        message.channel.send(`You don't have any potions at hand Gladiator ${message.author}`)
      return;
      }
      this.crit = {
        chance: 0.95
      }
      
      const roll = Math.random();
        if (roll < this.crit.chance) {
          const result = arena.attackPotion(message.author);
      switch (result.message) {
        case 'HIT':
          //Handle hit
          message.channel.send(`${result.gladiator.userObject} drinks a potion of obscure colour! Their health seems to improve! ${bold}${result.gladiator.health}hp${bold} remaining!`);
          break;
        case 'NOT_GLADIATOR':
          // Handle not gladiator
          message.channel.send(`${message.author} is trying to get in on the action. GUARDS?!`);
          break;
        case 'TURN':
          // Handle out of turn
          message.channel.send('How about you give your opponent a chance?  The fans don\'t like one sided battles');
          break;
        default:
          console.log(result);
      }
    }
    else {
      const result = arena.critPotion(message.author);
      switch (result.message) {
        case 'HIT':
          //Handle Crit potion
          message.channel.send(`${result.gladiator.userObject} drinks a potion and immediately looks greatly recovered! ${result.gladiator.health}hp remaining!`)
          break;
        case 'NOT_GLADIATOR':
          // Handle not gladiator
          message.channel.send(`${message.author} is trying to get in on the action. GUARDS?!`);
          break;
        case 'TURN':
          // Handle out of turn
          message.channel.send('How about you give your opponent a chance?  The fans don\'t like one sided battles');
          break;
        default:
          console.log(result);
    }
  }

    querySql(`
      UPDATE \`GladiatorBot\`.\`Levels\`
      SET \`Potions\` = Potions - 1
      WHERE UserID = ${message.author.id}`)
    .then((results) => {
      console.log(results)
    })
    this.lastUsed = Date.now();
  }
})
  }
}

module.exports = new PotionCommand();
