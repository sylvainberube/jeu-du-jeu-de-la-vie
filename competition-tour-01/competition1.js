let nbJoueurs = 4;
let joueurNom = [];
let joueurCouleur = [];
joueurNom = ["Mathilde", "Sylvain", "Samuel", "Thomas"];  // Joueurs 1 et 2
joueurCouleur = [[0, 100, 75], [72, 100, 75], [144, 100, 75], [210, 100, 75]];

const accueil = new diapo(Globals.w / 2, haut / 2);

let titre = createDiv("Jeu du jeu de la vie (prototype 002)");
accueil.ajouterTitre(titre);
titre.style('top', '20%');

let noms = createDiv("(Mathilde Poulin et Sylvain Bérubé)");
noms.style('top', '28%');
accueil.ajouterTexte(noms);

let texteTester = createDiv("Merci de tester ce prototype! "
            + "Vous pouvez nous envoyer vos commentaires à sylvain.berube@usherbrooke.ca.");
texteTester.style('top', '38%');
accueil.ajouterTexte(texteTester);

let sliderNbJoueurs = createSlider(2, 10, 4, 1);
sliderWidth = 0.2 * Globals.w;
sliderNbJoueurs.style('width', sliderWidth + 'px');
sliderNbJoueurs.style('top', '72%');
accueil.ajouterElement(sliderNbJoueurs);

let conteneurJoueursAccueil = createDiv('');
conteneurJoueursAccueil.style('top', '55%');
conteneurJoueursAccueil.addClass('conteneur-joueurs')
accueil.ajouterElement(conteneurJoueursAccueil);

let joueursAccueil = [];
let joueursCouleursAccueil = [];
let joueursNomsAccueil = [];

for (i = 0; i < nbJoueurs; i++) {
    let joueur = createDiv('');
    joueur.addClass('joueur');
    joueur.parent(conteneurJoueursAccueil);
    joueursAccueil.push(joueur);

    let nomDuJoueur = createInput(' joueur ' + str(i+1));
    nomDuJoueur.style('width', '100px')
    nomDuJoueur.parent(joueursAccueil[i]);
    joueursNomsAccueil.push(nomDuJoueur);

    colorMode(HSB, 360, 100, 100);
    let couleurDuJoueur = createColorPicker(color((Math.floor(i/5)*36 + 2*36*i)%360, 100, 75));
    couleurDuJoueur.parent(joueursAccueil[i]);
    joueursCouleursAccueil.push(couleurDuJoueur);
    colorMode(RGB, 255, 255, 255);
}

let texteNbJoueurs = createDiv("Nombre de joueurs : " + str(sliderNbJoueurs.value()));
texteNbJoueurs.style('top', '67%');
accueil.ajouterTexte(texteNbJoueurs);

let bouton_accueil = createButton("Commencer");
bouton_accueil.style('top', '85%');
accueil.ajouterElement(bouton_accueil);

function changementNbJoueurs() {
    if (sliderNbJoueurs.value() > nbJoueurs) {
        for(i = nbJoueurs; i < sliderNbJoueurs.value(); i++) {
            let joueur = createDiv('');
            joueur.addClass('joueur');
            joueur.parent(conteneurJoueursAccueil);
            joueursAccueil.push(joueur);

            let nomDuJoueur = createInput(' joueur ' + str(i+1));
            nomDuJoueur.style('width', '100px')
            nomDuJoueur.parent(joueursAccueil[i]);
            joueursNomsAccueil.push(nomDuJoueur);

            colorMode(HSB, 360, 100, 100);
            let couleurDuJoueur = createColorPicker(color((Math.floor(i/5)*36 + 2*36*i)%360, 100, 75));
            couleurDuJoueur.parent(joueursAccueil[i]);
            joueursCouleursAccueil.push(couleurDuJoueur);
            colorMode(RGB, 255, 255, 255);
        }
    } else if (sliderNbJoueurs.value() < nbJoueurs) {
        for(i = nbJoueurs - 1; i >= sliderNbJoueurs.value(); i --) {
            joueursAccueil[i].remove();
            joueursAccueil[i].hide();
            joueursAccueil.pop();
            joueursCouleursAccueil.pop();
            joueursNomsAccueil.pop();
        }
    }
    nbJoueurs = sliderNbJoueurs.value();
}

sliderNbJoueurs.changed(changementNbJoueurs);




const slideDebutTour = new diapo(Globals.w / 2, haut / 2);

let bouton_commencer = createButton("Commencer");
bouton_commencer.style('top', '75%');
slideDebutTour.ajouterElement(bouton_commencer);

let texteDebutTour = createDiv("C'est le tour de");
texteDebutTour.style('top', '25%');
slideDebutTour.ajouterTitre(texteDebutTour);



const diapoFinDePartie = new diapo(Globals.w/2, haut/2);

let bouton_nouvellePartie = createButton("Nouvelle partie");
bouton_nouvellePartie.style('top', '75%');
bouton_nouvellePartie.style('left', '33%');
diapoFinDePartie.ajouterElement(bouton_nouvellePartie);

let bouton_rejouer = createButton("Rejouer");
bouton_rejouer.style('top', '75%');
bouton_rejouer.style('left', '66%');
diapoFinDePartie.ajouterElement(bouton_rejouer);

let texteGagnant = createDiv('');
texteGagnant.style('top', '25%');
diapoFinDePartie.ajouterTitre(texteGagnant);

let texteRejouer = createDiv("Envie d'une autre partie?");
texteRejouer.style('top', '55%');
diapoFinDePartie.ajouterTexte(texteRejouer);

function initialiserGrilleCompetition1() {
    grille = creerTableau2D(grilleNbColonnes, grilleNbLignes);
    for (let i = 1; i < grilleNbColonnes - 1; i++) {
        for (let j = 1; j < grilleNbLignes - 1; j++) {
            if (Math.random() <= 0.375) {
                grille[i][j] = Math.floor(1 + nbJoueurs * Math.random());
            }
        }

}
}

function dominance() {
    let comptes = compteCellules();
    let total = 0;
    for (i =0; i < comptes.length; i++) {
        total += comptes[i];
    }
    if (total == 0) {
        total ++;
    }
    let maximum = Math.max(...comptes);
    if (maximum/total >= 0.8) {
        return true;
    }
    return false;
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function maximal() {
    comptes = []
    for (let i = 0; i < nbJoueurs; i++) {
        comptes.push(0);
    }
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            if (grille[i][j] > 0) {
                comptes[grille[i][j] - 1]++;
            }
        }
    }
    max = indexOfMax(comptes);
    return max;
}

function compteCellules() {
    comptes = []
    for (let i = 0; i < nbJoueurs; i++) {
        comptes.push(0);
    }
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            if (grille[i][j] > 0) {
                comptes[grille[i][j] - 1]++;
            }
        }
    }
    return comptes;
}

function debutDuJeu() {
    if (!jeuCommence) {
        diapos[6].show();
        diapos[6].titre("Jeu du jeu de la vie (prototype 001)", diapos[6].centerX, diapos[6].centerY - 0.1 * Globals.w);
        diapos[6].texte("(Mathilde Poulin et Sylvain Bérubé)", diapos[6].centerX, diapos[6].centerY - 0.07 * Globals.w);
        diapos[6].texte("Merci de tester ce tout premier prototype! "
            + "Envoyez vos commentaires à <sylvain.berube@usherbrooke.ca>.",
            diapos[6].centerX, diapos[6].centerY);
        diapos[6].texte("Nombre de joueurs : " + sliderNbJoueurs.value(), diapos[6].centerX, diapos[6].centerY + 0.06 * Globals.w);
        sliderNbJoueurs.show();
        bouton_accueil.show();
    }
}

function debutDuTour() {
    modificationCellules = false;
    colorMode(HSB, 360, 100, 100);
    slideDebutTour.show();
    let couleur = hsbToHsl(joueurCouleur[joueurActuel]);
    texteDebutTour.style('color', 'hsl('+str(couleur[0])+', ' + str(couleur[1]) + '%, ' + str(couleur[2]) + '%)');
    texteDebutTour.html("C'est le tour de " + joueurNom[joueurActuel]);
    colorMode(RGB, 255, 255, 255, 255);
}

function finDuJeu() {
    colorMode(HSB, 360, 100, 100);
    diapoFinDePartie.show();
    let couleur = hsbToHsl(joueurCouleur[gagnant]);
   texteGagnant.style('color', 'hsl('+str(couleur[0])+', ' + str(couleur[1]) + '%, ' + str(couleur[2]) + '%)');
    texteGagnant.html(joueurNom[gagnant] + " a gagné!");

    for (let flake of snowflakes) {
        flake.update(temps / 20);
        flake.display();
        if (flake.posY > height) {
            const index = snowflakes.indexOf(flake);
            snowflakes.splice(index, 1);
        }
    }
    temps++;
    colorMode(RGB, 255, 255, 255, 255);

    clearClassementJoueurs();
}

let encadreTempsRestant = createDiv();
encadreTempsRestant.addClass('encadre-temps-restant');

let tourActuel = createDiv('Tour ' + str(toursJoues + 1));
tourActuel.addClass('tour');
tourActuel.parent(encadreTempsRestant);

interieurTempsRestant = createDiv('petit test');
interieurTempsRestant.addClass('interieur-temps-restant');
encadreTempsRestant.child(interieurTempsRestant);

encadreTempsRestant.style('visibility', 'hidden');

function tempsRestant() {
    rectMode(CENTER);
    noStroke();
    fill(255, 150);
    rect(diapos[6].centerX, 60, width/3, 120);
    textSize(width/50);
    fill(0);
    noStroke();
    let tempsRest = ((tempsJeu - (millis() - modeModificationTemps))/1000).toFixed(1);
    text("Il reste " + tempsRest + " s.", diapos[6].centerX,60);

    rectMode(CORNER)
}

function clearTempsRestant() {
    encadreTempsRestant.style('visibility', 'hidden');
}

let conteneurClassementJoueurs = createDiv();
conteneurClassementJoueurs.addClass('conteneur-classement-joueurs');

let titreClassementJoueur = createDiv('Nombre de cellules');
titreClassementJoueur.addClass('titre-classement-joueurs');
conteneurClassementJoueurs.child(titreClassementJoueur); 

let joueursDansClassement = [];

function initialiserJoueursDansClassement() {
for (i = 0; i < nbJoueurs; i++) {
    let nouveauJoueur = createDiv(str(joueurNom[i]));
    conteneurClassementJoueurs.child(nouveauJoueur);
    nouveauJoueur.addClass('item-classement-joueurs')
    joueursDansClassement.push(nouveauJoueur);
}
}

function clearJoueursDansClassement() {
    for (joueur of joueursDansClassement) {
       joueur.remove();
    }
    joueursDansClassement = [];
}

conteneurClassementJoueurs.style('visibility', 'hidden');

function classement() {
    let comptes = compteCellules();
    conteneurClassementJoueurs.style('visibility', 'visible');

    for (let i=0; i < nbJoueurs; i ++) {
        index = indexOfMax(comptes);
        classe = i+1;
        let couleur = hsbToHsl(joueurCouleur[index]);
        joueursDansClassement[index].style('color', 'hsl('+str(couleur[0])+', ' + str(couleur[1]) + '%, ' + str(couleur[2]) + '%)');
        joueursDansClassement[index].style('order', str(i));
        joueursDansClassement[index].html(str(comptes[index]) + ' - ' + str(joueurNom[index]));
        comptes[index] = -1;

        if (i == nbJoueurs -1) {
            joueursDansClassement[index].style('border-radius', '0px 0px 0px 10px');
        } else {
            joueursDansClassement[index].style('border-radius', '0px');
        }

    }
    
}

function clearClassementJoueurs() {
    conteneurClassementJoueurs.style('visibility', 'hidden');
}


let conteneurClassementPartie = createDiv();
conteneurClassementPartie.addClass('conteneur-classement-parties');

let joueursDansParties = [];

let titreClassementParties = createDiv('Parties gagnées');
titreClassementParties.addClass('titre-classement-parties');
titreClassementParties.style('order', '-1')
conteneurClassementPartie.child(titreClassementParties);

conteneurClassementPartie.style('visibility', 'hidden');

function initialiserJoueursDansParties() {
    for (i = 0; i < nbJoueurs; i++){
        let nouveauJoueur = createDiv();
        nouveauJoueur.addClass('item-classement-parties');
        conteneurClassementPartie.child(nouveauJoueur);
        joueursDansParties.push(nouveauJoueur);
    }
}

function classementParties() {
    maxGagnees = Math.max(...partiesGagnees);
    if (maxGagnees > 0) {
        conteneurClassementPartie.style('visibility', 'visible');
        let partiesManips = []

        for ( let i =0; i < nbJoueurs; i++) {
            partiesManips.push(partiesGagnees[i]);
        }
        for (i=0; i < nbJoueurs; i ++) {
            index = indexOfMax(partiesManips);
            joueursDansParties[index].style('order', str(i));
            joueursDansParties[index].html(str(partiesManips[index]) + ' - ' + joueurNom[index]);
            partiesManips[index] = -1;

             if (i == nbJoueurs -1) {
            joueursDansParties[index].style('border-radius', '0px 0px 10px 0px');
            } else {
            joueursDansParties[index].style('border-radius', '0px');
            }
        }
    }
}

function clearClassementParties() {
    for (joueur of joueursDansParties) {
        joueur.remove();
    }
    joueursDansParties = [];
    conteneurClassementPartie.style('visibility', 'hidden');
}

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h,s, l];
}

const hslToHsb = ([h, s, l]) => {
  const b = l + (s / 100) * Math.min(l, 100 - l);
  s = b === 0 ? 0 : 2 * (1 - l / b) * 100;
  return [h, s, b];
};

const hsbToHsl = ([h, s, b]) => {
  const l = (b / 100) * (100 - s / 2);
  s = l === 0 || l === 1 ? 0 : ((b - l) / Math.min(l, 100 - l)) * 100;
  return [h, s, l];
};

function commencerJeu() {
    jeuCommence = true;
    accueil.hide();
    joueurNom = [];
    joueurCouleur = [];
    nbJoueurs = sliderNbJoueurs.value();
    for (let i = 1; i <= nbJoueurs; i++) {
        joueurNom.push("Joueur" + i);
        joueurCouleur.push([(i - 1) * 360 / nbJoueurs, 100, 80]);
    }
    initialiserGrilleCompetition1();
    initialiserJoueursDansClassement();
    initialiserJoueursDansParties();
    joueurNom = [];
    joueurCouleur = [];

    for(i =0; i < nbJoueurs; i++) {
        joueurNom.push(joueursNomsAccueil[i].value());
        couleur = joueursCouleursAccueil[i].value();
        joueurCouleur.push(hslToHsb(hexToHSL(couleur)));
    }

    for (i = 0; i < nbJoueurs; i++) {
        partiesGagnees.push(0);
    }
}

function commencerTour() {
    tourCommence = true;
    slideDebutTour.hide();
    modeModification = true;
    modeIteration = false;
    modificationCellules = true;
    modeModificationTemps = millis();
}

function rejouer() {
    partiesGagnees[gagnant] ++;
    jeuCommence = true;
    diapoFinDePartie.hide();

     currentTime = 0;
    snowflakes = []

    nbGenerations = 0;
    modeIteration = true;
    modeModification = false;
    modeModificationTemps = 0;
    planeur = false;
    joueurActuel = 0;
    tourCommence = false;
    toursJoues = 0;
    finAtteinte = false;
    initialiserGrilleCompetition1();
}

function nouvellePartie() {
    jeuCommence = false;
    diapoFinDePartie.hide();

    currentTime = 0;
    snowflakes = []

    nbGenerations = 0;
    modeIteration = true;
    modeModification = false;
    modeModificationTemps = 0;
    planeur = false;
    joueurActuel = 0;
    tourCommence = false;
    toursJoues = 0;
    finAtteinte = false;
    initialiserGrilleCompetition1();
    clearJoueursDansClassement();
    initialiserJoueursDansParties();
    clearClassementParties()

    partiesGagnees = [];
}

bouton_accueil.mouseClicked(commencerJeu);

bouton_commencer.mouseClicked(commencerTour);

function afficherNomSouris() {
    let [cellX, cellY] = cellMouse();
    if (cellX < 0 || cellX >= grilleNbColonnes || cellY < 0 || cellY >= grilleNbLignes) {
        return;
    }
    let joueur = grille[cellX][cellY];
    if (joueur === 0) {
        return;
    }
    push();
    colorMode(HSB, 360, 100, 100);
    textSize(64);
    let c = color(joueurCouleur[joueur-1]);
    colorMode(RGB, 255, 255, 255, 255);
    stroke(0,0,0,185);
    strokeWeight(2);
    fill(red(c), green(c), blue(c), 185);
    textAlign(CENTER, CENTER); text(joueurNom[joueur-1], mouseX, mouseY - 20);
    pop();
}
bouton_rejouer.mouseClicked(rejouer);

bouton_nouvellePartie.mouseClicked(nouvellePartie);

let conteneurBouttonRecentrer = createDiv();
conteneurBouttonRecentrer.addClass('conteneur-bouton-recentrer');

let iconeBouttonRecentrer = createImg('Images/recentrer.png');
iconeBouttonRecentrer.addClass('icone-bouton-recentrer')
iconeBouttonRecentrer.parent(conteneurBouttonRecentrer);

iconeBouttonRecentrer.mousePressed(centrerGrille);
