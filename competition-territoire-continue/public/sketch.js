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
    y: mouseY,
    typeInterraction: vue.modeInterraction
  }

  socket.emit('modificationGrille', position);
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