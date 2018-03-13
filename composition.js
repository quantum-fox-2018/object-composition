'use strict'

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredient = [];
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    // accepts a list of cookie types and returns those cookies
    let listCreate = [];

    for (let i = 0; i < options.length-1; i++) {
      if (options[i] === 'peanut butter') {
        let cookie = new PeanutButter(options[i]);
        listCreate.push(cookie);
      } else if (options[i] === 'chcolate chip') {
        let cookie = new ChocolateChip(options[i]);
        listCreate.push(cookie);
      } else {
        let cookie = new OtherCookie(options[i]);
        listCreate.push(cookie);
      }
    }

    return listCreate;
  }
  // define other methods as needed
}

// contoh driver code
// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie factory
// dimana lokasi file yang kamu tulis supaya code bisa berjalan?
let fs = require('fs');
let options = fs.readFileSync('./cookies.txt').toString().split('\n');
let batch_of_cookies = CookieFactory.create(options);

console.log(batch_of_cookies);
