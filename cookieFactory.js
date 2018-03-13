const {PeanutButter} = require("./peanutButter.js");
const {ChocholateChip} = require("./chocholateChip.js");
const {OtherCookie} = require("./otherCookie.js");

class CookieFactory {
  static create(options) {
    let cookies = [];
    let cookiesTmp;
    let objCookie;
    let cookieName;
    let cookieIngredients;
    for(let i in options) {
      cookiesTmp = options[i].split(' = ');
      cookieName = cookiesTmp[0];
      //nama cookies
      objCookie = {};
      if(cookieName === "peanut butter") {
        objCookie = new PeanutButter({name: cookieName});
      } else if(cookieName === "chocolate chip") {
        objCookie = new ChocholateChip({name: cookieName});
      } else {
        objCookie = new OtherCookie({name: cookieName});
      }

      // ingredients
      cookieIngredients = cookiesTmp[1];
      if(cookieIngredients && cookieIngredients.indexOf(",") > 3) {
        let ingredient = cookieIngredients.split(', ');
        for(let j in ingredient) {
          let indgr = ingredient[j].split(" : ");
          objCookie.ingredients = {
            name: indgr[1],
            amount: indgr[0]
          };
        }
      }
      cookies.push(objCookie);
    }
    return cookies;
  }

  static cookieRecommendation(day, batchOfCookies) {
    let rekomendasi = [];
    let checkSugar;
    if(day === "tuesday") {
      for(let i in batchOfCookies) {
        checkSugar = false;
        for(let j in batchOfCookies[i]._ingredients) {
          if(batchOfCookies[i]._ingredients[j]._name === "sugar") {
            checkSugar = true;
          }
        }
        if(!checkSugar) {
          rekomendasi.push(batchOfCookies[i]);
        }
      }
    }
    return rekomendasi;
  }
}

module.exports = {
  CookieFactory
};
