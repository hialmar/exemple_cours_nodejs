// importe le constructeur EventEmitter du module events
const EventEmitter = require('events').EventEmitter;

// crée un émetteur d'événements
const evt = new EventEmitter();

// attend les événements custom test
evt.on('test', function(message){
    // affiche le paramètre
    console.log(message);
});

// envoie l'événement custom test
evt.emit('test', 'message new');
