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