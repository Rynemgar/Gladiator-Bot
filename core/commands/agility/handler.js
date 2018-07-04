const MessageController = require("../message-controller");
const querySql = require("../../../connection");
const code = "```"

class AgilityCommand extends MessageController {
    constructor() {
      super();
      this.cooldown = 1000;
    }
    handler(message) {
querySql(`
    SELECT
        StatPoints,
        OverallStatPoints
    FROM Levels
    WHERE UserID = ${message.author.id}
    `)
    .then((results) => {
                const spavail = results[0] && results[ 0 ].StatPoints;

        if (spavail < 1) {
            message.author.send(`You have no available stat points.  Stat points can be purchased by tipping like
            ${code}.tip 200 @Turtacus spoints${code}`)
            return;
        }  else {      
            message.author.send(`You have successfully assigned a stat point to agility - You gain 2 Agility`)
        }
    })

    querySql(`
    UPDATE \`GladiatorBot\`.\`Levels\`
      SET \`StatPoints\` = StatPoints - 1,
           \`Agility\` = Agility + 2 
      WHERE UserID = ${message.author.id}`)
    .then((results) => {
      console.log(results)
    })
    }
}
    module.exports = new AgilityCommand();