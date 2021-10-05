const { FileManager } = require('./filemanager.js')

class StockBroker {
	constructor(filePath) {
		this.filemanager = new FileManager(filePath)
	}
	generateValue(value) {
		if (value < 0) {
			return Math.round(Math.random() * 2000)
		}
		return Math.round(Math.random() * 1000 - 500);
	}
	stockToUser(userID, stockName) {
		const stockIndex = this.filemanager.findStockIndex(stockName);
		if (stockIndex==-1) return "Transaction Failed: Stock does not exist"
		const value = this.filemanager.stocks[stockIndex]
		let userIndex = this.fm.findUserIndex(userID)
		if (this.fm.users[userIndex].money < value) return "Transaction Failed: Insufficient funds";
		this.fm.users[userIndex].money-=value
		this.fm.stockToUser(userID, stockName);
		return "Transaction Successful"
	}

	getStocks() {
		return this.filemanager.stocks;
	}
}

module.exports={StockBroker}