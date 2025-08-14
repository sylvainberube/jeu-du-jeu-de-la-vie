let controleur;
let interfaceAccueil;
let interfaceJeu;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 1);
    frameRate(60);
    // canvas.oncontextmenu = () => false;  // Empêche le clic droit d’ouvrir le menu

    const lignes = 100;
    const colonnes = 160;
    const nbJoueurs = 4;

    controleur = new Controleur(lignes, colonnes, 10);
    controleur.nouvellePartie(nbJoueurs);
    controleur.grille.genererAleatoire();
}

function draw() {
    controleur.gestionDuJeu();
}

function keyPressed() {
    controleur.gererKeyPressed();
}

function mouseWheel(event) {
    controleur.gererMouseWheel(event.delta);
}

function mousePressed() {
    controleur.gererMousePressed();
}

function mouseDragged() {
    controleur.gererMouseDragged();
}

function mouseReleased() {
    controleur.gererMouseReleased();
}

// Ajout d'un planeur
/*
const rlePlaneur = `
    x = 3, y = 3, rule = B3/S23
    bob$2bo$3o!
    `;
let motif = Motif.depuisRLE("Planeur", rlePlaneur);
// grille.ajouterMotif(motif, 2, 2);
grille.initialiserMotif(motif);
*/
