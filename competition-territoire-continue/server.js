const Grille = require('./Grille');
const Simulateur = require('./Simulateur');
const Controleur = require('./Controleur');
const motifs = require('./public/motifs.js');

let controleur;

let lignes = 100;
let colonnes = 200;
controleur = new Controleur(colonnes, lignes, 100);

let joueursId = [];
controleur.nouvellePartie();
// controleur.genererGrilleAleatoire();

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
    // Ne pas accepter de nouvelle connexion lorsque le serveur contient 20 joueurs
    if (controleur.obtenirNombreJoueur() >= 20) {
        return;
    }
    controleur.ajouterJoueur(socket.id);
    console.log("Connexion : " + socket.id + " | " + controleur.joueurs[socket.id].nom + " | (Etat " + controleur.joueurs[socket.id].etat + ")" );

    joueursId.push(socket.id);

    controleur.genererGrilleAleatoire();

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
        // let joueurId = joueursId.indexOf(socket.id);
        let joueurId = controleur.joueurs[socket.id].id;
        let joueurEtat = controleur.joueurs[socket.id].etat;
        let joueurNom = controleur.joueurs[socket.id].nom;
        console.log("Position : ");
        console.log(position);
        console.log("Socket : " + socket.id + " (joueur " + (joueurId + 1) + ")");

        console.log("Joueur ID | Nom | État : " + joueurId + " | " + joueurNom + " | " + joueurEtat);
        let cellX = position.x;
        let cellY = position.y;

        switch (position.typeInterraction) {
        case ("celluleUnique") :
        if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
            controleur.modifierCellule(cellX, cellY, joueurEtat);
        }
        break;
        case ("planeur") :
             if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
                let motif = motifs.planeur;
                for (i = 0; i < motif.length; i++){
                    for (j = 0; j < motif[0].length; j++) {
                        if(motif[i][j] == 1) {
                             controleur.modifierCellule(cellX + i, cellY + j, joueurEtat);
                             console.log('oui');
                        } else {
                            controleur.modifierCellule(cellX + i, cellY + j, 0);
                        }
                    }
                }
             }
             break;
         case ("lwss") :
             if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
                let motif = motifs.lwss;
                for (i = 0; i < motif.length; i++){
                    for (j = 0; j < motif[0].length; j++) {
                        if(motif[i][j] == 1) {
                             controleur.modifierCellule(cellX + i, cellY + j, joueurEtat);
                             console.log('oui');
                        } else {
                            controleur.modifierCellule(cellX + i, cellY + j, 0);
                        }
                    }
                }
             }
             break;
         case ("mwss") : 
         if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
                let motif = motifs.mwss;
                for (i = 0; i < motif.length; i++){
                    for (j = 0; j < motif[0].length; j++) {
                        if(motif[i][j] == 1) {
                             controleur.modifierCellule(cellX + i, cellY + j, joueurEtat);
                             console.log('oui');
                        } else {
                            controleur.modifierCellule(cellX + i, cellY + j, 0);
                        }
                    }
                }
             }
             break;
             case ("hwss") : 
         if (cellX >= 0 && cellX < colonnes && cellY >= 0 && cellY < lignes) {
                let motif = motifs.hwss;
                for (i = 0; i < motif.length; i++){
                    for (j = 0; j < motif[0].length; j++) {
                        if(motif[i][j] == 1) {
                             controleur.modifierCellule(cellX + i, cellY + j, joueurEtat);
                        } else {
                            controleur.modifierCellule(cellX + i, cellY + j, 0);
                        }
                    }
                }
             }
             break;
            
        }

     let grille = Array.from(controleur.obtenirGrille());
     let grilleTerritoire = controleur.obtenirGrilleTerritoire();
     dataUpdate = {
        'grille' : grille,
        'grilleTerritoire' : grilleTerritoire,
        'classement' : classement
     }
     io.sockets.emit('update', dataUpdate);

    }

    socket.on('disconnect', deconnexion);
    
    function deconnexion() {
        console.log("Déconnexion : " + socket.id + " | " + controleur.joueurs[socket.id].nom + " | (Etat " + controleur.joueurs[socket.id].etat + ")" );
        controleur.supprimerJoueur(socket.id);
    };

}

// Simulation d'une nouvelle génération
function calculerGenerationSuivante() {
    controleur.calculerGenerationSuivante();
    classement = controleur.obtenirClassementJoueurs();

    let grille = Array.from(controleur.obtenirGrille());
    let grilleTerritoire = controleur.obtenirGrilleTerritoire();
    dataUpdate = {
        'grille': grille,
        'grilleTerritoire': grilleTerritoire,
        'classement': classement
    }
    io.sockets.emit('update', dataUpdate);

}

setInterval(calculerGenerationSuivante, controleur.obtenirIntervalle());