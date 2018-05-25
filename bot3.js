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
    if (message.author.bot) return;
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
        },
        'help': () => {
            message.channel.send ("*Challenge* = Challenge another user to a duel of sorts!, *Taunt* = Taunt another user. What are they? Scared?!, *Bow* = Prepare to fight your opponent in hand to hand combat!, *Shoot* = Nock your bow and arrow and see if you can take that smile off their face!")
        },
        'bow': () => {
            if (message.mentions.users.size === 0) {
                switch (Math.floor((Math.random() * 6) + 1)) {
                    case 1:
                    message.reply(`bows to no-one in particular`);
                        break;
                    case 2:
                    message.reply(`adopts a fighting stance and look awkwardly at those around them`);
                        break;
                    case 3:
                    message.reply(`bows to the room and looks around meanacingly`);
                        break;
                    case 4:
                    message.reply(`looks like an idiot bowing to the wind.`);
                        break;
                    case 5:
                    message.reply(`bows his head in embarrasment having forgotten to name his opponent`);
                        break;
                    case 6:
                    message.reply(`forgot to bow to his opponent... Good start!`);
                        break;
                    default:
                    message.reply("error");
                }
            } else if (message.mentions.users.first()) {
                switch (Math.floor((Math.random() * 6) + 1)) {
                    case 1:
                    message.reply(`bows to ${message.mentions.users.first()} and adapts a fighting stance rarely seen in these parts...`);
                        break;
                    case 2:
                    message.reply(`bows to ${message.mentions.users.first()} and shows off their muscles`);
                        break;
                    case 3:
                    message.reply(`bows to ${message.mentions.users.first()} and looks like they're about to cry`);
                        break;
                    case 4:
                    message.reply(`bows to ${message.mentions.users.first()} and looks at his opponent meanacingly`);
                        break;
                    case 5:
                    message.reply(`bows to ${message.mentions.users.first()} and stands with unwavering eye contact`);
                        break;
                    case 6:
                    message.reply(`bows to ${message.mentions.users.first()} and tries to hide the fact they just wet themselves`);
                        break;
                    default:
                    message.reply("error");
                }
            }   
        },
        'shoot': () => {
            if (message.mentions.users.size === 0) {
                switch (Math.floor((Math.random() * 6) + 1)) {
                    case 1:
                    message.reply(`you shot yourself you fool!`);
                        break;
                    case 2:
                    message.reply(`you attempted to shoot yourself but you're lucky! You live!`);
                        break;
                    case 3:
                    message.reply(`you tried to shoot yourself but you missed and shot your friend... oops!`);
                        break;
                    case 4:
                    message.reply(`you shot yourself but managed to live. Though you'll forever have a scar`);
                        break;
                    case 5:
                    message.reply(`Woop woop! As you try to shoot yourself the police storm in and shoot the gun out of your hand!`);
                        break;
                    case 6:
                    message.reply(`you shot yourself, Idiot... You died!`);
                        break;
                    default:
                    message.reply("error");
                }
            } else if (message.mentions.users.first()) {
                switch (Math.floor((Math.random() * 6) + 1)) {
                    case 1:
                    message.reply(`shoots ${message.mentions.users.first()}.  Oh great, they managed to shoot themselves in the foot`);
                        break;
                    case 2:
                    message.reply(`shoots ${message.mentions.users.first()} and misses completely!`);
                        break;
                    case 3:
                    message.reply(`shoots ${message.mentions.users.first()}.  Right between the legs!  OOOOOH!`);
                        break;
                    case 4:
                    message.reply(`shoots ${message.mentions.users.first()} and misses by a mile!`);
                        break;
                    case 5:
                    message.reply(`attempts to shoot ${message.mentions.users.first()} but is out of bullets`);
                        break;
                    case 6:
                    message.reply(`shoots ${message.mentions.users.first()}!  Headshot! Boo Ya!`);
                        break;
                    default:
                    message.reply("error");
                }
            }   
        }
    };
    const trigger = message.content.split(' ')[0].slice(1);
    if (commands[trigger]) commands[trigger]();
  })


client.login(token.token);