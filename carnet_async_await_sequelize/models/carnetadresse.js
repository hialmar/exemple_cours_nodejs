// Fichier généré automatiquement par
// sequelize-auto -o "./models" -d miage -h localhost -u root -p 8889 -x root -e mysql -l es6

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return carnetadresse.init(sequelize, DataTypes);
}

class carnetadresse extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    idclient: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    codepostal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    dernieremodif: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'carnetadresse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idclient" },
        ]
      },
    ]
  });
  return carnetadresse;
  }
}
