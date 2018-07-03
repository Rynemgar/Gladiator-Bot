const MessageController = require("../message-controller");
const querySql = require("../../../connection");

querySql(`
    SELECT
        Level,
        OverallStatPoints
    FROM Levels
    WHERE UserID = ${message.author.id}
    `)
    .then((results) => {
        const level = results[0] ? results[ 0 ].Level : 0;
        const asp = results[0] ? results[ 0 ].OverallStatPoints : 0;
    
const availsp = (((level - 1) * 3) - asp)
if (
  message.content.startsWith(".tip") &&
  message.content.includes("Gladiator Bot Beta") &&
  message.content.includes("sp")
) 
console.log("Successful to point 1")
{
if (availsp = 0) {
    message.reply("You have already used the maximum amount of stat points for your level.  Go and crush some skulls before returning to me again.")
    return;
 } else {
    const args = message.content.split(" ").slice(1);
    const amount = args[0];
    var spamt = math.eval(math.floor(`${amount} / 200`));
        if (spamt > availsp) {
            var sppurchased = availsp;
        } else {
            var sppurchased = spamt;
        }

  console.log(`${message.author} purchased ${sppurchased} stat points for ${amount}TRTL`);
 }}})

  querySql(`
 UPDATE \`GladiatorBot\`.\`Levels\`
 SET \`StatPoints\` = StatPoints + ${sppurchased}
 WHERE UserID = ${message.author.id}`)
 .then(results => {
    console.log(results);
  });

this.lastUsed = Date.now();
