module.exports = (response, message) => {
  if (!message) throw new Error(`Must provide original discord message object to variable parser`);
  return response.replace(/%author%/gi, message.author());
};