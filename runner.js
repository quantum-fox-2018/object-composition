const {CookieFactory} = require("./cookieFactory.js");

var fs = require('fs');
let options = fs.readFileSync('./cookies.txt').toString().split('\n');

let batchOfCookies = CookieFactory.create(options);
console.log(batchOfCookies);
console.log("\n");
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batchOfCookies);
console.log("sugar free cakses are :");
for(let i in sugarFreeFoods) {
  console.log(sugarFreeFoods[i]);
}
