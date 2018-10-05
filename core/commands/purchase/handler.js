const MessageController = require("../message-controller");
const querySql = require("../../../connection");

if (
  message.content.startsWith(".tip") &&
  message.content.includes("Gladiator Bot Beta") &&
  message.content.includes("potions")
) 
console.log("Successful to point 1")
{
  const args = message.content.split(" ").slice(1);
  const amount = args[0];
  const potionamt = math.eval(math.floor(`${amount} / 25`));

  console.log(`${message.author} purchased ${potionamt} potions for ${amount}TRTL`);

  querySql(`
 UPDATE \`GladiatorBot\`.\`Levels\`
 SET \`Potions\` = Potions + ${potionamt}
 WHERE UserID = ${message.author.id}`)
 .then(results => {
    console.log(results);
  });
}

this.lastUsed = Date.now();
