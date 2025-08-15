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
    let cellules = Array.from(dataInit.grille);
    vue = new Vue(cellules);
    
    initialisationFaite = true;
}

function recevoirUpdate(data) {
  vue.grille = Array.from(data.grille);
  vue.classement = data.classement;

}

/*function afficherGrille() {
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
}*/