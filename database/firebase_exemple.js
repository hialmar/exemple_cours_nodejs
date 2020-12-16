const admin = require("firebase-admin");

const serviceAccount = require("./cours-node-eea47-firebase-adminsdk-w75j0-0f53a176e0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cours-node-eea47-default-rtdb.firebaseio.com"
});

async function run()
{
    const db = admin.database();

    const ref = db.ref();

    await ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childKey);
            console.log(childData);
        });
    });

    /*
    console.log('nouveau noeud');
    const nouveauNoeud = ref.push();
    console.log('ajout de l\'objet');
    await nouveauNoeud.set({nom: 'Marcel', prenom: 'Pierre'});
    */

    //console.log('référence');
    //const refFils = ref.child('-MOesBghIZrGvgd77Mkj');
    //console.log(refFils.key);
    //console.log('mise à jour');
    //await refFils.update({ddn:'11/04/2000'});
    //console.log('suppression');
    //await refFils.remove();

    console.log('fin de run');
}

run().catch(console.log).then(()=>console.log('fin d\'excution'));
