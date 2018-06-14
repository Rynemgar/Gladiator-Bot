const config = require('../config');
const commands = require('./commands');
const querySql = require('../connection');

module.exports = message => {
  //if (message.author.bot) return;
  const trigger = message.content.split(' ')[ 0 ].slice(1).toLowerCase();
  if (commands[ trigger ]) {
    return commands[ trigger ].handleMessage(message);
  }

  if (
    message.content.startsWith(".tip") &&
    message.mentions.users.get('451080343223533578') &&
    message.content.includes("potions")
  ) {
    const args = message.content.split(" ").slice(1);
    const amount = args[ 0 ];
    const potionamt = Math.floor(amount / 150);

    querySql(`
         UPDATE \`GladiatorBot\`.\`Levels\`
         SET \`Potions\` = Potions + ${potionamt}
         WHERE UserID = ${message.author.id}`)
      .then(results => {
        console.log(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);
      })
      .catch(e => {
        console.error(e);
      });
  }
};