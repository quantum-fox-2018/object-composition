"use stric"

const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

class Ingridients{
  constructor(options){
    this.name = options['name'];
    this.amount = options['amount'];
  }
}

class Cookie{
  constructor(options){
    this.name = this.getCookieName(options);
    this.status = 'mentah';
    this.ingridients = this.getIngridients(options);
  }

  basket(){
    this.status = 'selesai dimasak';
  }

  getCookieName(options){
    let indexOfEqual = options.indexOf('=');
    let name = options.substr(0, indexOfEqual-1);

    return name;
  }

  getIngridients(options){
    let ingridientsArr = [];
    let indexOfEqual = options.indexOf('=');
    let onlyIngridients = options.substr(indexOfEqual+2);

    onlyIngridients = onlyIngridients.split(',');

    for(let index in onlyIngridients){
      let tempItem = onlyIngridients[index].split(':');
      let inggredientObj = {name : tempItem[1].trim(), amount: tempItem[0].trim()}
      let ingridients = new Ingridients(inggredientObj);
      ingridientsArr.push(ingridients);
    }

    return ingridientsArr;
  }
}

class PeanutButter extends Cookie{
  constructor(options){
    super(options)
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie{
  constructor(options){
    super(options);
    this.choc_chip_count = 200;
  }
}

class ChocolateCheese extends Cookie{
  constructor(options){
    super(options);
    this.choc_cheese_count = 250;
  }
}

class ChocolateButter extends Cookie{
  constructor(options){
    super(options);
    this.choc_butter_count = 150;
  }
}

// FACTORY

class CookieFactory{
  static create(cookies){
    let cookies_list = [];
    let cookies_arr = this.getCookieArr(cookies);
    for(let line = 0; line < cookies_arr.length; line++){
      (cookies_arr[line].indexOf('peanut butter') !== -1) ? cookies_list.push(new PeanutButter(cookies_arr[line])) :
      (cookies_arr[line].indexOf('chocolate chip') !== -1) ? cookies_list.push(new ChocolateCheese(cookies_arr[line])) :
      (cookies_arr[line].indexOf('chocolate cheese') !== -1) ? cookies_list.push(new ChocolateChip(cookies_arr[line])) :
      (cookies_arr[line].indexOf('chocolate butter') !== -1) ? cookies_list.push(new ChocolateButter(cookies_arr[line])) :
      cookies_list = [];
    }
    return cookies_list;
  }

  static getCookieArr(cookies){
    let fs = require('fs');
    let arr = fs.readFileSync(cookies,'utf8').split('\n');
    arr.pop();

    return arr;
  }

  static cookieRecommendation(day, bacth_of_cookies){
    let cookies = bacth_of_cookies;
    console.log('Hey, in ' + day +' we serve:');
    for(let indexCookie in cookies){
      if (day !== 'tuesday') {
        console.log(cookies[indexCookie].name + ' cookies')
      } else{
        let sugarCheck = false;
        for(let indexIngridients in cookies[indexCookie].ingridients){
          if(cookies[indexCookie].ingridients[indexIngridients].name === 'sugar'){
            sugarCheck = true;
            break;
          }
        }
        if(sugarCheck === false) console.log(cookies[indexCookie].name + ' cookies, dont worry its suggar free');
      }
    }
    console.log('\n');
  }
}



let bacth_of_cookies = CookieFactory.create('cookies.txt');
// console.log(bacth_of_cookies);
// console.log('');
for(let index in days){
  CookieFactory.cookieRecommendation(days[index],bacth_of_cookies);
}

//console.log(bacth_of_cookies);
