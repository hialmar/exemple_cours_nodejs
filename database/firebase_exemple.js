// importation du module firebase-admin
const admin = require("firebase-admin");

// jeton d'authentification contenant une clé privée récupéré via la console d'administration de firebase
const serviceAccount = require("./cours-node-eea47-firebase-adminsdk-w75j0-0f53a176e0.json");

// initialisation de la connexion à firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cours-node-eea47-default-rtdb.firebaseio.com"
});

// tout le reste sera exécuté en asynchrone
async function run()
{
    // récupération de la référence vers la base de données
    const db = admin.database();

    // récupération de la racine de la base de données hiérarchique
    const ref = db.ref();

    // inscription d'un callback qui sera appelé si des informations sont
    // disponibles sous la racine
    await ref.once('value', (snapshot) => {
        // snapshot est une version des données de la racine à un instant donné
        // on va parcourir tous les enfants de la racine
        snapshot.forEach((childSnapshot) => {
            // pour chaque enfant
            // on récupère la clé
            var childKey = childSnapshot.key;
            // puis les données stockées
            var childData = childSnapshot.val();
            // on affiche le tout
            console.log(childKey);
            console.log(childData);
        });
    });

    // pour créer un nouveau noeud
    console.log('nouveau noeud');
    // on appelle push qui crée un noeud avec une clé aléatoire
    const nouveauNoeud = ref.push();
    // il faut ensuite ajouter les données qu'on veut sauver dans ce noeud
    console.log('ajout de l\'objet');
    // ça se fait en passant un objet à set
    await nouveauNoeud.set({nom: 'Marcel', prenom: 'Pierre'});

    // si on veut récupérer les données d'un noeud existant
    console.log('référence');
    // il faut connaitre sa localisation (ici sous la racine ref)
    // et sa clé, ici -MOesBghIZrGvgd77Mkj
    const refFils = ref.child('-MOesBghIZrGvgd77Mkj');
    console.log(refFils.key);
    // pour faire une mise à jour
    console.log('mise à jour');
    // on appelle la méthode update en donnant un objet en paramètre
    // si des attributs existent déjà on changera leur valeur
    // sinon on ajoute les attributs et leur valeur
    await refFils.update({ddn:'11/04/2000', prenom: 'Jean'});

    // pour effacer un noeud (et les données)
    console.log('suppression');
    // on appelle la méthode remove
    await refFils.remove();

    console.log('fin de run');
}

// on exécute la fonction asynchrone
run().catch(console.log).then(()=>console.log('fin d\'excution')); // ce message sera exécuté à la fin

