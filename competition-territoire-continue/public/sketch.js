let vue;
initialisationFaite = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  socket = io.connect('http://localhost:3000');
  socket.on('initialisation', recevoirInitinalisation);
  socket.on('update', recevoirUpdate);
}

function draw() {
  background(0, 0, 30);
  if (initialisationFaite) {
    background(vue.couleurFond);
    vue.afficher();
  }

  // Déplacement de la vue
  if (keyIsDown(UP_ARROW)) {
    vue.modifierDecalage(0, 20);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    vue.modifierDecalage(-20, 0);
  }
  if (keyIsDown(DOWN_ARROW)) {
    vue.modifierDecalage(0, -20);
  }
  if (keyIsDown(LEFT_ARROW)) {
    vue.modifierDecalage(20, 0);
  }
}

// Action sur une cellule (à modifier avec les motifs)
function mousePressed() {
  cellule = vue.pixelVersCellule(mouseX, mouseY);
  let position = {
    typeInterraction: vue.modeInterraction,
    x: cellule[0],
    y: cellule[1],
    rotation : vue.listeNbRotations[vue.modeInterraction]
  }
  print("Cellule : " + position.x + " " + position.y);

  socket.emit('modificationGrille', position);
}

function mouseWheel(event) {
  if (event.delta < 0) {
    vue.augmenterZoom(mouseX, mouseY);
  } else if (event.delta > 0) {
    vue.diminuerZoom(mouseX, mouseY);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    vue.modifierDecalage(-10, 0);
  } else if (keyCode === RIGHT_ARROW) {
    console.log("Flèche droite");
  } else if (keyCode === UP_ARROW) {
    console.log("Flèche haut");
  } else if (keyCode === DOWN_ARROW) {
    console.log("Flèche bas");
  }
}

function recevoirInitinalisation(dataInit) {
  let cellules = Array.from(dataInit.grille);
  let cellulesTerritoire = Array.from(dataInit.grilleTerritoire);
  vue = new Vue(cellules, cellulesTerritoire);

  vue.initialisationGlobale();

  initialisationFaite = true;
}

function recevoirUpdate(data) {
  vue.grille = Array.from(data.grille);
  vue.grilleTerritoire = Array.from(data.grilleTerritoire);
  vue.classement = data.classement;

}
