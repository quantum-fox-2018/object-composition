'use strict';
const fs = require('fs');
let option = fs.readFileSync('./cookies.txt', 'utf8');

class Ingredients {
	constructor(option) {
		this.name = option[1].trim();
		this.amount = option[0].trim();
	}
}

class Cookie {
	constructor(name, status, ingredients) {
		this.name = name;
		this.status = status;
		this.ingredients = ingredients;
		this.has_sugar = true;
	}

	bake() {
		this.status = 'selesai di masak';
	}
}

class PeanutButter extends Cookie {
	constructor(name, status, ingredients) {
		super(name, status, ingredients);
		this.peanut_count = 100;
	}
}

class ChocholateChip extends Cookie {
	constructor(name, status, ingredients) {
		super(name, status, ingredients);
		this.choc_chip_count = 200;
	}
}

class Other extends Cookie {
	constructor(name, status, ingredients) {
		super(name, status, ingredients);
		this.other_count = 150;
	}
}

class CookieFactory {
	static create(option) {
		let optionArr = option.split('\r\n');
		var optionSplited = [];
		let result = [];
		for (let i = 0; i < optionArr.length - 1; i++) {
			let splited1 = optionArr[i].split('\r\n');
			let splited2 = splited1[0].split('=');
			optionSplited.push(splited2);
		}
		for (let i = 0; i < optionSplited.length; i++) {
			let ingredients = optionSplited[i][1].split(',');
			let ingredientsArr = [];
			for (let j = 0; j < ingredients.length; j++) {
				let bahan = ingredients[j].split(':');
				let obj = new Ingredients(bahan);
				ingredientsArr.push(obj);
			}
			//  console.log(ingredientsArr)
			if (optionSplited[i][0].trim() == 'peanut butter') {
				let peanutButter = new PeanutButter(optionSplited[i][0],'Matang',ingredientsArr);
				result.push(peanutButter);
			} else if (optionSplited[i][0].trim() == 'chocolate chip') {
				let chocholateChip = new ChocholateChip(optionSplited[i][0],'Matang',ingredientsArr);
				result.push(chocholateChip);
			} else {
				let other = new Other(optionSplited[i][0], 'Matang', ingredientsArr);
				result.push(other);
			}
		}

		return result;
	}
	static cookieDailyMenu(day, batch_of_cookies) {
		var noSugar = [];
		var countSugar = 0;
		if (day === 'Tuesday') {
			for (let i = 0; i < batch_of_cookies.length; i++) {
				var countSugar = 0;
				for (let j = 0; j < batch_of_cookies[i].ingredients.length; j++) {
					//  console.log(i,batch_of_cookies[i].ingredients[j].name)
					if (batch_of_cookies[i].ingredients[j].name === 'sugar') {
						countSugar++;
					}
				}
				if (countSugar === 0) {
					noSugar.push(batch_of_cookies[i].name);
				}
			}
			return noSugar;
		}
		return 'all you can eat';
	}
}

let batch_of_cookies = CookieFactory.create(option);
let today = 'Tuesday';
let daily_menu = CookieFactory.cookieDailyMenu(today, batch_of_cookies);
console.log(batch_of_cookies);
console.log(`${today} menu is ${daily_menu}`);
