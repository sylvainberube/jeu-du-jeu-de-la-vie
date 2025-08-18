class Vue {
    constructor(grille, grilleTerritoire, tailleCellule = 20) {
        this.grille = grille;
        this.grilleTerritoire = grilleTerritoire;
        this.colonnes = grille.length;
        this.lignes = grille[0].length;
        this.tailleCellule = tailleCellule;     // taille d’une cellule à zoom 1
        this.zoom = 1;                          // facteur de zoom
        this.decalageX = 0;                     // décalage horizontal coin supérieur gauche
        this.decalageY = 0;                     // décalage vertical coin supérieur gauche
        this.couleursEtats = {                  // couleurs des états des cellules de la grille
            0: color(0, 0, 95),                  // cellule blanche-grise
            1: color(0, 100, 100)
        };
        this.couleurBordure = color(240);  // couleur de la bordure de la grille
        this.epaisseurBordure = 1;              // épaisseur de la bordure de la grille
        this.couleurFond = color(0, 0, 30);  // couleur de fond à l'extérieur de la grille
        this.etatJeu = "enMarche"           //État actuel du jeu (chancge selon ce qu'il y a à afficher)

        this.controleur = null;

        // Affichage du classement
        this.classement = {};
        this.classementJoueursDiv;
        this.titreClassementJoueurDiv;
        this.lignesJoueursDiv = [];
        this.initialiserClassement();

        // Affichage de l'accueil (initialisation de la partie)
        this.diapoAccueil = new Diapo();
        this.nbJoueursAccueil = 4;
        this.joueursNomsAccueil = [];
        this.joueursCouleursAccueil = [];
        this.titreAccueilDiv;
        this.createursAccueilDiv;
        this.testerAccueilDiv;
        this.nbJoueursAccueilSlider;
        this.conteneurJoueursAccueilDiv;
        this.joueursAccueilDiv = [];
        this.joueursNomsAccueilInput = [];
        this.joueursCouleursAccueilColor = [];
        this.nbJoueursAccueilDiv;
        this.commencerAccueilButton;
        this.initialiserAccueilInterface();

        // Affichage du tour
        this.diapoTour = new Diapo();
        this.commencerTourButton;
        this.texteTourDiv;
        this.initialiserTourInterface();

        // Affichage du temps restant dans un tour pendant les actions d'un joueur
        this.tempsRestantDiv;
        this.tourActuelDiv;
        this.interieurTempsRestantDiv;
        this.initialiserTempsRestant();

        // Affichage du bouton de recentrement de la grille
        this.conteneurCentrerGrilleDiv;
        this.iconeCentrerGrilleImg;
        //this.initialiserCentrerGrille();

        // Affichage de la fin d'une manche
        this.diapoFinManche = new Diapo();
        this.nouvellePartieFinMancheButton;
        this.rejouerFinMancheButton;
        this.gagnantFinMancheDiv;
        this.rejouerFinMancheDiv;
        this.initialiserFinManche();

        // Affichage du classement des joueurs dans la partie
        this.classementJoueursPartieDiv;
        this.titreClassementJoueursPartieDiv;
        this.lignesJoueursPartieDiv = [];
        this.initialiserClassementJoueursPartie();

        // Affichage des icones des motifs
        this.conteneurIconesMotifsDiv;
        this.iconePixelImg;
        this.iconeAleatoireImg;
        this.iconeMotifPlaneurImg;
        this.iconeMotifLWSSImg;
        this.iconeMotifMWSSImg;
        this.iconeMotifHWSSImg;
        this.iconesMotifsImg;
        this.iconeRotationMotifImg;
        //this.initialiserIconesMotifs();
    }

    // Associer le contrôleur à la vue
    associerControleur(controleur) {
        this.controleur = controleur;
    }

    afficher() {
        switch (this.etatJeu) {
            case ("enMarche"):
                this.afficherGrille();
                this.afficherClassementJoueurs(this.classement);
                break;
        }
    }

    afficherGrille() {
        stroke(this.couleurBordure);
        strokeWeight(this.epaisseurBordure);

        const tailleAffichee = this.tailleCellule * this.zoom;
        for (let i = 0; i < this.colonnes; i++) {
            for (let j = 0; j < this.lignes; j++) {
                switch (this.grille[i][j]) {
                    case 0:
                        fill(228);
                        if (this.grilleTerritoire[i][j] === 1) {
                            fill(255, 200, 200)
                        } else if (this.grilleTerritoire[i][j] === 2) {
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

                const x = i * tailleAffichee + this.decalageX;
                const y = j * tailleAffichee + this.decalageY;
                square(x, y, tailleAffichee);
            }
        }
    }


    initialiserClassement() {
        this.classementJoueursDiv = createDiv();
        this.classementJoueursDiv.hide();
        this.classementJoueursDiv.addClass('conteneur-classement-joueurs');

        this.titreClassementJoueurDiv = createDiv('Nombre de cellules');
        this.titreClassementJoueurDiv.addClass('titre-classement-joueurs');
        this.classementJoueursDiv.child(this.titreClassementJoueurDiv);
    }

    afficherClassementJoueurs(classement) {
        // S’il y a plus de joueurs qu’avant, on crée les divs manquants
        while (this.lignesJoueursDiv.length < classement.length) {
            let ligneDiv = createDiv('');  // vide au départ
            ligneDiv.addClass('item-classement-joueurs');
            this.classementJoueursDiv.child(ligneDiv);
            this.lignesJoueursDiv.push(ligneDiv);
        }

        // Mise à jour du contenu et de la couleur
        for (let i = 0; i < classement.length; i++) {
            const joueur = classement[i];
            const ligneDiv = this.lignesJoueursDiv[i];
            ligneDiv.html(`${joueur.nom} (${joueur.points})`);
            // ligneDiv.style('color', `hsl(${joueur.couleur[0]}, ${joueur.couleur[1]}%, ${joueur.couleur[2] / 2}%)`);
        }

        // Si on a trop de lignes (ex: moins de joueurs que la frame précédente)
        for (let i = classement.length; i < this.lignesJoueursDiv.length; i++) {
            // this.lignesJoueurs[i].hide();
        }

        this.classementJoueursDiv.show();
    }

    cacherClassementJoueurs() {
        this.classementJoueursDiv.hide();
    }

    initialiserAccueilInterface() {
        // Formatage du titre
        this.titreAccueilDiv = createDiv();
        this.diapoAccueil.ajouterTitre(this.titreAccueilDiv);
        this.titreAccueilDiv.html("Jeu du jeu de la vie (prototype 002)");

        // Formatage du texte de présentation des créateurs
        this.createursAccueilDiv = createDiv();
        this.diapoAccueil.ajouterTexte(this.createursAccueilDiv);
        this.createursAccueilDiv.html("Créé par Mathilde Poulin et Sylvain Bérubé.");

        // Formatage du texte de remerciement pour tester le prototype
        this.testerAccueilDiv = createDiv();
        let texte = "Merci de tester ce prototype! ";
        texte += "Envoyez vos commentaires vos commentaires à ";
        texte += "<a href=\"mailto:sylvain.berube@usherbrooke.ca\">sylvain.berube@usherbrooke.ca</a>.";
        this.testerAccueilDiv.html(texte);
        this.diapoAccueil.ajouterTexte(this.testerAccueilDiv);

        // Formatage des div des joueurs (nom + couleur)
        this.conteneurJoueursAccueilDiv = createDiv();
        this.conteneurJoueursAccueilDiv.addClass('conteneur-joueurs')
        this.diapoAccueil.ajouterElement(this.conteneurJoueursAccueilDiv);

        for (let i = 0; i < this.nbJoueursAccueil; i++) {
            let joueurAccueilDiv = createDiv("");
            joueurAccueilDiv.addClass("joueur");
            joueurAccueilDiv.parent(this.conteneurJoueursAccueilDiv);
            this.joueursAccueilDiv.push(joueurAccueilDiv);

            let nomJoueurAccueilInput = createInput('Joueur ' + str(i + 1));
            nomJoueurAccueilInput.style('width', '100px')
            nomJoueurAccueilInput.parent(this.joueursAccueilDiv[i]);
            this.joueursNomsAccueilInput.push(nomJoueurAccueilInput);

            let couleurJoueurAccueilColor = createColorPicker(color((Math.floor(i / 5) * 36 + 2 * 36 * i) % 360, 100, 75));
            couleurJoueurAccueilColor.parent(this.joueursAccueilDiv[i]);
            this.joueursCouleursAccueilColor.push(couleurJoueurAccueilColor);
        }

        // Formatage du nombre de joueur
        this.nbJoueursAccueilDiv = createDiv();
        this.nbJoueursAccueilDiv.html("Nombre de joueurs : " + str(this.nbJoueursAccueil));
        this.diapoAccueil.ajouterTexte(this.nbJoueursAccueilDiv);

        // Formatage du slider
        this.nbJoueursAccueilSlider = createSlider(2, 10, this.nbJoueursAccueil, 1);
        let sliderWidth = 0.2 * 1000;
        this.nbJoueursAccueilSlider.style('width', sliderWidth + 'px');
        this.diapoAccueil.ajouterElement(this.nbJoueursAccueilSlider);

        // Formatage du bouton « Commencer »
        this.commencerAccueilButton = createButton();
        this.commencerAccueilButton.html("Commencer une nouvelle partie");
        this.commencerAccueilButton.style('top', '85%');
        this.diapoAccueil.ajouterElement(this.commencerAccueilButton);

        this.joueursNomsAccueil = [];
        this.joueursCouleursAccueil = [];

        for (let i = 0; i < this.nbJoueurs; i++) {
            this.joueursNomsAccueil.push(this.joueursNomsAccueilInput[i].value());
            let couleur = this.joueursCouleursAccueilColor[i].value();
            this.joueursCouleursAccueil.push(this.hexToHSB(couleur));
        }

        // Modifier l'apparence lorsque l'on utilise le slider
        this.nbJoueursAccueilSlider.changed(() => this.changerNbJoueursAccueil());

        // Commencer une partie lorsqu'on clique sur le bouton
        this.commencerAccueilButton.mouseClicked(() => this.commencerPartie());

        this.cacherDiapoAccueil();
    }

    commencerPartie() {
        this.joueursNomsAccueil = [];
        this.joueursCouleursAccueil = [];
        for (let i = 0; i < this.nbJoueursAccueil; i++) {
            this.joueursNomsAccueil.push(this.joueursNomsAccueilInput[i].value());
            let couleur = this.joueursCouleursAccueilColor[i].value();
            this.joueursCouleursAccueil.push(this.hexToHSB(couleur));
        }

        this.controleur.nbJoueurs = this.nbJoueursAccueil;
        this.controleur.joueursNoms = this.joueursNomsAccueil;
        this.controleur.joueursCouleurs = this.joueursCouleursAccueil;
        this.controleur.commencerPartie();
    }

    // Changer le nombre de joueurs via le slider et ajuster les div des joueurs
    changerNbJoueursAccueil() {
        if (this.nbJoueursAccueilSlider.value() > this.nbJoueursAccueil) {
            for (let i = this.nbJoueursAccueil; i < this.nbJoueursAccueilSlider.value(); i++) {
                let joueurAccueilDiv = createDiv('');
                joueurAccueilDiv.addClass('joueur');
                joueurAccueilDiv.parent(this.conteneurJoueursAccueilDiv);
                this.joueursAccueilDiv.push(joueurAccueilDiv);

                let nomDuJoueurAccueilInput = createInput('Joueur ' + str(i + 1));
                nomDuJoueurAccueilInput.style('width', '100px')
                nomDuJoueurAccueilInput.parent(this.joueursAccueilDiv[i]);
                this.joueursNomsAccueilInput.push(nomDuJoueurAccueilInput);

                let couleurJoueurAccueilColor = createColorPicker(color((Math.floor(i / 5) * 36 + 2 * 36 * i) % 360, 100, 75));
                couleurJoueurAccueilColor.parent(this.joueursAccueilDiv[i]);
                this.joueursCouleursAccueilColor.push(couleurJoueurAccueilColor);
            }
        } else if (this.nbJoueursAccueilSlider.value() < this.nbJoueursAccueil) {
            for (let i = this.nbJoueursAccueil - 1; i >= this.nbJoueursAccueilSlider.value(); i--) {
                this.joueursAccueilDiv[i].remove();
                this.joueursAccueilDiv[i].hide();
                this.joueursAccueilDiv.pop();
                this.joueursCouleursAccueilColor.pop();
                this.joueursNomsAccueilInput.pop();
            }
        }
        this.nbJoueursAccueil = this.nbJoueursAccueilSlider.value();
        this.nbJoueursAccueilDiv.html("Nombre de joueurs : " + str(this.nbJoueursAccueilSlider.value()));
    }


    // Convertir la couleur du ColorPicker au format HSB
    hexToHSB(H) {
        // Convertir hex vers RGB
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
        // Convertir RGB vers to HSB
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
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
        return [h, s, l * 2];
    }

    // Initialiser l'interface des tours
    initialiserTourInterface() {
        this.texteTourDiv = createDiv("C'est le tour de");
        // this.texteTourDiv.style('top', '25%');
        this.diapoTour.ajouterTitre(this.texteTourDiv);

        this.commencerTourButton = createButton("Commencer");
        // this.commencerTourButton.style('top', '75%');
        this.diapoTour.ajouterElement(this.commencerTourButton);

        this.commencerTourButton.mouseClicked(() => this.commencerTourActionJoueur());

        this.cacherDiapoTour();
    }

    commencerTourActionJoueur() {
        this.controleur.commencerTourActionJoueur();
    }

    initialiserTempsRestant() {
        this.tempsRestantDiv = createDiv();
        this.tempsRestantDiv.addClass('temps-restant-encadre');
        this.tourActuelDiv = createDiv('Tour 0');
        this.tourActuelDiv.addClass('temps-restant-tour');
        this.tempsRestantDiv.child(this.tourActuelDiv);
        this.interieurTempsRestantDiv = createDiv('');
        this.interieurTempsRestantDiv.addClass('temps-restant-interieur');
        this.tempsRestantDiv.child(this.interieurTempsRestantDiv);
        this.tempsRestantDiv.style('display', 'flex');
    }

    // Modifier la couleur d'un état
    modifierCouleurEtat(etat, couleur) {
        this.couleursEtats[etat] = couleur;
    }

    // Obtenir la couleur d'un état
    obtenirCouleurEtat(etat) {
        return this.couleursEtats[etat];
    }

    // Modifier le zoom
    definirZoom(nouveauZoom) {
        this.zoom = Math.min(10, Math.max(0.1, nouveauZoom)); // zoom minimal à 0.1x, zoom maximal à 10x
    }

    // Augmenter le zoom
    augmenterZoom(posX, posY, facteur = 1.15) {
        if (this.zoom * facteur >= 10) facteur = 10 / this.zoom;
        this.definirZoom(this.zoom * facteur);
        this.decalageX = posX - (posX - this.decalageX) * facteur;
        this.decalageY = posY - (posY - this.decalageY) * facteur;
    }

    // Diminuer le zoom
    diminuerZoom(posX = 0, posY = 0, facteur = 1.15) {
        if (this.zoom / facteur <= 0.1) facteur = this.zoom / 0.1;
        this.definirZoom(this.zoom / facteur);
        this.decalageX = posX - (posX - this.decalageX) / facteur;
        this.decalageY = posY - (posY - this.decalageY) / facteur;
    }

    // Décaler la vue (en pixels)
    modifierDecalage(dx, dy) {
        this.decalageX += dx;
        this.decalageY += dy;
    }

    // Centrer la grille
    centrerGrille() {
        let nbLignes = this.grille.lignes;
        let nbColonnes = this.grille.colonnes;

        let min_x = 0;
        let max_x = this.grille.colonnes;
        let min_y = 0;
        let max_y = this.grille.lignes;
        for (let i = 0; i < nbLignes; i++) {
            for (let j = 0; j < nbColonnes; j++) {
                if (this.grille.obtenirEtatCellule(i, j) >= 1) {
                    min_x = i;
                    max_x = i;
                    min_y = j;
                    max_y = j;
                    break;
                }
            }
        }

        for (let i = 0; i < nbLignes; i++) {
            for (let j = 0; j < nbColonnes; j++) {
                let etatCellule = this.grille.obtenirEtatCellule(i, j);
                if (etatCellule >= 1 && j < min_x) {
                    min_x = j
                } else if (etatCellule >= 1 && j > max_x) {
                    max_x = j
                }
                if (etatCellule >= 1 && i < min_y) {
                    min_y = i
                } else if (etatCellule >= 1 && i > max_y) {
                    max_y = i
                }
            }
        }
        let widthMin = windowWidth / (this.tailleCellule * (max_x - min_x + 3));
        let heightMin = windowHeight / (this.tailleCellule * (max_y - min_y + 3));
        this.zoom = Math.min(widthMin, heightMin);
        this.decalageX = (windowWidth - (max_x - min_x + 1) * this.tailleCellule * this.zoom) / 2;
        this.decalageY = (windowHeight - (max_y - min_y + 1) * this.tailleCellule * this.zoom) / 2;
    }


    // Obtenir la cellule associée à un pixel
    pixelVersCellule(posX, posY) {
        const i = floor((posX - this.decalageX) / (this.tailleCellule * this.zoom));
        const j = floor((posY - this.decalageY) / (this.tailleCellule * this.zoom));
        return [i, j];
    }

    // Dessiner la grille
    dessiner() {
        switch (this.grille.typeMonde) {
            case "plat":
                this.dessinerMondePlat();
                break;
            case "torique":
                this.dessinerMondeTorique();
                break;
        }
    }

    dessinerMondePlat() {
        stroke(this.couleurBordure);
        strokeWeight(this.epaisseurBordure);

        const tailleAffichee = this.tailleCellule * this.zoom;
        for (let ligne = -1; ligne <= this.grille.lignes; ligne++) {
            for (let colonne = -1; colonne <= this.grille.colonnes; colonne++) {
                if (ligne == -1 || ligne == this.grille.lignes || colonne == -1 || colonne == this.grille.colonnes) {
                    fill(0, 0, 40);
                } else {
                    const etat = this.grille.obtenirEtatCellule(ligne, colonne);
                    const couleurCellule = this.obtenirCouleurEtat(etat);
                    fill(couleurCellule);
                }
                const x = colonne * tailleAffichee + this.decalageX;
                const y = ligne * tailleAffichee + this.decalageY;

                square(x, y, tailleAffichee);
            }
        }
    }

    dessinerMondeTorique() {
        stroke(this.couleurBordure);
        strokeWeight(this.epaisseurBordure);

        const tailleAffichee = this.tailleCellule * this.zoom;
        for (let ligne = 0; ligne < this.grille.lignes; ligne++) {
            for (let colonne = 0; colonne < this.grille.colonnes; colonne++) {
                if (ligne == -1 || ligne == this.grille.lignes || colonne == -1 || colonne == this.grille.colonnes) {
                    fill(0, 0, 40);
                } else {
                    const etat = this.grille.obtenirEtatCellule(ligne, colonne);
                    const couleurCellule = this.obtenirCouleurEtat(etat);
                    fill(couleurCellule);
                }
                const x = colonne * tailleAffichee + this.decalageX;
                const y = ligne * tailleAffichee + this.decalageY;

                square(x, y, tailleAffichee);
            }
        }
    }

    afficherDiapoAccueil() {
        this.diapoAccueil.afficher();
    }

    cacherDiapoAccueil() {
        this.diapoAccueil.cacher();
    }

    afficherDiapoTour() {
        this.diapoTour.afficher();
    }

    cacherDiapoTour() {
        this.diapoTour.cacher();
    }

    afficherTempsRestant() {
        let tempsRest = this.controleur.phaseActionTemps;
        tempsRest -= (millis() - this.controleur.phaseActionJoueurTemps);
        tempsRest = tempsRest / 1000;
        if (tempsRest > 0) {
            tempsRest = tempsRest.toFixed(1);
        } else {
            tempsRest = 0;
        }
        let texteSeconde = "seconde";
        if (tempsRest >= 2) {
            texteSeconde += "s";
        }
        this.interieurTempsRestantDiv.html('Il reste ' + str(tempsRest) + ' ' + texteSeconde + '.');
        this.tourActuelDiv.html('Tour ' + str(this.controleur.jeuNumeroTour));
    }

    /*initialiserCentrerGrille() {
        this.conteneurRecentrerDiv = createDiv();
        this.conteneurRecentrerDiv.addClass('conteneur-bouton-recentrer');

        this.iconeRecentrerImg = createImg('images/recentrer.png');
        this.iconeRecentrerImg.addClass('icone-bouton-recentrer')
        this.iconeRecentrerImg.parent(this.conteneurRecentrerDiv);

        this.iconeRecentrerImg.mousePressed(() => this.centrerGrille());
    }

    afficherRecentrer() {
        this.conteneurRecentrerDiv.show();
    }*/

    initialiserFinManche() {
        this.nouvellePartieFinMancheButton;
        this.rejouerFinMancheButton;
        this.gagnantFinMancheDiv;
        this.rejouerFinMancheDiv;

        this.gagnantFinMancheDiv = createDiv('');
        // this.gagnantFinMancheDiv.style('top', '25%');
        this.diapoFinManche.ajouterTitre(this.gagnantFinMancheDiv);

        this.rejouerFinMancheDiv = createDiv("Envie d'une autre partie?");
        // this.rejouerFinMancheDiv.style('top', '55%');
        this.diapoFinManche.ajouterTexte(this.rejouerFinMancheDiv);

        this.nouvellePartieFinMancheButton = createButton("Nouvelle partie");
        this.nouvellePartieFinMancheButton.style('top', '75%');
        this.nouvellePartieFinMancheButton.style('left', '33%');
        this.diapoFinManche.ajouterElement(this.nouvellePartieFinMancheButton);

        this.rejouerFinMancheButton = createButton("Rejouer");
        this.rejouerFinMancheButton.style('top', '75%');
        this.rejouerFinMancheButton.style('left', '66%');
        this.diapoFinManche.ajouterElement(this.rejouerFinMancheButton);

        this.nouvellePartieFinMancheButton.mousePressed(() => this.nouvellePartie());
        this.rejouerFinMancheButton.mousePressed(() => this.nouvelleManche());

        this.diapoFinManche.cacher();
    }

    afficherFinManche() {
        this.diapoFinManche.afficher();
    }

    cacherFinManche() {
        this.diapoFinManche.cacher();
    }

    nouvellePartie() {
        this.cacherFinManche();
        this.controleur.accueil();
    }

    nouvelleManche() {
        this.cacherFinManche();
        this.controleur.commencerManche();
    }

    initialiserClassementJoueursPartie() {
        this.classementJoueursPartieDiv = createDiv();
        this.titreClassementJoueursPartieDiv = createDiv('Manches gagnées');

        this.classementJoueursPartieDiv.addClass('conteneur-classement-parties');
        this.titreClassementJoueursPartieDiv.addClass('titre-classement-parties');
        this.titreClassementJoueursPartieDiv.style('order', '-1')
        this.classementJoueursPartieDiv.child(this.titreClassementJoueursPartieDiv);

        this.classementJoueursPartieDiv.hide();
    }

    afficherClassementJoueursPartie(classementPartie) {
        // S’il y a plus de joueurs qu’avant, on crée les divs manquants
        while (this.lignesJoueursPartieDiv.length < classementPartie.length) {
            let ligneDiv = createDiv();  // vide au départ
            ligneDiv.addClass('item-classement-joueurs');
            this.classementJoueursPartieDiv.child(ligneDiv);
            this.lignesJoueursPartieDiv.push(ligneDiv);
        }

        // Mise à jour du contenu et de la couleur
        for (let i = 0; i < classementPartie.length; i++) {
            const joueur = classementPartie[i];
            const ligneDiv = this.lignesJoueursPartieDiv[i];
            ligneDiv.html(`${joueur.nom} (${joueur.manches})`);
            ligneDiv.style('color', `hsl(${joueur.couleur[0]}, ${joueur.couleur[1]}%, ${joueur.couleur[2] / 2}%)`);
        }

        // Si on a trop de lignes (ex: moins de joueurs que la frame précédente)
        for (let i = classementPartie.length; i < this.lignesJoueursPartieDiv.length; i++) {
            this.lignesJoueursPartieDiv[i].hide();
        }

        this.classementJoueursPartieDiv.show();
    }

    cacherClassementJoueursPartie() {
        this.classementJoueursPartieDiv.hide();
    }

    /*initialiserIconesMotifs() {
        this.conteneurIconesMotifsDiv = createDiv();
        this.conteneurIconesMotifsDiv.addClass('conteneur-icones-etampes');
        // this.conteneurIconesMotifsDiv.hide();

        /*this.iconeMotifPlaneurImg = createImg('images/motifPlaneur.png');
        this.iconeMotifPlaneurImg.style('order', '0');
        this.iconeMotifPlaneurImg.addClass('icone-etampe');

        this.iconeMotifLWSSImg = createImg('images/motifLWSS.png');
        this.iconeMotifLWSSImg.style('order', '1');
        this.iconeMotifLWSSImg.addClass('icone-etampe');

        this.iconeMotifMWSSImg = createImg('images/motifLWSS.png');
        this.iconeMotifMWSSImg.style('order', '2');
        this.iconeMotifMWSSImg.addClass('icone-etampe');

        this.iconeMotifHWSSImg = createImg('images/motifHWSS.png');
        this.iconeMotifHWSSImg.style('order', '3');
        this.iconeMotifHWSSImg.addClass('icone-etampe');*/

    // Regroupement des icones des n motifs dans un tableau (anciennement "icones")
    //this.iconesMotifsImg = selectAll('.icone-etampe');

    /*for (let i = 0; i < this.iconesMotifsImg.length; i++) {
        this.iconesMotifsImg[i].style('background-color', 'var(--beige)');
        this.iconesMotifsImg[i].mousePressed(() => this.activerMotif(i));
    }*/

    /*this.iconeRotationMotifImg = createImg('images/iconeRotation.png');
    this.iconeRotationMotifImg.style('order', '4');
    this.iconeRotationMotifImg.addClass('icone-etampe');
    this.iconeRotationMotifImg.style('background-color', 'var(--beige)');
    this.iconeRotationMotifImg.mousePressed(() => this.controleur.activerRotationMotifs());

    this.iconeMotifPixelImg = createImg('images/iconePixel.png');
    this.iconeMotifPixelImg.style('order', '5');
    this.iconeMotifPixelImg.addClass('icone-etampe');
    this.iconeMotifPixelImg.style('background-color', 'var(--blanc)');
    this.iconeMotifPixelImg.mousePressed(() => this.controleur.activerMotifPixel());

    this.iconeAleatoireImg = createImg('images/iconeAleatoire.png');
    this.iconeAleatoireImg.style('order', '6');
    this.iconeAleatoireImg.addClass('icone-etampe');
    this.iconeAleatoireImg.style('background-color', 'var(--beige)');
    this.iconeAleatoireImg.mousePressed(() => this.controleur.activerBlocAleatoire());

    this.conteneurIconesMotifsDiv.child(this.iconeMotifPixelImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifPlaneurImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifLWSSImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifMWSSImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifHWSSImg);
    this.conteneurIconesMotifsDiv.child(this.iconeRotationMotifImg);
    this.conteneurIconesMotifsDiv.child(this.iconeAleatoireImg);
}*/

    activerMotif(index) {
        //this.reinitialiserIcones();
        this.controleur.motifPixelActif = false;
        this.controleur.blocAleatoireActif = false;
        this.controleur.motifActuelIndex = index;
        this.iconesMotifsImg[index].style('background-color', 'var(--blanc)');
    }

    afficherMotif(grilleMotif, posX, posY) {
        const tailleAffichee = this.tailleCellule * this.zoom;
        let [celluleLigne, celluleColonne] = this.pixelVersCellule(posX, posY);
        let c1 = color(this.controleur.joueursCouleurs[this.controleur.joueurTour - 1]);
        c1.setAlpha(0.80);
        let c2 = color(0, 0, 100, 0.90);
        for (let i = 0; i < grilleMotif.length; i++) {
            for (let j = 0; j < grilleMotif[i].length; j++) {
                if (grilleMotif[i][j] == 1) {
                    fill(c1);
                } else {
                    fill(c2);
                }
                square((celluleLigne + i) * tailleAffichee + this.decalageX, (celluleColonne + j) * tailleAffichee + this.decalageY, tailleAffichee);
            }
        }
    }

    /*reinitialiserIcones() {
        this.iconeMotifPixelImg.style('background-color', 'var(--beige)');
        this.iconeAleatoireImg.style('background-color', 'var(--beige)');
        for (let i = 0; i < this.iconesMotifsImg.length; i++) {
            this.iconesMotifsImg[i].style('background-color', 'var(--beige)');
        }
    }*/
}
