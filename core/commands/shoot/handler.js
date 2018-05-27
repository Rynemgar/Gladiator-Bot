const responses = require('./responses');
const randomElement = require('../../../utils/get-random-element');
const parseVariables = require('../../response-variables');

module.exports = message => {
  const mention = message.mentions.users.size > 0;
  let response = randomElement(responses[mention ? 'mention' : 'noMention']);
  response = parseVariables(response, message);

  message.channel.send(response);
};