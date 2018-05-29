const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

let level = JSON.parse(fs.readFileSync("./levels.json", "utf8"));

module.exports = function handler(message) {
  if (!level[message.author.id]) level[message.author.id] = {
    level: 0,
    level: 0
  };
  let userData = level[message.author.id];
  userData.level++;

  let currentLevel = Math.floor(0.1 * Math.sqrt(userData.level));
  if (currentLevel > userData.level) {
    // Level up!
    userData.level = currentLevel;
    message.reply(`You"ve leveled up to level **${currentLevel}**! Ain"t that dandy?`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(`You are currently level ${userData.level}, with ${userData.level} level.`);
  }
  fs.writeFile("./levels.json", JSON.stringify(level), (err) => {
    if (err) console.error(err)
  });

});