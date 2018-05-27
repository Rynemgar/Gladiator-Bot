const config = require('../config');
const commands = require('./commands');

module.exports = message => {
  if (message.content[0] !== config.prefix) return;
  if (message.author.bot) return;
  const trigger = message.content.split(' ')[0].slice(1);
  if (commands[trigger]) commands[trigger](message);
};