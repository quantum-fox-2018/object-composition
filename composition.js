"use strict"

const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8').trim().split('\n')

class Cookie {
    constructor(name) {
        this.name = name
        this.status = 'mentah'
        this.ingredients = []
    }

    bake() {
        this.status = 'selesai dimasak'
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
            let name = options[i]
            if(name == 'peanut butter'){
                listCookie.push(new PeanutButter(name))
            } else if(name == 'chocolate chip'){
                listCookie.push(new ChocolateChip(name))
            } else {
                listCookie.push(new OtherCookie(name))
            }
        }
        return listCookie
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

// let kue = new ChocolateChip()
// console.log(kue);
console.log(options);

