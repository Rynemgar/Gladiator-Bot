const querySql = require('../../connection')



class Gladiator {
  constructor(user, baseStats) {
    this.id = user.id;
    this.userObject = user;
    this.health = baseStats.health;

    querySql(`SELECT
            Strength,
            Agility,
            Defense,
            Level,
            Experience
          FROM Levels
          WHERE UserID = ${user.id}
        `)
        .then((results) => {
          const strength = results[0] ? results[ 0 ].Strength : 0;
          const agility = results[0] ? results[ 0 ].Agility : 0;
          const defense = results[0] ? results[ 0 ].Defense : 0;
          const level = results[0] ? results[ 0 ].Level : 0;
          const experience = results[0] ? results[ 0 ].Experience : 0;
        
        this.strength = strength;
        this.agility = agility;
        this.defense = defense;
        this.level = level;
        this.experience = experience;
        
        console.log(results)
      })
    
        .catch(console.error);
  }

  damage(amount) {
    this.health -= amount;
  }
}

module.exports = Gladiator;
