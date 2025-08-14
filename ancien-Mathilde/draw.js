function draw() {
  // print(frameRate());

  background(200);

  afficherGrille();
  if (mode == 4) {
    if (!jeuCommence) {
      debutDuJeu();
    } else {
      classement();
      classementParties();
      if (dominance()) {
        if (!finAtteinte) {
          gagnant = maximal();
          colorMode(HSB, 360, 100, 100);
          for (let i = 0; i < 300; i++) {
            snowflakes.push(new Snowflake(color(joueurCouleur[gagnant])));
          }
          colorMode(RGB, 255, 255, 255, 255);
          finAtteinte = true;
        }
        finDuJeu();
        modeIteration = true;
        modeModification = false;
        modificationCellules = false;
      } 
      if (modeIteration && !finAtteinte) {
        transitionGrille();
        afficherNomSouris();
        modificationCellules = false;
        dragging = true;
        if (nbGenerations % nbIterationsMax == 0) {
          joueursAFaireJouer = [];
          for(i = 0; i < nbJoueurs; i++) {
            joueursAFaireJouer.push(i);
          }
          joueurActuel = joueursAFaireJouer[Math.floor(Math.random()*joueursAFaireJouer.length)];
          modeIteration = false;
          modeModificationTemps = millis();
          tourCommence = false;
          modeModification = true;
        }
      }
      if (modeModification) {
        if (toursJoues == nbTours) {
          if (!finAtteinte) {
            gagnant = maximal();
            colorMode(HSB, 360, 100, 100);
            for (let i = 0; i < 300; i++) {
              snowflakes.push(new Snowflake((color(joueurCouleur[gagnant]))));
            }
            colorMode(RGB, 255, 255, 255, 255);

            finAtteinte = true;
          }
          finDuJeu();

        } else {
          if (!tourCommence) {
            debutDuTour();
          } else {
            tempsRestant();
            updateIcones();
            if(keyIsDown(32)) {
              modificationCellules = false;
              dragging = true;
            } else {
              modificationCellules = true;
              dragging = false;
            }
            if (millis() - modeModificationTemps >= tempsJeu) {
              clearIcones();
              clearTempsRestant();
        
              if (joueursAFaireJouer.length == 1) {
                modeIteration = true;
                modeModification = false;
                modificationCellules = false;
                toursJoues++;
              } else {
                joueursAFaireJouer.splice(joueursAFaireJouer.indexOf(joueurActuel),1);
                joueurActuel = joueursAFaireJouer[Math.floor(Math.random()*joueursAFaireJouer.length)];
                modeModificationTemps = millis();
                tourCommence = false;
                modeModification = true;
              }
            }
          }
        }
      }
    }
    afficherEtampe(configurations[configActuelle]);
  } else {
    if (afficherImporterConfiguration === true) {
      importationBoite.show();
      exportationBoite.hide();
    } else if (afficherExporterConfiguration === true) {
      exportationBoite.show();
      importationBoite.hide();
    } else {
      importationBoite.hide();
      exportationBoite.hide();
      if (transitionActif === true) {
        if ((millis() - transitionActifTemps) / 1000 >= 1 / transitionVitesse) {
          transitionGrille();
          transitionActifTemps = millis();
        }
      }
    }
    actionGrille();
  }
  /*
    x = x + 1;
    background(55,128,192);
    Grilles();
    stroke(50,255,100);
    circle(1.3*x,x,100);
    fonctionsDiapos[diapoActuelle][sousDiapo]();
  */
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  Globals.w = windowWidth;
  haut = Globals.w * 9 / 16;
  for (var i = 0; i < diapos.length; i++) {
    diapos[i].largeur = Globals.w / 2;
    diapos[i].hauteur = haut / 2;
    diapos[i].x = (Globals.w - diapos[i].largeur) / 2;
    diapos[i].y = (height - diapos[i].hauteur) / 2;
    diapos[i].centerX = diapos[i].x + diapos[i].largeur / 2;
    diapos[i].centerY = diapos[i].y + diapos[i].hauteur / 2;
  }

  bouton1_0.position(diapos[0].centerX - demi1_0, diapos[0].centerY + Globals.w / 5);
  bouton2_0.position(diapos[1].centerX - demi2_0, diapos[1].centerY + Globals.w / 20);
  bouton2_1.position(diapos[1].centerX - demi2_0, diapos[1].centerY + width / 20);
  bouton2_2.position(diapos[1].centerX - demi2_1, diapos[1].centerY + Globals.w / 20);
  bouton2_3.position(diapos[1].centerX - demi2_3, diapos[1].centerY + Globals.w / 6);
  bouton3_0.position(diapos[2].centerX - demi3_0, diapos[2].centerY + Globals.w / 10);
  bouton3_1.position(diapos[2].centerX - demi3_1, diapos[2].centerY + Globals.w / 6);
  bouton4_0.position(diapos[3].centerX - demi4_0, diapos[3].centerY + Globals.w / 15);
  bouton4_1.position(diapos[3].centerX - demi4_1, diapos[3].centerY + Globals.w / 10);
  bouton4_2.position(diapos[3].centerX - demi4_2, diapos[3].centerY + Globals.w / 10);
  bouton4_3.position(diapos[3].centerX - demi4_3, diapos[3].centerY + Globals.w / 10);
  bouton4_4.position(diapos[3].centerX - demi4_4, diapos[3].centerY + Globals.w / 6);
  bouton5_0.position(diapos[4].centerX - demi5_0, diapos[4].centerY + Globals.w / 10);
  bouton6_0.position(diapos[5].centerX - Globals.w / 6, diapos[5].centerY - Globals.w / 8.5);
  sliderWidth = 0.2 * Globals.w;
  sliderNbJoueurs.position(diapos[6].centerX - sliderWidth / 2, diapos[6].centerY + 0.07 * Globals.w);
  sliderNbJoueurs.style('width', sliderWidth + 'px');
  bouton_nouvellePartie.position(diapos[6].centerX - demi_nouvellePartie - Globals.w / 12, diapos[6].centerY + Globals.w / 15);
  bouton_rejouer.position(diapos[6].centerX - demi_rejouer + Globals.w / 12, diapos[6].centerY + Globals.w / 15);
}
