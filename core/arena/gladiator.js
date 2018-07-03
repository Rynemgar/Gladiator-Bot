const querySql = require('../../connection')

querySql(`SELECT
            Strength,
            Agility,
            Defense
          FROM Levels
          WHERE UserID = ${this.userObject}
        `)
        .then((results) => {
          const strength = results[0] ? results[ 0 ].Strength : 0;
          const agility = results[0] ? results[ 0 ].Agility : 0;
          const defense = results[0] ? results[ 0 ].Defense : 0;
        })
        .catch(console.error);

class Gladiator {
  constructor(user, baseStats) {
    this.id = user.id;
    this.userObject = user;
    this.health = baseStats.health;
  }

  damage(amount) {
    this.health -= amount;
  }
}

module.exports = Gladiator;
