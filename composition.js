"use strict"
const fs = require('fs');

let options = fs.readFileSync('./cookies.txt','utf-8')


class Cookie {
    constructor(name, ingredient){
        this.name = name
        this.status = "mentah"
        this.ingredients = this.addIngredient(ingredient)
        this.has_sugar = this.checkSugar(ingredient)
    }

    addIngredient(list){
        let ingredientbeArray = list.split(',')
        let arr = [];
        for(let i=0; i<ingredientbeArray.length; i++){
            let pecah = ingredientbeArray[i].trim().split(':')
            // console.log(`(${pecah[0]}) === (${pecah[1]})`)
            if(pecah[1] == 'sugar'){
                this.has_sugar = 'haha';
            }
            let obj = {
                name: pecah[1],
                amount: pecah[0]
            };
            let ingredientValue = new Ingredient(obj)
            arr.push(ingredientValue)
        }
        console.log('===========')
        return arr;
    }

    checkSugar(list){
        console.log(list)
        // let ingredientbeArray = list.split(',')
        // for(let i=0; i<ingredientbeArray.length; i++){
        //     let pecah = ingredientbeArray[i].trim().split(':')
        //     console.log(`(--> ${pecah})`)
        //     // if(pecah[1] == 'sugar'){
        //     //     return 1;
        //     // }
        //     // return null;
        // }
    }

    bake(){
        this.status = "selesai dimasak"
    }

}

class PeanutButter extends Cookie {
    constructor(name,ingredient){
        super(name,ingredient)
        this.peanut_count = 100;
    }
}

class ChocolateChip extends Cookie {
    constructor(name,ingredient){
        super(name,ingredient)
        this.choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name,ingredient){
        super(name,ingredient)
        this.other_count = 150
    }
}

class Ingredient {
    constructor(objIngredient){
        this.name = objIngredient['name']
        this.amount = objIngredient['amount']
    }
}

class CookieFactory {
    static create(options){
        let cookiesTxt = options.split('\n');
        let createCookieArray = [];
        let cookies;
        let ingredient;
        for(let i=0; i<cookiesTxt.length; i++){
            let pecah = cookiesTxt[i].split('=')
            let nameCookie = pecah[0].trim();
            let ingredientData = pecah[1].trim();
            if(nameCookie == 'peanut butter'){
                cookies = new PeanutButter(nameCookie,ingredientData)
                createCookieArray.push(cookies)
            } else if(nameCookie == 'chocolate chip'){
                cookies = new ChocolateChip(nameCookie,ingredientData)
                createCookieArray.push(cookies)
            } else {
                cookies = new OtherCookie(nameCookie,ingredientData)
                createCookieArray.push(cookies)
            }
        }
        return createCookieArray;
    }
    static cookieRecomendation(day, dataCookie){
        
    }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies)

console.log('=================================')
// console.log(batch_of_cookies[0])
// console.log(batch_of_cookies[1])
// console.log(batch_of_cookies[2])
// console.log(batch_of_cookies[3])

// let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
// console.log('sugar free cakse are :')
// for(let i=0; i<sugarFreeFoods.length; i++){
//     console.log(sugarFreeFoods[i].name)
// }
// console.log(sugarFreeFoods)
