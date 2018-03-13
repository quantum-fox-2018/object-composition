"use stict"
const fs = require("fs");
var options = fs.readFileSync("./cookies.txt", "utf8");
// console.log(options);

class Cookie {
  constructor(ingredients){
    this.name = '';
    this.status = "Mentah";
    this.ingredients = ingredients;
  }

  bake(){
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients){
    super();
    this.name = name;
    this.peanut_count = 100;
    this.ingredients = ingredients;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients){
    super();
    this.name = name;
    this.choc_chip_count = 200;
    this.ingredients = ingredients;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients){
    super();
    this.name = name;
    this.other_count = 150;
    this.ingredients = ingredients;
  }
}

class CookieFactory {
  static create(options){
    let listOfCookie = [];
    // this.listOfCookie = [];
    let batch_of_cookies = this.convertToArray(options);
    // return batch_of_cookies;
    for(let i = 0; i < batch_of_cookies.length; i++){
        if(batch_of_cookies[i] != ''){
          let cookieAndIngredient = this.seperateNameAndIngredients(batch_of_cookies[i]);
          let separateTheIngredient = this.convertIngredientsToObject(cookieAndIngredient);
          let order_cookie = this.cookieType(separateTheIngredient[0], separateTheIngredient[1]);
          // console.log(order_cookie);
          listOfCookie.push(order_cookie);
          // this.listOfCookie.push(order_cookie);
        }

    }

    return listOfCookie;
  }

  static convertIngredientsToObject(cookieArr){
    let objCookieName = cookieArr[0];
    let ingredients = cookieArr[1].split(',');
    let tempArr = [];
    tempArr.push(objCookieName.trim());
    tempArr.push([]);

    for (let i = 0; i < ingredients.length; i++) {
      let splitIngredients = ingredients[i].split(':');
      let ingredientsCookie = new ingredient(splitIngredients)
      tempArr[1].push(ingredientsCookie);
    }
    return tempArr;
  }

  static seperateNameAndIngredients(cookieIngredien){
    return cookieIngredien.split('=');
  }

  static convertToArray(options){
    return options.split('\n');
  }

  static cookieType(name, ingredients){
    let order_cookie = '';

    if(name == 'peanut butter'){
        order_cookie = new PeanutButter(name, ingredients);
    }else if (name == 'chocolate chip') {
        order_cookie = new ChocolateChip(name, ingredients);
    }else{
        order_cookie = new OtherCookie(name, ingredients);
    }

    return order_cookie;
  }

  static cookieRecomendation(day, cookiesList){
    let recommendedCookie = [];
    for(let i = 0; i < cookiesList.length; i++){
        let isSugarFree = true;
        // console.log(cookiesList[i].ingredients);
        for(let j = 0; j < cookiesList[i].ingredients.length; j++){
            // console.log(cookiesList[i].ingredients[j].name);
            if(cookiesList[i].ingredients[j].name == 'sugar'){
                isSugarFree = false;
            }
        }
        if(isSugarFree == true){
            recommendedCookie.push(cookiesList[i]);
            // console.log(cookiesList[i]);
        }

    }
    return recommendedCookie;
  }
}

class ingredient{
  constructor(options){
    this.name = options[1].trim();
    this.amount = options[0].trim();
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
// console.log(CookieFactory.listOfCookie);

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :");
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}













//
