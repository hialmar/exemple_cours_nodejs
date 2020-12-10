var EventEmitter = require('events').EventEmitter;

var evt = new EventEmitter();

evt.on('test', function(message){
    console.log(message);
});

evt.emit('test', 'message new');
