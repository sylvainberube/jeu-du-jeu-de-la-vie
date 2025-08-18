const Grille = require('./Grille');
const Simulateur = require('./Simulateur');
const Controleur = require('./Controleur');

let controleur;

let colonnes = 100;
let lignes = 100;
// let cellules = Array.from({ length: colonnes }, () => Array(lignes).fill(0));

controleur = new Controleur(lignes, colonnes, 200);
let nbJoueurs = 2;
controleur.nouvellePartie(nbJoueurs);
controleur.genererGrilleAleatoire(nbJoueurs);

let joueursId = [];
/*
for (let i = 0; i < colonnes; i++) {
    for (let j = 0; j < lignes; j++) {
        if (Math.random() <= 0.4) {
            if (Math.random() <= 0.5) {
                cellules[i][j] = 1;
            } else {
                cellules[i][j] = 2;
            }
        } else {
            cellules[i][j] = 0;
        }
    }
}
*/

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
        let cellX = Math.floor(position.x / 20);
        let cellY = Math.floor(position.y / 20);
        if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
            controleur.modifierCellule(cellX, cellY, joueurId + 1);
            // cellules[cellX][cellY] = joueurId + 1;
        }

        // io.sockets.emit('grille', controleurcellules);

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
    /*
    // Initialiser toutes les cellules à 0
    let grilleGenerationSuivante = Array.from({ length: colonnes }, () => Array(lignes).fill(0));

    for (let i = 0; i < colonnes; i++) {
        for (let j = 0; j < lignes; j++) {
            let etatsVoisins = obtenirEtatsVoisins(i, j);
            const nbVoisinesVivantes = etatsVoisins.length;
            const etatActuel = cellules[i][j];

            // Naissance
            if (etatActuel === 0 && (nbVoisinesVivantes === 3)) {
                grilleGenerationSuivante[i][j] = Math.floor(1 + Math.random() * 2);
            }

            // Survie
            if (etatActuel >= 1 && (nbVoisinesVivantes === 2 || nbVoisinesVivantes === 3)) {
                grilleGenerationSuivante[i][j] = etatActuel;
            }
        }
    }
    */

    /*
    let grille = controleur.obtenirGrille();
    let grilleTerritoire = controleur.obtenirGrilleTerritoire();
    let data = {
        'grille': grille,
        'grilleTerritoire': grilleTerritoire,
    }
    io.sockets.emit('grille', data);
    */

    let grille = Array.from(controleur.obtenirGrille());
    let grilleTerritoire = controleur.obtenirGrilleTerritoire();
    dataUpdate = {
        'grille' : grille,
        'grilleTerritoire' : grilleTerritoire,
        'classement' : classement
    }
    io.sockets.emit('update', dataUpdate);

}

/*
function obtenirEtatsVoisins(i, j) {
    const voisins = [];
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            if (k === 0 && l === 0) continue;
            const ni = (i + k + lignes) % lignes;
            const nj = (j + l + colonnes) % colonnes;

            const etat = cellules[ni][nj];
            if (etat >= 1) {
                voisins.push(etat);
            }
        }
    }
    return voisins;
}
*/

setInterval(calculerGenerationSuivante, controleur.obtenirIntervalle());