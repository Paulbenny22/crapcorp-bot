const fs = require("fs");

class FileManager {
	constructor(filePath) {
		this.path = filePath
		this.file = JSON.parse(fs.readFileSync(this.path));
		this.stocks = this.file.stocks;
		this.users = this.file.users;
	}

	update() {
		this.file = JSON.parse(fs.readFileSync(this.path));
		this.stocks = this.file.stocks;
		this.users = this.file.users;
	}
	save() {
		let toSave = { users: this.users, stocks: this.stocks}
		fs.writeFileSync(this.path, JSON.stringify(toSave, null, 2))
	}
	newStock(newStockName) {
		this.stocks.push({ name:newStockName, value:5 })
		this.save();
	}
	newUser(newUserID) {
		this.users.push( {id:newUserID, money:10, stocks:[]} )
		this.save();
	}
	findStockIndex(stockName) {
		let index = this.stocks.findIndex( stock => stock.name === stockName)
		if (index === -1) {
			return -1
		}
		return index
	}
	findUserIndex(userID) {
		let index = this.users.findIndex( user => user.id === userID) 
		if (index === -1) {
			this.newUser(userID)
			return this.findUserIndex(userID);
		}
		return index;
	}
	stockToUser(userID, stockName) {
		let stockIndex = this.findStockIndex(stockName);
		let userIndex = this.findUserIndex(userID)
		if (stockIndex === -1) return false
		let userStockIndex = this.users[userIndex].stocks.findIndex( stock => stock.name === stockName)
		if (userStockIndex === -1) {
			this.users[userIndex].stocks.push( {name:stockName, amount:0})
		}
		else {
			this.users[userIndex].stocks[userStockIndex]= {
				name:stockName,
				amount:1+this.users[userIndex].stocks[userStockIndex].amount,
			}
		}
		this.save();
		return true
	}
	updateStocks(stockValue) {
		this.stocks = this.stocks.map(oldstock => {
			return {
				value: stockValue(oldstock.value),
				name: oldstock.name,
			}
		})
		this.save
	}
}

module.exports = {FileManager}