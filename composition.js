"use strict"

class Cookie {
  constructor(name) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = this.inputIngredients(name)
  }

  bake(){
    this.status = 'selesai dimasak'
  }

  inputIngredients(input){
    let arrayOfIngredients = []
    for(let i=0; i<options.length; i++){
      let cookie = options[i].split(',')
      let composition = cookie.slice(1)
      if(input==cookie[0]){
        let j=0
        while(j<composition.length){
          arrayOfIngredients.push(composition[j])
          j++
        }
      }
    }
    return arrayOfIngredients
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this.other_count = 150
  }
}


class CookieFactory {
  static create(input) {
    let arrayOfCookie = [];
    for(let i=0; i<input.length-1; i++){
      let name = input[i].split(',')
      if(name[0]=='peanut butter'){
        arrayOfCookie.push(new PeanutButter(name[0]))
      } else if(name[0]=='chocolate chip'){
        arrayOfCookie.push(new ChocolateChip(name[0]))
      } else {
        arrayOfCookie.push(new OtherCookie(name[0]))
      }
    }
    return arrayOfCookie
  }

  static cookiesName(input){
    let arrayOfCookiesName = []
    for(let i=0; i<input.length-1; i++){
      let cookie = input[i].split(',')
      arrayOfCookiesName.push(cookie[0])
    }
    return arrayOfCookiesName
  }

  static cookieRecommendation(input,comparrison){
    let arrayOfSugar = []
    for(let i=0; i<input.length; i++){
      let composition = input[i].ingredients
      let j=0
      while(j<composition.length){
        let insideComp = composition[j].split(' ')
        for(let k=0; k<insideComp.length; k++){
          if(insideComp[k]=='sugar'){
            arrayOfSugar.push(input[i].name)
          }
        }
        j++
      }
    }
    for(let m=0; m<arrayOfSugar.length; m++){
      comparrison = comparrison.filter(cookie => cookie !== arrayOfSugar[m]);
    }
    return comparrison
  }
}

const fs = require('fs')
var options = fs.readFileSync('cookies.txt','utf8').split('\n')
let batch_of_cookies = CookieFactory.create(options)
let noSugarFree = CookieFactory.cookiesName(options)
let sugarFreeFoods = CookieFactory.cookieRecommendation(batch_of_cookies,noSugarFree)
console.log(`sugar free cakes are: ${sugarFreeFoods}`)

// let array = [1,2,3,4,5]
// let long = array.filter(num=>num!==3)
// console.log(long);
