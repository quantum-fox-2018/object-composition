"use strict"

var fs = require('fs');
var options = fs.readFileSync('./cookies.txt').toString().split("\n");

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = [];
  }

  addIngredients(ingredients) {
    for(var i = 0; i < ingredients.length; i++) {
      var obj = new Ingredient(ingredients[i]);
      this.ingredients.push(obj);
      console.log(obj);
    }
  }

  bake() {
    this.status = "selesai dimasak";
  }
}

// var c = new Cookie();
// console.log(c.addIngredients(arrObjIng));
//
// console.log(arrObjIng);

class PeanutButter extends Cookie {
  constructor() {
    super("peanut butter");
    this._peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super("chocolate chip");
    this._peanut_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor() {
    super("chocolate cheese")
    this._other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    let arrObjIng = [];
    let cookie;
    let names;
    let obj;
    let ingredients;
    let arrCookies = [];
    for(var i = 0; i < options.length; i++) {
      cookie = options[i].split(" = ");
      names = cookie[0];
      obj = {};
      if(names[0] === "peanut butter") {
        obj = new PeanutButter({name: names});
      } else if(names[0] === "chocolate chip") {
        obj = new ChocolateChip({name: names});
      } else {
        obj = new OtherCookie({name: names});
      }
      ingredients = cookie[1];
      if(ingredients) {
        var arrIngredients = ingredients.split(", ");
        for(var j = 0; j < arrIngredients.length; j++) {
          var recipe = arrIngredients[j].split(" : ");
          obj.ingredients = {name: recipe[1], amount: ingredients[0]};
        }
      }
      arrCookies.push(obj);
    }
  return arrCookies;
}

class Ingredient {
  constructor(options) {
    this.name = options["name"];
    this.amount = options["amount"];
  }
}


// console.log(arrObjIng);




let batch_of_cookies = CookieFactory.create(baris);
console.log(batch_of_cookies);
