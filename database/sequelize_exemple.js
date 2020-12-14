const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://root:root@localhost:8889/miage');

class Utilisateur extends Model {
    afficher() {
        console.log(this.prenom + ' ' + this.nom);
    }
}

Utilisateur.init({
    // Model attributes are defined here
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Utilisateur' // We need to choose the model name
});

async function run() {
    await Utilisateur.sync({ force: true });
    let util = Utilisateur.build({prenom: 'Jean', nom: 'Dupond'});
    await util.save();

    let utilisateurs = await Utilisateur.findAll();
    console.log(utilisateurs);

    let unUtil = await Utilisateur.findOne({where: {nom: 'Dupond'}});
    unUtil.afficher();

    await Utilisateur.update({prenom: 'Jannot'}, {where: {nom: 'Dupond'}});

    unUtil = await Utilisateur.findOne({where: {nom: 'Dupond'}});
    unUtil.afficher();

    await Utilisateur.destroy({where: {nom: 'Dupond'}});

    sequelize.close();
}

run().catch(console.dir); // on affiche les erreurs sur la console

