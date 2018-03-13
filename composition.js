"use strict"

var fs = require('fs');

//olah data ingredients.txt
let data      = fs.readFileSync('ingredients.txt','utf8');
let dataArray = data.split('\n')
// console.log(dataArray);
//looping nama cookie
var optionsCakeName = []
for(var i = 0; i < dataArray.length-1; i++){
  let result = '';
  for(var j = 0; j < dataArray[i].length; j++){
    if(dataArray[i][j+1] === '='){
      optionsCakeName.push(result);
    }
    result = result + dataArray[i][j];
  }
}
//console.log(optionsCakeName);
//looping ingredients
var arrIngredients    = [];
for(var i = 0; i < dataArray.length-1; i++){
  for(var j = 0; j < dataArray[i].length; j++){
    if(dataArray[i][j] == "="){
      arrIngredients.push(dataArray[i].slice(j+2));
      break
    }
  }
}
//console.log(arrIngredients);

var options =[]
for(var i = 0; i < arrIngredients.length; i++){
  options.push(arrIngredients[i].split(/,|:/));
}
//console.log(options);

class Ingredients {
  constructor(options) {
    this.name   = options[1];
    this.amount = options[0];
  }
}

class Cookie {
  constructor(cookie_name) {
    this.name         = cookie_name;
    this.status       = 'mentah';
    this.ingredients  = [];
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(cookie_name){
    super(cookie_name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(cookie_name){
    super(cookie_name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(cookie_name){
    super(cookie_name);
    this.other_cookie_count = 150;
  }
}


class CookieFactory {
  static create(options){
    //this.options      = optionsCakeName;
    let cookie_list  = [];
    let cookies;

    for(var i = 0; i < optionsCakeName.length; i++){
      if(optionsCakeName[i] === 'peanut butter'){
        cookies = new PeanutButter(optionsCakeName[i]);

      } else if (optionsCakeName[i] === 'chocolate chip'){
        cookies = new ChocolateChip(optionsCakeName[i]);

      } else {
        cookies = new OtherCookie(optionsCakeName[i]);

      }

      let optionsLength = options[i].length/2;
      let ingredientsArr = []
      for(var j = 0; j < optionsLength; j++){
        let ingredients = new Ingredients(options[i]);
        cookies.ingredients.push(ingredients);
        options[i].splice(0,2)
      }
      cookie_list.push(cookies);
    }
    return cookie_list;
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
