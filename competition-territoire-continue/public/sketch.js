let lignes;
let colonnes;
cellules = [];

initialisationFaite = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  socket = io.connect('http://localhost:3000');
  socket.on('initialisation', recevoirInitinalisation);
  socket.on('grille', recevoirGrille);
}

function draw() {
  background(220, 100, 200);

  if (initialisationFaite) {
  afficherGrille();
  }
}

function mousePressed() {
  let position = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('modificationGrille', position);
}

function recevoirGrille(cellulesServeur) {
  cellules = Array.from(cellulesServeur);
}

function recevoirInitinalisation(dataInit) {
    cellules = Array.from(dataInit.grille);
    lignes = dataInit.lignes;
    colonnes = dataInit.colonnes;

    initialisationFaite = true;
}

function afficherGrille() {
  stroke(192);
  strokeWeight(1);

  let tailleCellule = 20;

  for (let i = 0; i < colonnes; i++) {
    for (let j = 0; j < lignes; j++) {
      switch (cellules[i][j]) {
        case 0:
          fill(32);
          break;
        case 1:
          fill(255, 100, 100);
          break;
        case 2:
          fill(100, 100, 255);
          break;
      }
      square(i * tailleCellule, j * tailleCellule, tailleCellule);
    }
  }
}