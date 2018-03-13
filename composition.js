"use strict"
class Ingredients{
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
  }
}

class Cookie{
  constructor(name, ingredients){
    this.name = name
    this.status = "mentah";
    this.ingredients = ingredients;
    this.has_sugar = null;
  }

  bake(){
    this.status = "selesai dimasak"
  }

  hasSugar(){
    for (var i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name.toLowerCase() === "sugar") {
        return true;
      }
    }
    return false;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients){
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie{
  constructor(name, ingredients){
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class otherCookie extends Cookie {
  constructor(name, ingredients){
    super(name, ingredients)
    this.peanut_count = 150

  }
}

class CookieFactory{

  static create(options){
    let ListOfCookie = []
    let cookiesName = []
    let items = []
    // let ingredientList =[]
    let cookie;

    // memisahkan nama kue dengan ingredients
    for(let i=0; i<options.length; i++){
      let splitCookie = options[i].split('=')
      cookiesName.push(splitCookie[0])
      items.push(splitCookie[1])
    }

    //memisahkan ingredients
    for(let j=0; j<cookiesName.length-1; j++){
      // console.log(items[j].split(","));
      var ingredientList =[]
      let splitItems = items[j].split(",")

      //memisahkan nama bahan dan jumlahnya
      for(let k=0; k<splitItems.length; k++){
        let splitAmount = splitItems[k].split(": ")
        let objItems={}
        objItems.name = splitAmount[1]
        objItems.amount = splitAmount[0]
        let addIngredient = new Ingredients(objItems)
        ingredientList.push(addIngredient)
      }

      if(cookiesName[j] === 'peanut butter'){
        cookie = new PeanutButter(cookiesName[j], ingredientList)
      }else if(cookiesName[j] === 'chocolate chip'){
        cookie = new ChocholateChip(cookiesName[j], ingredientList)
      }else{
        cookie = new otherCookie(cookiesName[j], ingredientList)
      }

      ListOfCookie.push(cookie)
    }


    return ListOfCookie
  }

}



//Mendapatkan list kue dari cookies.txt dengan nodeJs file system synchronous
const fs = require('fs')
var options = fs.readFileSync('cookies.txt', 'utf8').split("\n")
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are ");
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}
