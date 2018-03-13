"use strict"

const fs = require('fs')

class Ingredient {
  constructor(name, amount) {
    this.name = name
    this.amount = amount
  }
}

let list = fs.readFileSync('./cookies.txt', 'utf8').split('\n')

let options = []
for(let i=0; i<list.length; i++) {
  let obj = {}
  obj.name = list[i].split(' = ')[0]
  obj.ingredients = []

  let temp = list[i].split(' = ')[1].split(', ')
  for(let j=0; j<temp.length; j++) {
    
    let recipe = {}
    recipe.name = temp[j].split(' : ')[1]
    recipe.amount = temp[j].split(' : ')[0]
    obj.ingredients.push(recipe)
  }

  options.push(obj)
}

class Cookie {
  constructor(obj) {
    this.name = obj.name
    this.status = "mentah"
    this.ingredients = this.listIngredient(obj.ingredients)
    this.has_sugar = this.checkSugar(obj.ingredients)
  }

  bake() {
    this.status = "selesai dimasak"
  }

  listIngredient(arr) {
    let list = []
    for(let i=0; i<arr.length; i++) {
      list.push(new Ingredient(arr[i].name, arr[i].amount))
    }

    return list
  }

  checkSugar(arr) {
    for(let i=0; i<arr.length; i++) {
      if(arr[i].name == 'sugar') {
        return true
      }
    }
    return false
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
  static create(options) {
    let list = []
    for(let i=0; i<options.length; i++) {
      if(options[i].name == 'peanut butter') {
        list.push(new PeanutButter(options[i]))
      } else if(options[i].name == 'chocolate chip') {
        list.push(new ChocolateChip(options[i]))
      } else {
        list.push(new OtherCookie(options[i]))
      }
    }
    return list
  }

  static cookieRecomendation(day, listCookies) {
    let arr = []
    if(day == 'Tuesday') {
      for(let i=0; i<listCookies.length; i++) {
        if(listCookies[i].has_sugar == false) {
          arr.push(listCookies[i])
        }
      }
    }
    return arr
  }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation('Tuesday', batch_of_cookies);
console.log(sugarFreeFoods)
console.log('sugar free cakes are :')
for(let i=0; i<sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}