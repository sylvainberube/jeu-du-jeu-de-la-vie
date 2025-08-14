let lignes = 80;
let colonnes = 80;
let cellules = Array.from({ length: lignes }, () => Array(colonnes).fill(0));

function setup() {
  createCanvas(1600, 1600);

  socket = io.connect('http://localhost:3000');
  socket.on('grille', recevoirGrille);
}

function draw() {
  background(220, 100, 200);

  afficherGrille();
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

function afficherGrille() {
  stroke(192);
  strokeWeight(1);

  let tailleCellule = 20;
  let lignes = cellules.length;
  let colonnes = cellules[0].length;

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

