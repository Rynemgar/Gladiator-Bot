class HelpCommand {
  constructor() {
    this.cooldown = 0;
  }
  handler(message) {
    message.channel.send(`
    *Challenge* = Challenge another user to a duel of sorts!, 
    *Taunt* = Taunt another user. What are they? Scared?!, 
    *Bow* = Prepare to fight your opponent in hand to hand combat!, 
    *Shoot* = Nock your bow and arrow and see if you can take that smile off their face!
  `);
  }
}

module.exports = new HelpCommand();