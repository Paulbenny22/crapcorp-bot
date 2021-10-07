const { StockBroker } = require('./stockbroker.js');

class FrontEnd {
	constructor(filePath) {
		this.stockbroker = new StockBroker(filePath);
	}
	displayOwnedStocks(interaction) {
		const stocks = this.stockbroker.getUserStocks(interaction.user.id);
		let out = '';
		for (let i = 0;i < stocks.length;i++) {
			const stock = stocks[i];
			out += `you have ${stock.amount} of ${stock.name}\n`;
		}
		return out;
	}
	displayMarketStocks() {
		const stocks = this.stockbroker.getStocks();
		let out = '';
		for (let i = 0;i < stocks.length;i++) {
			const stock = stocks[i];
			out += `:money_with_wings: The current value of ${stock.name} is **${stock.value / 100}**\n`;
		}
		return out;
	}
	buyStocks(interaction, desiredStock) {
		return this.stockbroker.stockToUser(interaction.user.id, desiredStock);
	}
	updateAll() {
		this.filemanager.update();
		this.filemanager.updateStocks(this.stockbroker.generateValue);
	}
}

module.exports = { FrontEnd };