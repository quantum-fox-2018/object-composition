"use stict"
const fs = require("fs");
var options = fs.readFileSync("./cookies.txt", "utf8");
// console.log(options);

class Cookie {
  constructor(name){
    this.name = '';
    this.status = "Mentah";
    this.ingredients = [];
  }

  bake(){
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(name){
    super();
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name){
    super();
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name){
    super();
    this.name = name;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options){
    let listOfCookie = [];
    let batch_of_cookies = this.convertToArray(options);

    for(let i = 0; i < batch_of_cookies.length; i++){
      if(batch_of_cookies[i] != ''){ //kalo ada isinya
          let order_cookie = this.cookieType(batch_of_cookies[i]);
          listOfCookie.push(order_cookie);
      }
    }

    return listOfCookie;
  }

  static convertToArray(options){
    return options.split('\n');
  }

  static cookieType(name){
    let order_cookie = '';
    // console.log(batch_of_cookies[i]);
    if(name == 'peanut butter'){
        order_cookie = new PeanutButter(name);
    }else if (name == 'chocolate chip') {
        order_cookie = new ChocolateChip(name);
    }else{
        order_cookie = new OtherCookie(name);
    }

    return order_cookie;
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

class ingredient{

}















//
