'use strict'
const fs = require('fs')
const options = fs.readFileSync('cookies.txt','utf8')
.toString()
.trim()
.split('\n')
let cookieSet=[]
let ingredientSet=[]
for (let i = 0; i < options.length; i++) {
  let tempCookie=options[i].split('=')
  cookieSet.push(tempCookie[0].trim())
  ingredientSet.push(tempCookie[1].trim())
}
// console.log(ingredientSet);
class Cookie{
  constructor(name,ingredients){
    this.name=name
    this.status='mentah'
    this.ingredients=ingredients
  }

  bake(){
    this.status='selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name,ingredients){
    super(name)
    this.peanut_count =  100
    this.ingredients=ingredients
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingredients){
    super(name)
    this.choc_chip_count = 200
    this.ingredients=ingredients
  }
}

class PeanutButterCrumbled extends Cookie {
  constructor(name,ingredients){
    super(name)
    this.peanut_count =  100
    this.ingredients=ingredients
  }
}

class ChocolateChipCrumbled extends Cookie {
  constructor(name,ingredients){
    super(name)
    this.choc_chip_count = 200
    this.ingredients=ingredients
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingredients){
    super(name)
    this.other_count = 150
    this.ingredients=ingredients
  }
}

class CookieFactory{
  static create(options){
    let arrCookie=[]
    let arrIng=[]
    for (let i = 0; i < cookieSet.length; i++) {
      let tempIng=ingredientSet[i].toString().trim().split(',');
      for (let j = 0; j < tempIng.length; j++) {
        let splitIng=tempIng[j].toString().trim().split(':');
        let objIng={
          name: splitIng[1].toString().trim(),
          amount: splitIng[0].toString().trim()
        }
        arrIng.push(new Ingredient(objIng))
      }

      if(options[i]==='peanut butter'){
        let peanutButter = new PeanutButter(cookieSet[i],arrIng)
        peanutButter.bake()
        arrCookie.push(peanutButter)
      }
      else if(options[i]==='chocolate chip'){
        arrCookie.push(new ChocolateChip(cookieSet[i],arrIng))
      }
      else if(options[i]==='chocolate chip crumbled'){
        arrCookie.push(new ChocolateChipCrumbled(cookieSet[i],arrIng))
      }
      else if(options[i]==='peanut butter crumbled'){
        arrCookie.push(new PeanutButterCrumbled(cookieSet[i],arrIng))
      }
      else{
        arrCookie.push(new OtherCookie(cookieSet[i],arrIng))
      }
      arrIng=[]
    }
    return arrCookie
  }

  static cookieRecommendation(day,listCookie){
    let arrFree=[]
    let countSugar=0
    for (let i = 0; i < listCookie.length; i++) {
      for (let j = 0; j < listCookie[i].ingredients.length; j++) {
        if(listCookie[i].ingredients[j].name==='sugar'){
          countSugar++
        }
      }

      if(countSugar===0){
        arrFree.push(listCookie[i])
      }
      countSugar=0
    }
    return arrFree
  }

}

class Ingredient{
  constructor(options){
    this.name=options['name']
    this.amount=options['amount']
  }
}

let batch_of_cookies = CookieFactory.create(cookieSet)
console.log(batch_of_cookies);
console.log('\n');

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)
console.log("sugar free cakes are :");
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
console.log('\n');
