const diapo2 = new diapo(Globals.w/2, haut/2);
diapos.push(diapo2);

var boutton2_0 = createButton("Faire apparaître la grille");
var demi2_0 = 75; 
boutton2_0.position(diapos[1].centerX - demi2_0, diapos[1].centerY + Globals.w/20);
boutton2_0.hide();

var boutton2_1 = createButton("Faire apparaître les états");
var demi2_1 = 80;
boutton2_1.position(diapos[1].centerX - demi2_1, diapos[1].centerY + Globals.w/20);
boutton2_1.hide();

var boutton2_2 = createButton("Faire apparaître les couleurs");
var demi2_2 = 100;
boutton2_2.position(diapos[1].centerX - demi2_2, diapos[1].centerY + Globals.w/20);
boutton2_2.hide();

var boutton2_3 = createButton("Suite");
var demi2_3 = 30;
boutton2_3.position(diapos[1].centerX - demi2_3, diapos[1].centerY + Globals.w/6);
boutton2_3.hide();


function diapo2_0 () {
    diapos[1].show();
    diapos[1].texte("Le jeu de la vie est un automate cellulaire. Il prend donc place dans un espace, aussi appelé grille, divisé en cellules carrées.", diapos[1].centerX, diapos[1].centerY - width/20);
    boutton2_0.show();
}

aller2_1 = function() {
    diapoActuelle = 1;
    sousDiapo = 1;
    boutton2_0.hide();
    affichageGrille = true;
}

boutton2_0.mouseClicked(aller2_1);


function diapo2_1 () {
    diapos[1].show();
    diapos[1].texte("Chaque cellule de la grille possède un état de zéro ou de 1.", diapos[1].centerX, diapos[1].centerY - width/20);
    boutton2_1.show();
}

aller2_2 = function() {
    diapoActuelle = 1;
    sousDiapo = 2;
    boutton2_1.hide();
}

boutton2_1.mouseClicked(aller2_2);

function diapo2_2 () {
    boutton2_1.hide();
    diapos[1].show();
    diapos[1].texte("Pour que ce soit plus joli, on représente les cellules d'état 1 par des carrés noirs et celles d'états 0 par des carrés blancs.",diapos[1].centerX, diapos[1].centerY - width/20)
    boutton2_2.show();
}

aller2_3 = function() {
    diapoActuelle = 1;
    sousDiapo = 3;
    boutton2_2.hide();
}

boutton2_2.mouseClicked(aller2_3);

function diapo2_3() {
    boutton2_2.hide();
    diapos[1].show();
    diapos[1].texte("On peut dire qu'une cellule noire est vivante et qu'une cellule blanche est morte.", diapos[1].centerX, diapos[1].centerY);
    boutton2_3.show();
}

aller3_0 = function() {
    diapoActuelle = 2;
    sousDiapo = 0;
    boutton2_3.hide();
}

boutton2_3.mouseClicked(aller3_0);

let diapos2 = [diapo2_0, diapo2_1, diapo2_2, diapo2_3];
fonctionsDiapos.push(diapos2);