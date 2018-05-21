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
        const member = message.mentions.members.first();
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
            if (member) {
                message.channel.send(`${member.user} You have been challenged to ritual combat by ${message.author}!  Proceed to the arena... If you dare!`)
            } else {
                message.channel.send(`${message.author}, must be drunk.  Who challenges nobody in particular?!`)
              }
            },
        'taunt': () => {
            if (member) {
                message.channel.send(`${member.user} You're being taunted by ${message.author}! Will you stand for that or ${config.prefix}challenge the coward?!`)
            }
            else {
                message.channel.send(`${message.author} must have a death wish!  Maybe consider taunting someone in particular next time eh?`)
            }
        },
        'git': () => {
            message.channel.send(`You can find the most recently updated code at https://github.com/Rynemgar/Gladiator-Bot`)
        }
    }
    const trigger = message.content.split(' ')[0].slice(1);
    commands[trigger]();
  })


client.login(token.token);