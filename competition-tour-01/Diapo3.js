const diapo3 = new diapo(Globals.w/2, haut/2);
diapos.push(diapo3);

var boutton3_0 = createButton("Faire apparaître le voisinage");
const demi3_0 = 93;
boutton3_0.position(diapos[2].centerX - demi3_0, diapos[2].centerY+Globals.w/10);
boutton3_0.hide();

let boutton3_1 = createButton("Suite");
const demi3_1 = 30;
boutton3_1.position(diapos[2].centerX - demi3_1, diapos[2].centerY + Globals.w/6);
boutton3_1.hide();

function diapo3_0 () {
  diapos[2].show();
  diapos[2].texte("On s'intéresse maintenant à la cellule entourée de rouge. Les cellules autour d'elle forment ce qu'on appelle son voisinage.", diapos[2].centerX, diapos[2].centerY - Globals.w/12);
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  var sqWidth = constrain(width/8,0,diapos[2].centerY+diapos[2].hauteur/2);
  square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);
  strokeWeight(1);
  for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
  }

  noStroke();
  fill(0);
  square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

  strokeWeight(3);
  stroke(255,0,0);
  fill(255);
  square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

  boutton3_0.show(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
}

aller3_1 = function() {
    diapoActuelle = 2;
    sousDiapo = 1;
    boutton3_0.hide();
}

boutton3_0.mouseClicked(aller3_1);

function diapo3_1 () {
  boutton3_0.hide();
  diapos[2].show();
  diapos[2].texte("Pour faire évoluer le jeu, on compte le nombre de cellules vivantes dans le voisinage de chaque cellule.", diapos[2].centerX, diapos[2].centerY - Globals.w/12);
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  var sqWidth = constrain(width/8,0,diapos[2].centerY+diapos[2].hauteur/2);
  square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);
  strokeWeight(1);
  for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
  }

  noStroke();
  fill(0);
  square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

  strokeWeight(3);
  stroke(100,100,255);
  fill(100,100,255,35);
  square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

  fill(255);
  stroke(255,0,0);
  square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
  diapos[2].texte("Ici, il y a trois cellules vivantes dans le voisinage", diapos[2].centerX, diapos[2].centerY+width/9);

  boutton3_1.show();
}

aller4_0 = function() {
    diapoActuelle = 3;
    sousDiapo = 0;
    boutton3_1.hide();
}

boutton3_1.mouseClicked(aller4_0);

let diapos3 = [diapo3_0, diapo3_1];
fonctionsDiapos.push(diapos3);
