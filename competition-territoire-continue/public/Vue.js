// const Grille = require('./Grille');

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

        this.couleursEtats = {
            0: color(0, 0, 90),
        };
        for (let k = 1; k <= 20; k++) {
            this.couleursEtats[k] = color(20 * k, 100, 90);
        }
        this.couleursTerritoire = {
            0: color(0, 0, 95),
        };
        for (let k = 1; k <= 20; k++) {
            this.couleursTerritoire[k] = color(20 * k, 20, 100);
        }

        this.couleurBordure = color(0, 0, 100);  // couleur de la bordure de la grille
        this.epaisseurBordure = 1;              // épaisseur de la bordure de la grille
        this.couleurFond = color(0, 0, 20);  // couleur de fond à l'extérieur de la grille
        this.etatJeu = "enMarche"           //État actuel du jeu (chancge selon ce qu'il y a à afficher)

        this.controleur = null;

        // Affichage du classement
        this.classement = {};
        this.classementJoueursDiv;
        this.titreClassementJoueurDiv;
        this.lignesJoueursDiv = [];
        this.initialiserClassement()

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
        this.initialiserIconesMotifs();
        this.listeNomsMotifs;
        this.listeNbRotations;
        this.nomAIndexIcones;

        //Motifs
        this.rotationMotifs = 0; // 0=0, 1=90, 2=180, 3=270
        this.modeInterraction = "celluleUnique";
    }

    // Associer le contrôleur à la vue
    associerControleur(controleur) {
        this.controleur = controleur;
    }

    afficher() {
        switch (this.etatJeu) {
            case ("enMarche"):
                this.afficherGrille();
                this.afficherMotif(mouseX, mouseY, motifs[this.modeInterraction]);
                this.afficherClassementJoueurs(this.classement);
                break;
        }
    }

    initialisationGlobale() {
        this.initialiserClassement;
        this.initialiserIconesMotifs;
    }

    afficherGrille() {
        stroke(240);
        strokeWeight(1);
        stroke(this.couleurBordure);
        strokeWeight(this.epaisseurBordure);

        const tailleAffichee = this.tailleCellule * this.zoom;
        for (let i = 0; i < this.colonnes; i++) {
            for (let j = 0; j < this.lignes; j++) {
                if (this.grille[i][j] === 0) {
                    fill(this.couleursTerritoire[this.grilleTerritoire[i][j]]);
                } else {
                    fill(this.couleursEtats[this.grille[i][j]]);
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

        this.titreClassementJoueurDiv = createDiv('Plus grands territoires');
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
            ligneDiv.style('background', `hsv(${joueur.etat*20}, ${20}%, ${100}%)`);
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


    initialiserIconesMotifs() {
        this.conteneurIconesMotifsDiv = createDiv();
        this.conteneurIconesMotifsDiv.addClass('conteneur-icones-etampes');
        // this.conteneurIconesMotifsDiv.hide();

        this.listeNomsMotifs = [];

        this.iconeMotifPlaneurImg = createImg('images/motifPlaneur.png');
        this.iconeMotifPlaneurImg.style('order', '0');
        this.iconeMotifPlaneurImg.addClass('icone-etampe');
        this.listeNomsMotifs.push('planeur');

        this.iconeMotifLWSSImg = createImg('images/motifLWSS.png');
        this.iconeMotifLWSSImg.style('order', '1');
        this.iconeMotifLWSSImg.addClass('icone-etampe');
        this.listeNomsMotifs.push('lwss');

        this.iconeMotifMWSSImg = createImg('images/motifLWSS.png');
        this.iconeMotifMWSSImg.style('order', '2');
        this.iconeMotifMWSSImg.addClass('icone-etampe');
        this.listeNomsMotifs.push('mwss');

        this.iconeMotifHWSSImg = createImg('images/motifHWSS.png');
        this.iconeMotifHWSSImg.style('order', '3');
        this.iconeMotifHWSSImg.addClass('icone-etampe');
        this.listeNomsMotifs.push('hwss');

    this.iconeMotifPixelImg = createImg('images/iconePixel.png');
    this.iconeMotifPixelImg.style('order', '4');
    this.iconeMotifPixelImg.addClass('icone-etampe');
    this.iconeMotifPixelImg.style('background-color', 'var(--blanc)');
    this.listeNomsMotifs.push('celluleUnique');

    this.iconeAleatoireImg = createImg('images/iconeAleatoire.png');
    this.iconeAleatoireImg.style('order', '5');
    this.iconeAleatoireImg.addClass('icone-etampe');
    this.iconeAleatoireImg.style('background-color', 'var(--beige)');
    this.listeNomsMotifs.push('random');

    //Important que la rotation reste en dernier (parce qu'on ne peut pas la sélectionner)

    this.iconeRotationMotifImg = createImg('images/iconeRotation.png');
    this.iconeRotationMotifImg.style('order', '6');
    this.iconeRotationMotifImg.addClass('icone-etampe');
    this.iconeRotationMotifImg.style('background-color', 'var(--beige)');
    this.iconeRotationMotifImg.mousePressed(() => this.faireRotation());

    // Regroupement des icones des n motifs dans un tableau (anciennement "icones")
    this.iconesMotifsImg = selectAll('.icone-etampe');

    for (let i = 0; i < this.iconesMotifsImg.length - 1; i++) { // - 1 pour exclure la rotation
        this.iconesMotifsImg[i].style('background-color', 'var(--beige)');
        this.iconesMotifsImg[i].mousePressed(() => this.activerMotif(i));
    }
    
    this.iconeMotifPixelImg.style('background-color', 'var(--blanc)');


    this.conteneurIconesMotifsDiv.child(this.iconeMotifPixelImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifPlaneurImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifLWSSImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifMWSSImg);
    this.conteneurIconesMotifsDiv.child(this.iconeMotifHWSSImg);
    this.conteneurIconesMotifsDiv.child(this.iconeRotationMotifImg);
    this.conteneurIconesMotifsDiv.child(this.iconeAleatoireImg);

    this.listeNbRotations = {
        'planeur' : 0,
        'lwss' : 0,
        'mwss' : 0,
        'hwss' : 0
    }

    this.nomAIndexIcone = {
         'planeur' : 0,
         'lwss' : 1,
         'mwss' : 2,
         'hwss' : 3
    }

}
    

    activerMotif(index) {
        this.reinitialiserIcones();
        /*this.controleur.motifPixelActif = false;
        this.controleur.blocAleatoireActif = false;
        this.controleur.motifActuelIndex = index; */
        this.iconesMotifsImg[index].style('background-color', 'var(--blanc)');
        this.modeInterraction = this.listeNomsMotifs[index];
    }

    afficherMotif(grilleMotif, posX, posY) {
        const tailleAffichee = this.tailleCellule * this.zoom;
        let [celluleLigne, celluleColonne] = this.pixelVersCellule(posX, posY);
        let c1 = color(0, 0, 0, 0.90);
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

    faireRotation() {
        this.listeNbRotations[this.modeInterraction] = (this.listeNbRotations[this.modeInterraction] + 1)%4;
        this.iconesMotifsImg[this.nomAIndexIcone[this.modeInterraction]].style('transform', 'rotate(-' + str(this.listeNbRotations[this.modeInterraction]*90) + 'deg)');
    }


    reinitialiserIcones() {
        this.iconeMotifPixelImg.style('background-color', 'var(--beige)');
        this.iconeAleatoireImg.style('background-color', 'var(--beige)');
        for (let i = 0; i < this.iconesMotifsImg.length; i++) {
            this.iconesMotifsImg[i].style('background-color', 'var(--beige)');
        }
    }
}