const arena = require('./arena');

class Challenges {
  constructor() {
    this.challenges = [];
    this.challengeDuration = 60000; // change this

    setInterval(() => {
      for (let i = 0; i <= this.challenges.length; i++) {
        if (this.challenges[i] && this.challenges[i].timestamp + this.challengeDuration > Date.now()) {
          this.challenges.splice(i, 1);
        }
      }
    }, 60000);
  }

  addChallenge(challenger, target) {
    this.challenges.push({challenger, target, timestamp: Date.now()});
  }

  acceptChallenge(user) {
    let found;
    let idx;
    for (const challenge of this.challenges) {
      if (challenge.target.id === user.id) {
        found = challenge;
        idx = this.challenges.indexOf(challenge);
        break;
      }
    }
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