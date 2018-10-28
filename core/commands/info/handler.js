
const MessageController = require('../message-controller');
class HelpCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 20000;
  }
  handler(message) {
    if (message.guild) message.delete(1000);
    if (this.lastUsed + this.cooldown > Date.now()) return;
    const code = "```"
    message.channel.send(`The <#447104196454514690> is a place to battle your friends and foes to the death.  In a turn based system of deciding which part of your opponent's body to attack, you systematically reduce them to nothing more than a pool of blood.
    Each week, the top three players with the most wins in the <#447104196454514690> are paid out a handsome prize.  Each taking a share of 20,000TRTL!
    For how to play, visit <#447104196454514690> and type *help.
    For further details, visit http://www.turtacus.com    
 ` );
 message.channel.send(`Every fight issues a prize to the winner which is a percentage of my overall prize fund.  The more I hold, the more you win!
 To contribute to my prize fund, tip me directly!`);
  this.lastUsed = Date.now();
}
  
}

module.exports = new HelpCommand();