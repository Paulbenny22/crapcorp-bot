const fs = require('fs');
const { FrontEnd } = require('.\\frontend.js');
const dataPath = '.\\data.json';
const frontend = new FrontEnd(dataPath);
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

/*
 * Client methods
 */
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	frontend.updateAll();

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!',
			ephemeral: true });
	}
});

/*
 * Client.on('message', msg => {
 *  if(!msg.author.bot) {
 *
 *      Fe.updateAll();
 *      let strmsg = msg.content.toLowerCase();
 *      if (strmsg.includes("stock value")) {
 *          Fe.displayOwnedStocks(msg);
 *          msg.channel.send("-------------------------------")
 *          Fe.displayMarketStocks(msg.channel);
 *      }
 *      if (strmsg.startsWith("buy ")) {
 *          let pStock = strmsg.replace("buy ", "");
 *          Fe.buyStocks(msg,pStock)
 *          msg.channel.send("this feature is W.I.P")
 *      }
 *      if(strmsg.includes("crash")) {
 *          imaginary+=hello
 *      }
 *  }
 * })
 */

client.login(token);