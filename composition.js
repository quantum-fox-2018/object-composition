"use strict"

class Cookie {
    constructor(name) {
        this.name = name;
        this.status = 'mentah';
        this.ingridients = [];
    }

    bake() {
        this.status = 'selesai masak';
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name);
        this.peanut_count = 100;
    }
}

class ChocholateChip extends Cookie {
    constructor(name) {
        super(name);
        this.choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name);
        this.other_count = 150;
    }
}

class Ingridient {
    constructor(options) {
        this.name = options['name'];
        this.amount = options['amount'];
    }
}

class CookieFactory {
    static create(options) {
        let cookies = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i] === 'peanut butter') {
                let peanut = new PeanutButter(options[i]);
                cookies.push(peanut);
            } else if (options[i] === 'chocolate chip') {
                let choco = new ChocholateChip(options[i]);
                cookies.push(choco);
            } else {
                let other = new OtherCookie(options[i]);
                cookies.push(other);
            }
        }

        return cookies;
    }
}

let fs = require('fs');
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n');

let batch__of_cookies = CookieFactory.create(options);
console.log(batch__of_cookies);