// importation du constructeur Sequelize, de la classe Model et des DataTypes
// du module sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');

// connexion à un SGBD MySQL
const sequelize = new Sequelize('mysql://root:root@localhost:8889/miage');

// création d'un modèle Utilisateur
class Utilisateur extends Model {
    afficher() {
        console.log(this.prenom + ' ' + this.nom);
    }
}

// Initialisation du modèle pour Sequelize
Utilisateur.init({
    // Les attributs sont définis ici
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Les options vont ici
    sequelize, // on doit indiquer la connexion sequelize
    modelName: 'Utilisateur' // On indique aussi le nom du modèle
});

// Le reste du code s'exécute en asynchrone avec async et await
async function run() {
    // on synchronise la BD (le force true indique qu'on va détruire la table et la recréer)
    await Utilisateur.sync({ force: true });

    // création d'un objet avec le modèle
    let util = Utilisateur.build({prenom: 'Jean', nom: 'Dupond'});
    // sauvegarde dans la BD
    await util.save();

    // on demande tous les objets
    let utilisateurs = await Utilisateur.findAll();
    console.log(utilisateurs);

    // on veut un objet en particulier
    let unUtil = await Utilisateur.findOne({where: {nom: 'Dupond'}});
    unUtil.afficher();

    // mise à jour d'un objet
    await Utilisateur.update({prenom: 'Jannot'}, {where: {nom: 'Dupond'}});

    // on vérifie que ça a bien marché
    unUtil = await Utilisateur.findOne({where: {nom: 'Dupond'}});
    unUtil.afficher();

    // suppression d'un objet
    await Utilisateur.destroy({where: {nom: 'Dupond'}});

    // fermeture de la connexion
    sequelize.close();
}

// on exécute la fonction asynchrone
run().catch(console.dir); // on affiche les erreurs sur la console

