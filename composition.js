"use strict"
const fs = require('fs')




// class Ingredient {
//   constructor(name, amount) {
//     this.name = name
//     this.amount = amount
//   }
// }


class Ingredients {

    constructor(option) {

        this.name = option[1].trim()
        this.amount = option[0].trim()
    }
}

let list = fs.readFileSync('./cookies.txt', 'utf8').split('\n')




// let list2 = list[0].split(' = ')

let options = []
for(let i=0; i<list.length-1; i++) {
  var splitted = list[i].split(' = ')
  let obj = {}
  obj.name = splitted[0]
  obj.ingridients = []

  let temp = splitted[1].split(', ')
  // console.log(temp);
  for(let j=0; j<temp.length; j++) {
    let bahanDanJumlah = temp[j].split(' : ')
    let recipe = {}
    recipe.name = bahanDanJumlah[1]
    recipe.amount = bahanDanJumlah[0]
    obj.ingridients.push(recipe)
  }

  options.push(obj)
  // console.log(options[i].ingridients);
}

// const fs = require('fs');
// var options = fs.readFileSync('cookies.txt').toString().split('\n')
// console.log(options);

class Cookie {
  constructor(options) {
    this.name = ''
    this.status = 'mentah'
    this.ingridients = this.bahanDanJumlah(options)

  }

  bahanDanJumlah(options) {
    // console.log(options[0]);
    // for(let i = 0; i < options.length; i++) {
    //   let obj = new Ingredient(options[i].ingridients);
    //   this.ingridients.push(obj);
    //   // console.log(obj);
    // }
    let arrIngrid = []
    for(let i=0; i<arrIngrid.length; i++) {
      arrIngrid.push(new Ingredient(options[i].ingridients[i].name, options[i].ingridients[i].amount))
    }

    return arrIngrid
    // console.log(options[0].ingridients[0].name);
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super()
      this.name = name
      this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super()
      this.name = name
      this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super()
      this.name = name
      this.other_count = 150
  }
}

class CookieFactory {
  constructor() {

  }
  static create(options) {
    var arrCookies = []
    for (var i = 0; i < options.length; i++) {
      if (options[i].name == 'peanut butter') {
        arrCookies.push(new PeanutButter(options[i].name))
      } else if (options[i].name == 'chocolate chip') {
        arrCookies.push(new ChocolateChip(options[i].name))
      } else {
        arrCookies.push(new OtherCookie(options[i].name))
      }
    }
    return arrCookies
  }


}

let batch_of_cookies = CookieFactory.create(options)
let cookie = new Cookie(options)
// cookie.bahanDanJumlah(options)
// console.log(cookie.ingridients);
console.log(batch_of_cookies);
