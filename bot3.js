const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = require("./token.json");
const fs = require("fs");

client.on("ready", () => {
  console.log("I am ready...Are you?!");
});

client.on('message', message => {
    if (message.content[0] !== config.prefix) return;
    const commands = {
        'prefix': () => {
            if(message.author.id !== config.ownerID) {
            message.channel.send("Only our Emporer can change my prefix!");
            return; //stop other people commanding bot
            }
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        // change the configuration in memory
        config.prefix = newPrefix;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);},
        'challenge': () => {
            message.channel.send(`${user.toString()} You have been challenged to ritual combat!  Proceed to the arena... If you dare!`)
                },
        'taunt': () => {
            message.channel.send(`You're being taunted! Will you stand for that or ${config.prefix}challenge the coward!?`)
        }
    }
    const trigger = message.content.split(' ')[0].slice(1);
    commands[trigger]();
  })


client.login(token.token);