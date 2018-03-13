const {Cookie} = require("./cookies.js");

class ChocholateChip extends Cookie {
  constructor(obj) {
    super(obj);
    this._name = obj.name;
    this._chocChipCount = obj.chocChipCount || 200;
  }
}

module.exports = {
  ChocholateChip
};
