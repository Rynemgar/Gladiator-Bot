require('dotenv').config();
const client = require('./core/client');
const config = require("./config.json");
const fs = require("fs");
const messageHandler = require('./core/message-handler');

client.on('message', messageHandler);


client.login(process.env.NODE_ENV === 'beta' ? process.env.DISCORD_BETA_TOKEN : process.env.DISCORD_TOKEN);