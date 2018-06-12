const MessageController = require('../message-controller');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
class BalanceCommand extends MessageController {
  constructor() {
    super();
    this.global = true;
    this.cooldown = 20000;
    
  }
  
  handler(message) {
    message.delete(1000);
    if (this.lastUsed + this.cooldown > Date.now()) return;

    xhr.open('GET', "http://krruzic.xyz:5000/balance?pid=ca746b821dad1d8458ec0f78880929049cb7db39d1e5381b8392522871d661d7", true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);
    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var count = response.balance;
        message.channel.send(`My current prize fund balance is ${count}`);
        console.log(`Current Tipjar balance is ${response.balance}`);
    }
 
    }
    
    
    message.channel.send(`To contribute to my prize fund, tip me directly!`);
  this.lastUsed = Date.now();
}
  
}

module.exports = new BalanceCommand();