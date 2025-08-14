let mode = 4;  // 4 = Compétitif
let nbGenerations = 0;
let modeIteration = true;
let modeModification = false;
let modeModificationTemps = 0;
let etampeActif = false;
let aleatoireActif = false;
let joueurActuel = 0;
let jeuCommence = false;
let tourCommence = false;
let toursJoues = 0;
let gagnant;
let finAtteinte = false;
let nbTours = 5;
let nbIterationsMax = 150;
let tempsJeu =  10000;
let partiesGagnees = [];

// Jeu de la vie
let x = 100;
let grille;

let grilleNbColonnes = 75;
let grilleNbLignes = 75;
let grilleTailleCell = 20;

let grilleZoom = 1;
let grillePosX = 0;
let grillePosY = 0;
let configurationNbColonnes = 0;
let configurationNbLignes = 0;
let configurationRegleNaissance = [3];
let configurationRegleSurvie = [2, 3];
let transitionVitesse = 100; // Par seconde
let transitionActifTemps = 0;
let transitionActif = false;
let modificationCellules = false;

let configurationRLE = `x = 2, y = 2, rule = B3/S23
2o$2o!`

let configurations = [];
let configActuelle = 0;

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

let dataMotifs;
let motifs;

function preload() {
  dataMotifs = loadJSON('motifsCompetition.json', initialiserMotifs);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas.oncontextmenu = () => false;  // Empêche le clic droit d’ouvrir le menu
  background(255);

  //diapo.interieur = color(225,225,255);
  angleMode(DEGREES);

  // 2. Jeu de la vie
  initialiserInterface();
  chargerConfiguration();
  //  initialiserGrille();
  initialiserGrilleCompetition1();
  centrerGrille();
}

new p5()

function Globals() { }

Globals.w = windowWidth;
Globals.h = windowHeight;
let haut = Globals.w*9/16;

// Cellule associée à la position de la souris
function cellMouse() {
    let cellX = floor(mouseX / (grilleTailleCell * grilleZoom) + grillePosX);
    let cellY = floor(mouseY / (grilleTailleCell * grilleZoom) + grillePosY);
    return [cellX, cellY];
}