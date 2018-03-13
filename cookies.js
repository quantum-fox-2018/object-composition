const {Ingredient} = require("./ingredient.js");

class Cookie {
  constructor() {
    this._name = "";
    this._status = "mentah";
    this._ingredients = [];
  }

  set ingredients(ingredient) {
    let ingr = new Ingredient(ingredient);
    this._ingredients.push(ingr);
  }

  get ingredients() {
    return this._ingredients;
  }

  addIngredient(ingredients) {
    let ingredient;
    for(let i in ingredients) {
      ingredient = new Ingredient(ingredients[i]);
      this.ingredients(ingredient);
    }
  }

  bake() {
    this._status = "selesai di masak";
  }
}

module.exports = {
  Cookie
};
