// Fichier généré automatiquement par
// sequelize-auto -o "./models" -d miage -h localhost -u root -p 8889 -x root -e mysql -l es6

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
