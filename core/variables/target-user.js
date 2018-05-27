module.exports = (response, message) => {
  if (!message) throw new Error(`Must provide original discord message object to variable parser`);

  if (message.mentions.users.size > 0) {
    return response.replace(/%targetUser%/gi, message.mentions.users.first());
  } else {
    return response.replace(/%targetUser%/gi, 'nobody');
  }
};