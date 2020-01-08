module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  // eslint-disable-next-line newline-per-chained-call
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/gu);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));
  if (!cmd) return;
  if (!client.commands.has(command)) console.log(`Command ${client.commands.findKey(c => c.aliases && c.aliases.includes(command))} run with alias ${command}.`)
  else console.log(`Command ${command} run without alias.`)
  // debugging purposes
  cmd.run(client, message, args);
};