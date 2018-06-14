const config = require('../config');
const commands = require('./commands');
const querySql = require('../connection');

module.exports = message => {
    if (message.content[ 0 ] !== config.prefix) return;
    //if (message.author.bot) return;
    const trigger = message.content.split(' ')[ 0 ].slice(1).toLowerCase();
    if (commands[ trigger ]) commands[ trigger ].handleMessage(message);

    if (
        message.content.startsWith(".tip") &&
        message.mentions.users.id === 451080343223533578 &&
        message.content.includes("potions")
      ) 
      console.log("Successful to point 1")
      {
        const args = message.content.split(" ").slice(1);
        const amount = args[0];
        const potionamt = math.eval(math.floor(amount / 150));
      
        console.log(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);
      
        querySql(`
       UPDATE \`GladiatorBot\`.\`Levels\`
       SET \`Potions\` = Potions + ${potionamt}
       WHERE UserID = ${message.author.id}`)
       .then(results => {
          console.log(results);
        });
      }
};