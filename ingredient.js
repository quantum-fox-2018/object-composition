class Ingredient {
  constructor(options) {
    this._name = options['name']
    this._amount = options['amount']
  }

  get name(){
    return this._name;
  }
}

module.exports = {
  Ingredient
};
