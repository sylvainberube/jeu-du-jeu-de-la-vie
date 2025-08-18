const Grille = require('./Grille');
const Simulateur = require('./Simulateur');
const Controleur = require('./Controleur');

let controleur;

let lignes = 45;
let colonnes = 95;

controleur = new Controleur(colonnes, lignes, 200);
let nbJoueurs = 2;
controleur.nouvellePartie(nbJoueurs);
controleur.genererGrilleAleatoire(nbJoueurs);

let joueursId = [];

// Importation du module Express
let express = require('express');

// Création d'une application express
let app = express();
let server = app.listen(3000);
app.use(express.static('public'));
console.log("Serveur opérationnel");
let socket = require('socket.io');
let io = socket(server);
io.sockets.on('connection', nouvelleConnexion);

function nouvelleConnexion(socket) {
    joueursId.push(socket.id);

    console.log('Nouvelle connexion : ' + socket.id);

    let grille = controleur.obtenirGrille();
    let grilleTerritoire = controleur.obtenirGrilleTerritoire();
    dataInit = {
        'grille': grille,
        'grilleTerritoire': grilleTerritoire,
        'colonnes': colonnes,
        'lignes': lignes
    }
    io.sockets.emit('initialisation', dataInit);

    socket.on('modificationGrille', modificationGrille);

    function modificationGrille(position) {
        let joueurId = joueursId.indexOf(socket.id);
        console.log("Position : ");
        console.log(position);
        console.log("Socket : " + socket.id + " (joueur " + (joueurId + 1) + ")");
        let cellX = position.x;
        let cellY = position.y;
        if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
            controleur.modifierCellule(cellX, cellY, joueurId + 1);
        }

        let grille = controleur.obtenirGrille();
        let grilleTerritoire = controleur.obtenirGrilleTerritoire();
        data = {
            'grille': grille,
            'grilleTerritoire': grilleTerritoire,
        }
        io.sockets.emit('grille', data);
    }
}

// Simulation d'une nouvelle génération
function calculerGenerationSuivante() {
    controleur.calculerGenerationSuivante();
    classement = controleur.obtenirClassementJoueurs();

    let grille = Array.from(controleur.obtenirGrille());
    let grilleTerritoire = controleur.obtenirGrilleTerritoire();
    dataUpdate = {
        'grille' : grille,
        'grilleTerritoire' : grilleTerritoire,
        'classement' : classement
    }
    io.sockets.emit('update', dataUpdate);

}

setInterval(calculerGenerationSuivante, controleur.obtenirIntervalle());