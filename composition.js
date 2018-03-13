"use strict"

const fs = require('fs');
const options = fs.readFileSync('cookies.txt').toString();

class Cookie {

  constructor() {

  }

  bake(){

  }

}


class PeanutButter extends Cookie {

  constructor(name) {

    super(name)
    this.name = name
    this.ingredients = []
    this.peanut_count = 100

  }

}

class ChocolateChip extends Cookie {

  constructor(name) {

    super(name)
    this.name = name
    this.ingredients = []
    this.choc_chip_count = 200

  }

}

class OtherCookie extends Cookie {

  constructor(name) {

    super(name)
    this.name = name
    this.ingredients = []
    this.choc_chip_count = 150

  }

}

class CookieFactory {

  static create(options){

    let arr = []
    let name ;
    let removeSpace ;
    let splitted = options.split('\n')

    for (var i = 0; i < splitted.length; i++) {

      if (splitted[i] !== '') {

        if (splitted[i].split(','&&'=')[0] == 'peanut butter ') {

          name = splitted[i].split(','&&'=')[0]
          removeSpace = name.slice(0, name.length-1)

          let kueKacang = new PeanutButter(removeSpace)
          let bahan = splitted[i].split(' ').slice(3).join(' ')

          arr.push(kueKacang)
          kueKacang.ingredients.push(bahan)

        } else if (splitted[i].split(','&&'=')[0] == 'chocolate chip ') {

          name = splitted[i].split(','&&'=')[0]
          removeSpace = name.slice(0, name.length-1)

          let kueCoklat = new ChocolateChip(removeSpace)

          arr.push(kueCoklat)
          kueCoklat.ingredients.push(splitted[i].split(' ').slice(3).join(' '))

        } else {

          name = splitted[i].split(','&&'=')[0]
          removeSpace = name.slice(0, name.length-1)

          let lainnya = new OtherCookie(removeSpace)

          arr.push(lainnya)
          lainnya.ingredients.push(splitted[i].split(' ').slice(3).join(' '))

        }

      }

    }

    return arr

  }

  static filterTanpaGula(hari, batch_of_cookies){

    var rekomendasi = []

    if (hari == 'Selasa') {

      for (var i = 0; i < batch_of_cookies.length; i++) {

        if (batch_of_cookies[i].ingredients[0].indexOf('sugar') == -1) {

          rekomendasi.push(batch_of_cookies[i].name)

        }

      }

    }

    return rekomendasi.join('\n')

  }

}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
console.log('\n' +' ==================>>>> ' +'\n');
console.log('sugar free cake are : '+'\n');
console.log(CookieFactory.filterTanpaGula('Selasa', batch_of_cookies));
