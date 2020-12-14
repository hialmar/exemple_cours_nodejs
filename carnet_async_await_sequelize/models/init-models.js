var DataTypes = require("sequelize").DataTypes;
var _carnetadresse = require("./carnetadresse");

function initModels(sequelize) {
  var carnetadresse = _carnetadresse(sequelize, DataTypes);


  return {
    carnetadresse,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
