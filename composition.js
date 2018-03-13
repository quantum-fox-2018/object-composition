'use strict'

class Ingredient {
  constructor(options) {
    this.name = options['name'];
    this.amount = options['amount'];
  }
}

class Cookie {
  constructor(name, ingredient) {
    this.name = name;
    this.status = 'mentah';
    this.ingredient = ingredient;
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  glutenFree() {
    for (let i in this.ingredient) {
      if (this.ingredient[i].name == 'sugar') {
        return false;
      }
    }
    return true;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name, ingredient) {
    super(name, ingredient);
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    // accepts a list of cookie types and returns those cookies
    // creates those cookie by sending an array of Ingredient to Cookie.new
    let listCreated = [];
    let cookies = [];
    let ingredientStr = [];

    for (let i = 0; i < options.length-1; i++) {
      let split = options[i].split(' = ');
      cookies.push(split[0]);
      ingredientStr.push(split[1]);
    }
    //for splitting cookies and ingredient
    for (let i = 0; i < ingredientStr.length; i++) {
      let splitComma = ingredientStr[i].split(', ')
      let arrIngredient = [];
      //parsing the ingredient
      for (let j = 0; j < splitComma.length; j++) {
        let splitEqual = splitComma[j].split(' : ');
        let objIngredient = {
                    name: splitEqual[1],
                    amount: splitEqual[0]
                  };
        let ingredient = new Ingredient(objIngredient);
        arrIngredient.push(ingredient);
      }
      //make some cookie
      if (cookies[i] === 'peanut butter') {
        let cookie = new PeanutButter(cookies[i], arrIngredient);
        listCreated.push(cookie);
      } else if (cookies[i] === 'chocolate chip') {
        let cookie = new ChocolateChip(cookies[i], arrIngredient);
        listCreated.push(cookie);
      } else {
        let cookie = new OtherCookie(cookies[i], arrIngredient);
        listCreated.push(cookie);
      }
    }
    return listCreated;
  }

  static cookieRecommendation(day, batch_of_cookies) {
    let cookieRecommendation = [];
    let isGlutenFree = false;

    if (day == 'tuesday') {
      for (let i in batch_of_cookies) {
        isGlutenFree = batch_of_cookies[i].glutenFree();
        if (isGlutenFree) {
          cookieRecommendation.push(batch_of_cookies[i]);
        }
      }
    }

    return cookieRecommendation;
  }
}

let fs = require('fs');
let options = fs.readFileSync('./cookies.txt').toString().split('\n');

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('\nSugar free cakes are: ');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
