const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');
const challenges = require('../../arena/challenges');
const arena = require('../../arena/arena');
const querySql = require('../../../connection.js');
const MessageController = require('../message-controller');
const colosseum = require('../../colosseum');

class LevelCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 5000;
  }

  handler(message) {
    message.delete(1000);
    querySql(`
      SELECT UserId, 
              Wins,
              Losses 
      FROM Levels
      ORDER BY Wins DESC
      LIMIT 10
`)
.then((results) => {
  const users = results.map((user) => Object.assign({}, {
    userObject: colosseum.getMemberById(user.UserId)},
    
  ));
  console.log(users)
  colosseum.send(`Top 10 most fierce Gladiators!`);
  for (const user of users) {
     if (user.userObject) {
       colosseum.send(`${user.userObject.nickname}. Wins: ${user.Wins}, Losses: ${user.Losses}`)
     }
  }
})
  
    
    .catch(console.error);
    if (this.lastUsed + this.cooldown > Date.now()) return;


    this.lastUsed = Date.now();
  }
}

module.exports = new LevelCommand();