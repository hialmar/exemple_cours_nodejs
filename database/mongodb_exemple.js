// importe le constructeur MongoClient du module mongodb
const { MongoClient } = require("mongodb");

// Ceci est l'URI de connexion à la base de donnée mongodb
const uri =
    'mongodb://localhost:27017/test';

// création d'un client
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// on fait tourner le code en asynchrone
async function run() {
    try {
        // appelle connect et attend que la promesse soit résolue
        await client.connect();

        // choisit une base de donnée
        const database = client.db("miage");
        // crée une collection de documents
        const collection = database.collection("carnetadresse");
        // crée un document à insérer
        const doc = { nom: "Durand", prenom: "Didier", adresse: "1 place du Busca",
            codepostal: 31400, ville: "Toulouse" };
        // insère le document et attend que la promesse soit résolue
        const result = await collection.insertOne(doc);
        // affiche le résultat
        console.log(
            `${result.insertedCount} documents ont été insérés avec l'_id: ${result.insertedId}`,
        );
        // paramètre pour la recherche
        const query = { ville: 'Toulouse' };
        const options = {
            // trie les documents par ordre alphabétique
            sort: { nom: 1 },
        };
        // cherche les documents
        const cursor = collection.find(query, options);
        // affiche un message si rien n'a été trouvé
        if ((await cursor.count()) === 0) {
            console.log("Aucun document correspondant!");
        }
        // affiche les documents trouvés
        await cursor.forEach(console.dir);
    } finally {
        // ferme la connexion avec le client
        await client.close();
    }
}
run().catch(console.dir); // on affiche les erreurs sur la console
