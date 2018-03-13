const {Cookie} = require("./cookies.js");

class OtherCookie extends Cookie {
  constructor(obj) {
    super();
    this._name = obj.name;
    this._otherCount = obj.otherCount || 150;
  }
}

module.exports = {
  OtherCookie
};
