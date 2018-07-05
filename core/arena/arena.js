const Gladiator = require("./gladiator");
const querySql = require("../../connection");
const colosseum = require("../colosseum");
const request = require('request-promise-native');

class Arena {
  constructor() {
    this.inProgress = false;
    this.lastAttacker = false;

    this.baseGladiatorStats = {
      health: 100,
    };

    this.attacks = {
      head: {
        chance: 0.1,
        damage: 50,
      },
      body: {
        chance: 0.33,
        damage: 30,
      },
      legs: {
        chance: 0.8,
        damage: 10,
        },
      potion: {
        chance: 1,
        damage: -30,
        targetSelf: true
      }
    };

    this.crits = {
      potion: {
        chance: 1,
        damage: -100,
        targetSelf: true
      }
    }

    this.arenaExpirationTime = 60000;
    setInterval(() => {
      if (
        this.lastAttacker &&
        this.lastAttacker.timestamp + this.arenaExpirationTime < Date.now()
      ) {
        this.expireArena();
      }
    }, 1000);
  }

  startFight(gladiator1, gladiator2) {
    if (this.inProgress) return false;
    this.gladiator1 = new Gladiator(gladiator1, this.baseGladiatorStats);
    this.gladiator2 = new Gladiator(gladiator2, this.baseGladiatorStats);
    this.inProgress = true;
    return true;
  }

  _getGladiator(user) {
    return user.id === this.gladiator1.id
      ? this.gladiator1
      : user.id === this.gladiator2.id
        ? this.gladiator2
        : null;
  }

  _attackGladiator(attackingUser, attack) {
    const attacker = this._getGladiator(attackingUser);
    const target =
      attacker === this.gladiator1 ? this.gladiator2 : this.gladiator1;
    if (attacker && target) {
      if (!this.lastAttacker || this.lastAttacker.user.id !== attacker.id) {
        this.lastAttacker = {
          user: attacker,
          timestamp: Date.now()
        };
        const roll = Math.random();
        const agi = attacker.agility * 0.001;
        console.log(agi);
        if (roll < attack.chance + agi) {
          if (attack.targetSelf) {
            attacker.damage(attack.damage);
          } else {
            const dam = Math.floor((((attacker.strength - 10) * 0.5) + attack.damage)-((target.defense -10) * 0.45));
            target.damage(dam);
            console.log();
          }

          if (target.health <= 0) {
            this.inProgress = false;
            this.lastAttacker = null;
            this.gladiator1 = null;
            this.gladiator2 = null;
            return this.endArena(attacker, target);
          }
          return {
            message: "HIT",
            gladiator: attacker,
            target
          };
         } else {
          return {
            message: "MISS",
            gladiator: attacker,
            target
          };
        }
      } else {
        return {
          message: "TURN"
        };
      }
    } else {
      return {
        message: "NOT_GLADIATOR"
      };
    }
  }

  expireArena() {
    console.log("Arena Expire");
    console.log(`The last attacker is`, this.lastAttacker);
    const winner = this.lastAttacker.user.id === this.gladiator1.id ? this.gladiator1 : this.gladiator2;

if (!winner) {
  colosseum.send(`I guess ${this.gladiator1} and ${this.gladiator2} fell asleep.  Arena Expired!`)
  
} else {
  colosseum.send(`I guess your opponent has run scared ${winner.userObject}.  Release the Lions!`);
  const loser = winner === this.gladiator1 ? this.gladiator2 : this.gladiator1;
  this.endArena(winner, loser);
}
  this.inProgress = false;
  this.lastAttacker = null;
  this.gladiator1 = null;
  this.gladiator2 = null;
  }

  endArena(winner, loser) {
    querySql(`
      SELECT 
        Experience,
        Level,
        Wins,
        Losses 
      FROM Levels 
      WHERE UserID = ${winner.id}
    `)
      .then(results => {
        const xpworkout = Math.floor((loser.agility + loser.strength + loser.defense) - (winner.agility + winner.strength + winner.defense) + 20)
        const awardedXp = (xpworkout < 5) ? 5 : xpworkout;
        const xp = results[0].Experience;
        const requiredXp = Math.floor(((results[0].Level / 2)*5)*20)
        let query;
        
        if (xp + awardedXp > requiredXp) {
          request({
            uri: 'http://krruzic.xyz:5000/balance?pid=ca746b821dad1d8458ec0f78880929049cb7db39d1e5381b8392522871d661d7',
            method: 'GET',
            json: true
          }).then((response) => {
            var count = response.balance
          }).catch((err) => {
            console.log(err)
          })
          query = `
           UPDATE \`GladiatorBot\`.\`Levels\` 
           SET \`Experience\` = 0,
               \`Level\` = Level + 1,
               \`Wins\` = Wins + 1,
               \`OverallWins\` = OverallWins + 1,
               \`Streak\` = Streak + 1
           WHERE \`UserId\` = ${winner.id};

           UPDATE \`GladiatorBot\`.\`Levels\`
           SET \`Losses\` = Losses + 1,
                \`OverallLosses\` = OverallLosses + 1,
               \`Streak\` = Streak = 0
           WHERE \`UserId\` = ${loser.id};
            `;
          colosseum.send(
            `${winner.userObject} gained ${awardedXp} and is now level ${results[0].Level + 1}!`
          );
          request({
            uri: 'http://krruzic.xyz:5000/balance?pid=ca746b821dad1d8458ec0f78880929049cb7db39d1e5381b8392522871d661d7',
            method: 'GET',
            json: true
          }).then((response) => {
            var count = response.balance
            colosseum.send(
              `.tip ${Math.floor(count/10000)} ${winner.userObject} Congratulations champion!`
            );
          }).catch((err) => {
            console.log(err)
          })
        } else {
          query = `
            UPDATE \`GladiatorBot\`.\`Levels\` 
            SET \`Experience\` = Experience + ${awardedXp},
                \`Wins\` = Wins + 1,
                \`OverallWins\` = OverallWins + 1,
                \`Streak\` = Streak + 1
            WHERE \`UserId\` = ${winner.id};

            UPDATE \`GladiatorBot\`.\`Levels\`
            SET \`Losses\` = Losses + 1,
                 \`OverallLosses\` = OverallLosses + 1,
                \`Streak\` = Streak = 0
            WHERE \`UserId\` = ${loser.id};
              `;
          colosseum.send(
            `${winner.userObject} gained ${awardedXp} and is now only ${requiredXp -
              (xp + awardedXp)}xp from reaching level ${results[0].Level + 1}!`
          );
          request({
            uri: 'http://krruzic.xyz:5000/balance?pid=ca746b821dad1d8458ec0f78880929049cb7db39d1e5381b8392522871d661d7',
            method: 'GET',
            json: true
          }).then((response) => {
            var count = response.balance
            colosseum.send(
              `.tip ${Math.floor(count/10000)} ${winner.userObject} Congratulations champion!`
            );
          }).catch((err) => {
            console.log(err)
          })
        }
        return querySql(query);
      })
      .then(() => {
        console.log(`Updated ${winner.id}`);
      })
      .catch(console.error);

    return {
      message: "WIN",
      winner,
      loser
    };
  }

  attackHead(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.head);
  }

  attackBody(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.body);
  }

  attackLegs(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.legs);
  }

  attackPotion(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.potion);
  }

  critPotion(attackingUser) {
    return this._attackGladiator(attackingUser, this.crits.potion);
  }
}

module.exports = new Arena();
