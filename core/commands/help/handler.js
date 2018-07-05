
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
    message.channel.send(`${code}

    Commands,
    *Taunt = Taunt another user. What are they? Scared?!, 
    *Bow = Prepare to fight your opponent in hand to hand combat!, 
    *Shoot = Nock your bow and arrow and see if you can take that smile off their face!,
    *Level = Reports your current Level, Win Streak and Total Wins and Losses,
    *Leader = Returns a leaderboard of the top 10 Gladiators,
    *Balance = Return my current prize fund balance,
    *Stock = Display how many potions and stat points you currently hold,

    Gladiator Shop,
    Tipping Gbot in the following format where amount = cost of item, award items.
    
    Potion (150TRTL Each)
    .tip "amount" @GladiatorBot potions

    Stat Points (300TRTL Each)
    .tip "amount" @GladiatorBot spoints

    Using Stat Points
    *strength = add 2 to your strength - Increase your attack power,
    *defense = add 2 to your defense - Decrease damage taken,
    *agility = add 2 to agility - Increase your chance of hitting successfully

    Battle Commands,
    *Challenge = Challenge another user to a duel of sorts!,
    *Accept = accepts the challenge issued,
    *Spectate = announce who is currently battling,

    Attack Commands, (Attacks will only work if you are in combat - Combat is turn based)
    *Head = Has a 10% chance of inflicting 50 damage to your opponent,
    *Body = Has a 33% chance of inflicting 30 damage to your opponent,
    *Legs = has a 80% chance of inflicting 10 damage to your opponent,
    *Potion = Recover 30hp if you have a potion - 5% chance of healing for 100hp!

    And may the odds be *ever* in your favour!${code}
 ` );
 message.channel.send(`To contribute to my prize fund, tip me directly!`);
  this.lastUsed = Date.now();
}
  
}

module.exports = new HelpCommand();