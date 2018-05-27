const arena = require('./arena');

class Challenges {
  constructor() {
    this.challenges = [];
  }

  addChallenge(challenger, target) {
    this.challenges.push({challenger, target});
  }

  acceptChallenge(user) {
    let found;
    let idx;
    for (const challenge of this.challenges) {
      console.log('target', challenge.target);
      console.log('user', user);
      if (challenge.target.id === user.id) {
        found = challenge;
        idx = this.challenges.indexOf(challenge);
        break;
      }
    }
    console.log(found);
    if (found) {
      const fightStarted = arena.startFight(found.challenger, found.target);
      if (fightStarted) {
        this.challenges.splice(idx, 1);
        return {
          success: true,
          data: found
        }
      } else {
        return {
          success: false,
          message: 'IN_PROGRESS'
        }
      }
    } else {
      return {
        success: false,
        message: 'NO_CHALLENGE'
      }
    }
  }
}

module.exports = new Challenges();