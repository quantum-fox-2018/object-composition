"use strict"
const fs = require('fs');
var objectFile = fs.readFileSync('cookies.txt','utf8');
var optionsArray = objectFile.split(`\n`);
var optionsCake = []
for(let i=0;i<optionsArray.length-1;i++){
  let result = "";
  for(let j=0;j<optionsArray[i].length;j++){

    if(optionsArray[i][j+1] === "="){
      optionsCake.push(result);
      break;
    }
    result = result + optionsArray[i][j];
  }
}

var objectIngredients = {}
var objectBahan = [];
for(let i=0;i<optionsArray.length-1;i++){
  for(let j=0;j<optionsArray[i].length;j++){
    if(optionsArray[i][j] == "="){
      objectBahan.push(optionsArray[i].slice(j+2));
      break
    }
  }
}

//str.split(/,|:/)
let options =[]
for(let i=0;i<objectBahan.length;i++){
  options.push(objectBahan[i].split(/,|:/));
}

class Cookie{
  constructor(name){
    this.name = name;
    this.status = "mentah"
    this.ingredients = [];
  }
  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(name){
    super(name);
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie{
  constructor(name){
    super(name);
    this.name = name
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name){
    super(name);
    this.name = name
    this.peanut_count = 150;
  }
}

class Ingredients{
  constructor(options){
    this.name = options[1];
    this.amount = options[0];
  }
}

class CookieFactory{
  static create(options){
    let listCookies = [];
    let cookies;

    for(let i=0;i<optionsCake.length;i++){
      if(optionsCake[i] == 'peanut butter'){
        cookies = new PeanutButter(optionsCake[i]);
      }
      else if(optionsCake[i] == 'chocolate chip'){
        cookies = new ChocolateChip(optionsCake[i]);
      }
      else{
        cookies = new OtherCookie(optionsCake[i])
      }

      let optionsLength = options[i].length/2;
      let ingredientsArr = []
      for(let j=0;j<optionsLength;j++){
        var ingredients = new Ingredients(options[i]);
        cookies.ingredients.push(ingredients);
        options[i].splice(0,2)
      }
      listCookies.push(cookies)
    }

    return listCookies;
  }
  static cookieRecommendation(day,listCookies){
    this.listCookies = listCookies;
    this.day = day;
    this.freeSugarCookies = [];

    if(day == "tuesday"){
      for(let i=0;i<this.listCookies.length;i++){
        let cookiesSugar = false;
        for(let j=0;j<this.listCookies[i].ingredients.length;j++){
          if(this.listCookies[i].ingredients[j].name == "sugar"){
            cookiesSugar = true;
          }
        }
        if(cookiesSugar == false){

          this.freeSugarCookies.push(this.listCookies[i].name);
        }
      }
      return this.freeSugarCookies;
    }

  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies[0].ingredients);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday",batch_of_cookies);
console.log(sugarFreeFoods);
console.log("sugar free cakes are : ");
for(let i=0;i<sugarFreeFoods.length;i++){
  console.log(sugarFreeFoods[i]);
}
