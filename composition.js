const fs = require('fs');

class Cookie {
    constructor(name,ingredientsBook) {
        this._name = name;
        this._status = 'mentah';
        this._ingredients = this.ingredientsList();
        this._has_sugar = this.checkSugar();
    }

    bake () {
        this._status = 'selesai dimasak';
    }

    ingredientsList () {
        for (let i = 0; i < ingredientsBook.length; i++) {
            if (ingredientsBook[i].name == this._name) {
                return ingredientsBook[i].list;
            } 
        }
    }

    checkSugar () {
        let status = false;
        for (let i = 0; i < this._ingredients.length; i++) {
            if (this._ingredients[i] == 'sugar') {
                status = true;
            }
        }
        return status;
    }


}

class PeanutButter extends Cookie {
    constructor (name,ingredientsBook) {
        super(name,ingredientsBook)
        this._peanut_count = 100;
    }
}


class ChocolateChip extends Cookie {
    constructor (name,ingredientsBook) {
        super(name,ingredientsBook)
        this._choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor (name,ingredientsBook) {
        super (name,ingredientsBook)
        this._other_count = 150;
    }
}


class CookieFactory {
    static create(options,ingredientsBook) {
        let cookie_cabinet = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i] == 'peanut butter') {
                cookie_cabinet.push(new PeanutButter(options[i],ingredientsBook));
            } else if (options[i] == 'chocolate chip') {
                cookie_cabinet.push(new ChocolateChip(options[i],ingredientsBook));
            } else {
                cookie_cabinet.push(new OtherCookie(options[i],ingredientsBook));
            }
        }
        return cookie_cabinet;
    }

    static cookieRecommendation (days,arrayOfCookies) {
        let arrResult = [];
        if (days == 'tuesday') {
            for (let i = 0; i < arrayOfCookies.length; i++) {
                if (arrayOfCookies[i]._has_sugar == false) {
                    arrResult.push(arrayOfCookies[i]);
                }
            }
        }
        return arrResult;
    }

}

let options = fs.readFileSync('./cookies.txt','utf8').split('\r\n');

let ingredients = fs.readFileSync('./ingredients.txt','utf8').trim().split('\r\n');

let ingredientsBook = [];
for (let i = 0; i < ingredients.length; i++) {
    
    let innerList = '';
    let innerPage = ingredients[i].split(' = ')[1].split(', ')
    for (let j = 0; j < innerPage.length; j++) {
        innerList = innerPage[j].split(' : ') + ',' + innerList
    }

    let showlist = innerList.slice(0,innerList.length-1);
    let innerBook = {
        name: ingredients[i].split(' = ')[0],
        list: showlist.split(',')
    }
    ingredientsBook.push(innerBook);
}


let batch_of_cookies = CookieFactory.create(options,ingredientsBook);

let sugarFreeCookies = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('sugar free cakes are:');
for (let i = 0; i < sugarFreeCookies.length; i++) {
    console.log(`${i+1}. ${sugarFreeCookies[i]._name}`);
}


