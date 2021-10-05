const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crash')
		.setDescription('Util command that crashes the client'),
	async execute(interaction) {
		imaginary+hello;
	},
};