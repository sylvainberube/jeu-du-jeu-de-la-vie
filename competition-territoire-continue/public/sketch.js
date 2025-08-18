/*
let lignes;
let colonnes;
let cellules = [];
let cellulesTerritoire = [];
*/

let vue;

initialisationFaite = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  socket = io.connect('http://localhost:3000');
  socket.on('initialisation', recevoirInitinalisation);
  socket.on('update', recevoirUpdate);
}

function draw() {
  background(220, 100, 200);

  if (initialisationFaite) {
    vue.afficher();
  }
}

function mousePressed() {
  let position = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('modificationGrille', position);
}

function recevoirInitinalisation(dataInit) {
    /*
    cellules = Array.from(dataInit.grille);
    cellulesTerritoire = Array.from(dataInit.grilleTerritoire);
    lignes = dataInit.lignes;
    colonnes = dataInit.colonnes;
    */
    let cellules = Array.from(dataInit.grille);
    let cellulesTerritoire = Array.from(dataInit.grilleTerritoire);
    vue = new Vue(cellules, cellulesTerritoire);
    
    initialisationFaite = true;
}

/*function recevoirGrille(data) {
  cellules = Array.from(data.grille);
  cellulesTerritoire = Array.from(data.grilleTerritoire);
}
*/

function recevoirUpdate(data) {
  vue.grille = Array.from(data.grille);
  vue.grilleTerritoire = Array.from(data.grilleTerritoire);
  vue.classement = data.classement;

}

/*function afficherGrille() {
  stroke(240);
  strokeWeight(1);

  let tailleCellule = 20;

  for (let i = 0; i < colonnes; i++) {
    for (let j = 0; j < lignes; j++) {
      switch (cellules[i][j]) {
        case 0:
          fill(228);
          if (cellulesTerritoire[i][j] === 1) {
            fill(255, 200, 200)
          } else if (cellulesTerritoire[i][j] === 2) {
            fill(200, 200, 255)
          }
          break;
        case 1:
          fill(255, 50, 50);
          break;
        case 2:
          fill(50, 50, 255);
          break;
      }
      square(i * tailleCellule, j * tailleCellule, tailleCellule);
    }
  }
}*/