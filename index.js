const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = require("./token.json");
const fs = require("fs");
const messageHandler = require('./core/message-handler');



client.on("ready", () => {
  console.log("I am ready...Are you?!");
});

client.on('message', messageHandler);


client.login(token.token);