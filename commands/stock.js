const { SlashCommandBuilder } = require('@discordjs/builders');
const { FrontEnd } = require('../frontend.js');

const frontend = new FrontEnd('./data.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stock')
		.setDescription('Views the value of the stocks'),
	async execute(interaction) {
		console.log(!!frontend);
		await interaction.reply(
			frontend.displayOwnedStocks(interaction)+
			'---------------------------------------\n'+
			frontend.displayMarketStocks());
	},
};