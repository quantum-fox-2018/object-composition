"use strict"

const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8').trim().split('\n')


class Ingredient {
    constructor(options) {
        this.name = options['comp_name']
        this.amount = options['amount']
        this.has_sugar = options['sugar']
    }
}

class Cookie {
    constructor(options) {
        this.name = options[0]
        this.status = 'mentah'
        this.ingredients = this.listIngredient(options)
    }

    bake() {
        this.status = 'selesai dimasak'
    }

    listIngredient(options) {
        let splitOpt = options[1].toString().split(',')
        let listIngred = []

        for(let i=0; i<splitOpt.length; i++){
            let composition = splitOpt[i].toString().split(':')
            let sugar = false

            if(composition[1].trim() == 'sugar'){
                sugar = true
            }
            let objComp = {
                comp_name: composition[1].trim(),
                amount: composition[0].trim(),
                sugar: sugar
            }

            listIngred.push(new Ingredient(objComp))
        }
        return listIngred
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
    constructor() {
        
    }

    static create(options) {
        let listCookie = []
        for(let i=0; i< options.length; i++){
            let name = options[i].toString().split(' = ')
            if(name[0] == 'peanut butter'){
                listCookie.push(new PeanutButter(name))
            } else if(name[0] == 'chocolate chip'){
                listCookie.push(new ChocolateChip(name))
            } else {
                listCookie.push(new OtherCookie(name))
            }
        }
        return listCookie
    }

    static cookieRecomendation(day, listCookie) {
        let cookieRecomend = []

        for(let i=0){

        }
    }

}





let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

// let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
// console.log('sugar free cakes are :');
// for(let i=0; i<sugarFreeFoods.length; i++){
//     console.log(sugarFreeFoods[i].name);
    
// }

// let kue = new Cookie(options)
// console.log(kue);
// console.log(options);

