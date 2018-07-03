const querySql = require('../../connection')



class Gladiator {
  constructor(user, baseStats) {
    this.id = user.id;
    this.userObject = user;
    this.health = baseStats.health;

    querySql(`SELECT
            Strength,
            Agility,
            Defense
          FROM Levels
          WHERE UserID = ${user.id}
        `)
        .then((results) => {
          const strength = results[0] ? results[ 0 ].Strength : 0;
          const agility = results[0] ? results[ 0 ].Agility : 0;
          const defense = results[0] ? results[ 0 ].Defense : 0;
        
        this.strength = strength;
        this.agility = agility;
        this.defense = defense;
        console.log(results)
      })
    
        .catch(console.error);
  }

  damage(amount) {
    this.health -= amount;
  }
}

module.exports = Gladiator;
