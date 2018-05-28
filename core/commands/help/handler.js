class HelpCommand {
  constructor() {
    this.cooldown = 0;
  }
  handler(message) {
    message.channel.send(`

    Fun Commands,
    *Taunt* = Taunt another user. What are they? Scared?!, 
    *Bow* = Prepare to fight your opponent in hand to hand combat!, 
    *Shoot* = Nock your bow and arrow and see if you can take that smile off their face!,

    Battle Commands,
    *Challenge* = Challenge another user to a duel of sorts!,
    *Accept* = accepts the challenge issued,

    Attack Commands, (Attacks have a 3 second cooldown - This will become turn based in future)
    *Head* = Has a 10% chance of inflicting 50 damage to your opponent,
    *Body* = Has a 33% chance of inflicting 30 damage to your opponent,
    *Legs* = has a 80% chance of inflicting 10 damage to your opponent,

    And may the odds be *ever* in your favour!
  `);
  }
}

module.exports = new HelpCommand();