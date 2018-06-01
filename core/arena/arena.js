const Gladiator = require('./gladiator');
const querySql = require('../../connection');
const colosseum = require('../colosseum');

class Arena {
  constructor() {
    this.inProgress = false;
    this.lastAttacker = false;

    this.baseGladiatorStats = {
      health: 100
    };

    this.attacks = {
      head: {
        chance: 0.1,
        damage: 50
      },
      body: {
        chance: 0.33,
        damage: 30
      },
      legs: {
        chance: 0.80,
        damage: 10
      },
      lions: {
        chance: 1,
        damage: 1000
      }
    };

    this.arenaExpirationTime = 60000;
    setInterval(() => {
      if (this.lastAttacker && this.lastAttacker.timestamp + this.arenaExpirationTime < Date.now()) {
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
    return user.id === this.gladiator1.id ? this.gladiator1 : user.id === this.gladiator2.id ? this.gladiator2 : null;
  }

  _attackGladiator(attackingUser, attack) {
    const attacker = this._getGladiator(attackingUser);
    const target = attacker === this.gladiator1 ? this.gladiator2 : this.gladiator1;
    if (attacker && target) {
      if (!this.lastAttacker || this.lastAttacker.user.id !== attacker.id) {
        this.lastAttacker = {
          user: attacker,
          timestamp: Date.now()
        };
        const roll = Math.random();
        if (roll < attack.chance) {
          target.damage(attack.damage);

          if (target.health <= 0) {
            this.inProgress = false;
            this.lastAttacker = null;
            this.gladiator1 = null;
            this.gladiator2 = null;
            return this.endArena(attacker, target);
          }
          return {
            message: 'HIT',
            gladiator: attacker,
            target
          }
        } else {
          return {
            message: 'MISS',
            gladiator: attacker,
            target
          }
        }
      } else {
        return {
          message: 'TURN'
        }
      }
    } else {
      return {
        message: 'NOT_GLADIATOR'
      }
    }
  }

  expireArena() {
    console.log('Arena Expire');
    colosseum.send(`I guess ${this.gladiator1.userObject} and ${this.gladiator2.userObject} fell asleep?... Arena expired`);
    this.inProgress = false;
    this.lastAttacker = null;
    this.gladiator1 = null;
    this.gladiator2 = null;
  }

  endArena(winner, loser) {
    querySql(`
      SELECT 
        Experience,
        Level 
      FROM Levels 
      WHERE UserID = ${winner.id}
    `)
      .then((results) => {
        const xp = results[ 0 ].Experience;
        const awardedXp = 20;
        let query;
        if (xp + awardedXp > 99) {
          query = `
            UPDATE \`GladiatorBot\`.\`Levels\` 
            SET \`Experience\` = 0,
              \`Level\` = Level + 1
            WHERE \`UserId\` = ${winner.id};
          `;
          colosseum.send(`${winner.userObject} is now level ${results[0].Level + 1}!`);
        } else {
          query = `
            UPDATE \`GladiatorBot\`.\`Levels\` 
            SET \`Experience\` = Experience + ${awardedXp} 
            WHERE \`UserId\` = ${winner.id};
           `;
          colosseum.send(`${winner.userObject} is only ${100 - (xp + 20)}xp from reaching level ${results[0].Level + 1}!`);
        }
        return querySql(query)
      })
      .then(() => {
        console.log(`Updated ${winner.id}`);
      })
      .then(() => {
        querySql(`
            UPDATE \`GladiatorBot\`.\`Levels\` 
            SET \`Wins\` = Wins + 1,
            WHERE \`UserId\` = ${winner.id};
          `)
      })
      .then(() => {
        querySql(`
            UPDATE \`GladiatorBot\`.\`Levels\` 
            SET \`Losses\` = Losses + 1,
            WHERE \`UserId\` = ${loser.id};
          `)
      })
      .catch(console.error);


    return {
      message: 'WIN',
      winner,
      loser
    }
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

  attackLions(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.lions);
  }
}

module.exports = new Arena();