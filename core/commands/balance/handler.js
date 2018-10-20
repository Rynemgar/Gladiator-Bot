const MessageController = require('../message-controller')
const request = require('request-promise-native')

class BalanceCommand extends MessageController {
  constructor () {
    super()
    this.global = true
    this.cooldown = 20000
  }

  handler (message) {
    if (message.guild) message.delete(1000)
    if (this.lastUsed + this.cooldown > Date.now()) return
    this.lastUsed = Date.now()

    request({
      uri: 'http:/trtlbot.krruzic.xyz/balance?pid=ca746b821dad1d8458ec0f78880929049cb7db39d1e5381b8392522871d661d7',
      method: 'GET',
      json: true
    }).then((response) => {
      var count = response.balance
      message.channel.send(`To contribute to my prize fund, tip me directly!`)
      message.channel.send(`My current prize fund balance is ${count}`)
      console.log(`Current Tipjar balance is ${count}`)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = new BalanceCommand()