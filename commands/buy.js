const { SlashCommandBuilder } = require('@discordjs/builders');
const { FrontEnd } = require('../frontend.js');

const frontend = new FrontEnd('./data.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Buys a specific stock')
		.addStringOption(option => option
			.setName('desiredstock')
			.setDescription('Stock to be bought by user if transaction is succesful.')),

	async execute(interaction) {
		const desiredStock = interaction.options.getString('desiredstock');
		frontend.buyStocks(interaction, desiredStock);
		await interaction.reply('Not implemented yet');
	},
};

