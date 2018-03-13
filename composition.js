"use strict"
var fs = require('fs');
var theOrder = fs.readFileSync('cookies.txt', 'utf8').split('\n');
// console.log(theOrder)

class Ingredients{
    constructor(amount, name){
        this.name = name;
        this.amount = amount;
    }

}

class Cookie{
    constructor(name, status, ingredients, has_sugar){
        this.name = name;
        this.status = 'mentah'
        this.ingredients = ingredients;
        this.has_sugar = has_sugar;
    }

    bake(){
        this.status = 'selesai dimasak';
    }


}

class PeanutButter extends Cookie{
    constructor(name, status, ingredients, has_sugar){
        super(name, status, ingredients, has_sugar);
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(name, status, ingredients, has_sugar){
        super(name, status, ingredients, has_sugar);
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name, status, ingredients, has_sugar){
        super(name, status, ingredients, has_sugar);
        this.other_count = 150
    }
}

class CookieFactory{
    
    static create(listOfOrder){
        // accepts a list of cookie types and returns those cookies
        let result = [];

        for(let indexCookie = 0; indexCookie < listOfOrder.length; indexCookie++){
            let cookieArr = CookieFactory.cutName(listOfOrder[indexCookie]);
            
            if(cookieArr === 'peanut butter'){
                result.push(new PeanutButter(cookieArr, 'mentah', CookieFactory.createIngredient(listOfOrder[indexCookie]), CookieFactory.checkSugar(listOfOrder[indexCookie])));
            }else if(cookieArr === 'chocolate chip'){
                result.push(new ChocolateChip(cookieArr, 'mentah', CookieFactory.createIngredient(listOfOrder[indexCookie]), CookieFactory.checkSugar(listOfOrder[indexCookie])));
            }else{
                result.push(new OtherCookie(cookieArr, 'mentah', CookieFactory.createIngredient(listOfOrder[indexCookie]), CookieFactory.checkSugar(listOfOrder[indexCookie])));
            }
        }

        return result;
    }

    // define other methods as needed
    
    static cutName(rowOfOrder){
        let str = '';
        let spaceCounter = 0;
        for(let rowIndex =0; rowIndex<rowOfOrder.length; rowIndex++){
            if(rowOfOrder.charAt(rowIndex) === ' '){
                spaceCounter++;
            }
            if(spaceCounter === 2){
                return str;
            }
            str += rowOfOrder.charAt(rowIndex);
        }
    }

    static createIngredient(listOfOrder){
        let resultIngredient = [];
        let arrName = [];
        let arrAmount = [];
        let str = '';
        let spaceCounter = 0;
        
        for(let columnIndex =0; columnIndex<listOfOrder.length; columnIndex++){
            if(listOfOrder.charAt(columnIndex) === ' '){
                spaceCounter++;
            }
            if(spaceCounter === 3){
                str = '';
            }
            else if(listOfOrder.charAt(columnIndex) === ':'){
                arrAmount.push(str);
                str = '';
            }else if(listOfOrder.charAt(columnIndex) === ','){
                arrName.push(str);
                str = '';
            }
            str += listOfOrder.charAt(columnIndex);
            
        }

        for(let counter =0; counter<arrName.length; counter++){
            resultIngredient.push(new Ingredients(arrAmount[counter], arrName[counter]));
            
        }
        return resultIngredient;
    }

    static checkSugar(listOfOrder){
        
        let str = '';
        let has_sugar = null;
        let spaceCounter = 0;
        for(let columnIndex =0; columnIndex<listOfOrder.length; columnIndex++){
            if(listOfOrder.charAt(columnIndex) === ' '){
                spaceCounter++;
            }
            if(spaceCounter === 3){
                str = '';
            }
            else if(listOfOrder.charAt(columnIndex) === ':'){
                str = '';
            }else if(listOfOrder.charAt(columnIndex) === ','){
                if(str === ': sugar'){
                    return 'yes';
                }
                str = '';
            }
            str += listOfOrder.charAt(columnIndex);
        }
        return has_sugar;
        
    }

    static cookieRecommendation(day, listOfOrder){
        let cookie = CookieFactory.create(listOfOrder)
        let result = [];
        if(day === 'tuesday'){
            for(let objIndex = 0; objIndex<cookie.length; objIndex++){
                
                if(listOfOrder[objIndex].has_sugar !== 'yes'){
                    result.push(listOfOrder[objIndex]);
                }
            }
            return result;   
        }
        
        
    }



}

let batch_of_cookies = CookieFactory.create(theOrder);
// console.log(batch_of_cookies);


let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log('sugar free cakes are :');
for(let i =0; i<sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}