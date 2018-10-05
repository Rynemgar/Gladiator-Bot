const config = require('../config');
const commands = require('./commands');
const querySql = require('../connection');

module.exports = message => {
  //if (message.author.bot) return;
  const trigger = message.content.split(' ')[ 0 ].slice(1).toLowerCase();
  if (commands[ trigger ]) {
    return commands[ trigger ].handleMessage(message);
  }
  const filter = (reaction, user) => reaction.emoji.name === '💸' && user.id === '413887034864697364';
  if (
    message.content.startsWith(".tip") &&
    message.mentions.users.get('447326000758652929') &&
    message.content.includes("potions")
  ) {
    message.awaitReactions(filter, { time: 1500 })
      .then((collected) => {
        console.log(collected);
        if (collected.array().length === 0) throw new Error('No 💸 reactions :(');
        const args = message.content.split(" ").slice(1);
        const amount = args[ 0 ];
        const potionamt = Math.floor(amount / 25);

        querySql(`
         UPDATE \`GladiatorBot\`.\`Levels\`
         SET \`Potions\` = Potions + ${potionamt}
         WHERE UserID = ${message.author.id}`)
          .then(results => {
            message.channel.send(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);
            console.log(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
        message.channel.send(`Your purchase was unsuccessful ${message.author}`)
      });
  }
  
  querySql(`
    SELECT
        Level,
        OverallStatPoints
    FROM Levels
    WHERE UserID = ${message.author.id}
  `)
    .then((results) => {
      const level = results[ 0 ] ? results[ 0 ].Level : 0;
      const asp = results[ 0 ] ? results[ 0 ].OverallStatPoints : 0;

      const availsp = (((level - 1) * 3) - asp)
      if (
        message.content.startsWith(".tip") &&
        message.mentions.users.get('447326000758652929') &&
        message.content.includes("spoints")
      ) {
        message.awaitReactions(filter, { time: 1500 })
          .then((collected) => {
            console.log(collected)
            if (collected.array().length === 0) throw new Error('No 💸 reactions :(')
            {
              if (availsp < 1) {
                const args = message.content.split(" ").slice(1);
                const amount = args[ 0 ];
                message.reply("You have already used the maximum amount of stat points for your level.  Go and crush some skulls before returning to me again.")
                message.channel.send(`.tip ${amount} ${message.author} - Refund for your failed purchase`)
                return;
              } else {
                const args = message.content.split(" ").slice(1);
                const amount = args[ 0 ];
                var spamt = Math.floor(amount / 100);
                if (spamt > availsp) {
                  var sppurchased = availsp;
                } else {
                  var sppurchased = Math.floor(amount / 100);
                }
              
              querySql(`
                 UPDATE \`GladiatorBot\`.\`Levels\`
                 SET \`StatPoints\` = StatPoints + ${escape(sppurchased)},
                      \`OverallStatPoints\` = OverallStatPoints + ${escape(sppurchased)}
                 WHERE UserID = ${message.author.id}`)
                .then(results => {
                  message.channel.send(`${message.author} purchased ${sppurchased} stat points for ${amount}TRTL`);
                  console.log(`${message.author} purchased ${sppurchased} stat points for ${amount}TRTL`);
                })
                .catch(e => {
                  console.error(e);
                });
            }}
          })
          .catch(e => {
            console.error(e);
            message.channel.send(`Your purchase was unsuccessful ${message.author}`)
          })
      }
    })
}