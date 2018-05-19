const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = require("./token.json");
const fs = require("fs");

client.on("ready", () => {
  console.log("I am ready...Are you?!");
});

client.on("message", (message) => {
  // Exit and stop if it's not there
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.author.id !== config.ownerID) return; //stop other people commanding bot
  if(command === 'prefix') {
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    // change the configuration in memory
    config.prefix = newPrefix;
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  }
  
  if (!command || message.author.bot) return;

  if (command === 'challenge') {
    message.channel.send("You have been challenged to ritual combat!  Proceed to the arena... If you dare!");
  } else
  if (command === 'taunt') {
    message.channel.send("You're being taunted! Will you stand for that or !challenge the coward!?");
  }
});


client.login(token.token);