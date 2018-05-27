const fs = require('fs');
const path = require('path');
const variables = [];

const files = fs.readdirSync(path.join(__dirname, './variables'));
for (const file of files) {
  if (!file.includes('.')) continue;
  variables.push(require(`./variables/${file}`));
}
module.exports = (response, message) => {
  for (const variable of variables) {
    response = variable(response, message);
  }
  return response;
};