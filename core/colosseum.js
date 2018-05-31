const client = require('./client');

class Colosseum {
  constructor() {
    if (client.readyAt) {
      this.getColosseum();
    } else {
      client.on('ready', () => {
        this.getColosseum();
      })
    }
  }

  getColosseum() {
    const server = client.guilds.first();
    this.channel = server.channels.find('name', 'colosseum');
  }

  send() {
    this.channel.send(arguments);
  }
}

module.exports = new Colosseum();