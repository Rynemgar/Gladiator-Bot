const client = require('./client');

class Colosseum {
  constructor() {
    if (client.readyAt) {
      this.getColosseum();
    } else {
      client.on('ready', () => {
        console.log(`I am ready... Are You?`);
        this.getColosseum();
        this.send(`The doors open to the arena. Who will be the first challenger?`);
      })
    }
  }

  getColosseum() {
    this.server = client.guilds.first();
    this.channel = this.server.channels.find('name', 'colosseum');
  }
  getMemberById(id) {
    return this.server.members.find('id', id);
  }

  send(message) {
    this.channel.send(message);
  }
}

module.exports = new Colosseum();