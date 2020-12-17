// importation du module mongoose
const mongoose = require('mongoose');

// Connexion à la base mongodb
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// création d'un modèle de document
const CarnetAdresse = mongoose.model('CarnetAdresse', { nom: String, prenom: String, adresse: String,
    codepostal: Number, ville: String });

// création d'un document
const adresse = new CarnetAdresse({ nom: "Toto", prenom: "Jean", adresse: "1 place du Capitole",
    codepostal: 31000, ville: "Toulouse" });

// sauve le document
adresse.save().then(function() {
    console.log('Nouvelle adresse sauvée');

    // cherche et affiche tous les documents
    CarnetAdresse.find(function (err, adresses) {
        // en cas d'erreur
        if (err) return console.error(err);
        // affiche les résultats
        console.log(adresses);
    });

    // cherche et affiche un document de nom Toto
    CarnetAdresse.find({nom: "Toto"}, function (err, adresses) {
        // en cas d'erreur
        if (err) return console.error(err);
        // affiche les résultats
        console.log(adresses);
        // demande la déconnexion
        mongoose.disconnect()
    });

});
