const config = require('../../../config');
const fs = require('fs');

module.exports = (message) => {
  if(message.author.id !== config.ownerID) {
    message.channel.send("Only our Emperor can change my prefix!");
    return; //stop other people commanding bot
  }
  // change the configuration in memory
  config.prefix = message.content.split(" ").slice(1, 2)[ 0 ];
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
};