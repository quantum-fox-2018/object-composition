"use strict"

class Cookie{
  constructor(ingridients, name){
    this.name = name
    this.status = "mentah"
    this.ingridients = ingridients
    this.hasSugar = this.hasSugar()
  }

  bake(){
    this.status = "selesai dimasak"
  }

  hasSugar(){
    for (var i = 0; i < this.ingridients.length; i++) {
      if (this.ingridients[i].name.trim().toLowerCase() === "sugar") {
        return true;
      }
    }
    return false;
  }
}

class PeanutButter extends Cookie{
  constructor(ingridients, name){
    super(ingridients, name)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(ingridients, name){
    super(ingridients, name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(ingridients, name){
    super(ingridients, name)
    this.other_count = 150
  }
}

class Ingridients{
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
  }
}

class CookieFactory{
  static create(options){
    let cookies = []
    let cookiesList = []
    let bahanList = []
    for (var i = 0; i < options.length; i++) {
      var tmp = options[i].split("=")
      if (tmp[0]) {
        cookiesList.push(tmp[0])
        bahanList.push(tmp[1])
      }
    }

    for (var i = 0; i < cookiesList.length; i++) {
      var ingridientsArr = []
      var splittedBahanList = bahanList[i].split(",")

      for (var j = 0; j < splittedBahanList.length; j++) {
        var elementIngridients = splittedBahanList[j].split(":")
        var tmpObj = {}
        tmpObj.name = elementIngridients[1]
        tmpObj.amount = elementIngridients[0]
        var newIngridients = new Ingridients(tmpObj)
        ingridientsArr.push(newIngridients)
      }

      var newCookie;
      if (cookiesList[i].trim() === "peanut butter") {
        newCookie = new PeanutButter(ingridientsArr, cookiesList[i].trim())
      }else if(cookiesList[i].trim() === "chocolate chip"){
        newCookie = new ChocolateChip(ingridientsArr, cookiesList[i].trim())
      }else{
        newCookie = new OtherCookie(ingridientsArr, cookiesList[i].trim())
      }
      cookies.push(newCookie)
    }
    return cookies;
  }

  static cookieRecommendation(hari, batch_of_cookies){
    let sugarFreeFoods = []
    if (hari === "tuesday") {
      for (var i = 0; i < batch_of_cookies.length; i++) {
        if (batch_of_cookies[i].hasSugar === false) {
          sugarFreeFoods.push(batch_of_cookies[i])
        }
      }
    }
    return sugarFreeFoods
  }
}



var fs = require("fs");
var str = fs.readFileSync("cookies.txt", 'utf8');
var options = str.split("\n")


let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are ");
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}
