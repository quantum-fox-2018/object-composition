const {Cookie} = require("./cookies.js");

class PeanutButter extends Cookie {
  constructor(obj) {
    super();
    this._name = obj.name;
    this._peanutCount = obj.peanutCount || 100;
  }
}

module.exports = {
  PeanutButter
};
