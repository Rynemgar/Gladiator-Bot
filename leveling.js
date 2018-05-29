const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

module.exports = function handler(message) {
  let userData = points[message.author.id];
  userData.points++;

  let currentLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (currentLevel > userData.points) {
    // Level up!
    userData.points = currentLevel;
    message.reply(`You"ve leveled up to points **${currentLevel}**! Ain"t that dandy?`);
  }

  if (message.content.startsWith(prefix.config + "points")) {
    message.reply(`You are currently level ${userData.level}.`);
  }
  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

};