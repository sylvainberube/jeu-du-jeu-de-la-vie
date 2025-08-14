// Nouvelles variables
let grille;
let vue;
let simulateur;
let controleur;

let grilleDeplacementEnCours = false;
let grilleDeplacementX;
let grilleDeplacementY;


// Anciennes variables débutent ici

let mode = 4;  // 4 = Compétitif
let modeIteration = true;
let modeModification = false;
let modeModificationTemps = 0;
let planeur = false;
let joueurActuel = 0;
let jeuCommence = false;
let tourCommence = false;
let toursJoues = 0;
let gagnant;
let finAtteinte = false;
let nbTours = 0;
let nbIterationsMax = 100;
let tempsJeu = 5000;
let partiesGagnees = [];

// Jeu de la vie
let x = 100;

let configurationNbColonnes = 0;
let configurationNbLignes = 0;
let configurationRegleNaissance = [3];
let configurationRegleSurvie = [2, 3];

let configurationRLE = `x = 2, y = 2, rule = B3/S23
2o$2o!`

// Affichage
let afficherImporterConfiguration = false;
let afficherExporterConfiguration = false;

let dragging = false;

let diapos = [];
let fonctionsDiapos = [];
let diapoActuelle = 0;
let sousDiapo = 0;

let snowflakes = []

let affichageGrille = false;
let chiffres = false;
let couleurs = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(60);
  // canvas.oncontextmenu = () => false;  // Empêche le clic droit d’ouvrir le menu
  background(200, 100, 100);

  const lignes = 50;
  const colonnes = 90;
  grille = new Grille(lignes, colonnes);
  grille.genererAleatoire(0.4);
  vue = new Vue(grille);
  vue.dessiner();
  simulateur = new Simulateur(grille, vue, 100);
  controleur = new Controleur(simulateur, vue);

  // 2. Jeu de la vie (bac à sable)


  //  diapo.interieur = color(225,225,255);
  //  angleMode(DEGREES);

  // 2. Jeu de la vie
  //  initialiserInterface();
  //  chargerConfiguration();
  //  initialiserGrille();
  //  initialiserGrilleCompetition1();
  //  centrerGrille();
}

/*
new p5()

function Globals() { }

Globals.w = windowWidth;
Globals.h = windowHeight;
let haut = Globals.w*9/16;
*/

// Cellule associée à la position de la souris
/*
function cellMouse() {
    let cellX = floor(mouseX / (grilleTailleCell * grilleZoom) + grillePosX);
    let cellY = floor(mouseY / (grilleTailleCell * grilleZoom) + grillePosY);
    return [cellX, cellY];
}
*/