// Importation du module Express
let express = require('express');

// Création d'une application express
let app = express();
let server = app.listen(3000);
app.use(express.static('public'));
console.log("Serveur opérationnel");
let socket = require('socket.io');
let io = socket(server);
// io.sockets.on('connection', nouvelleConnexion);