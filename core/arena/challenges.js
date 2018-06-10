const arena = require('./arena');
const colosseum = require('../colosseum');

class Challenges {
  constructor() {
    this.challenges = [];
    this.challengeDuration = 60000; // change this

    setInterval(() => {
      for (let i = 0; i <= this.challenges.length; i++) {
        if (this.challenges[i] && this.challenges[i].timestamp + this.challengeDuration < Date.now()) {
          const challenge = this.challenges.splice(i,1)[0];
          console.log('cancelling challenge', challenge);
          colosseum.send(`${challenge.challenger}'s challenge of ${challenge.target} falls on deaf ears. Challenge Expired!`);
        }
      }
    }, 1000);
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
        };
      } else {
        return {
          success: false,
          message: 'IN_PROGRESS'
        };
      }
    } else {
      return {
        success: false,
        message: 'NO_CHALLENGE'
      };
    }
  }
}

module.exports = new Challenges();