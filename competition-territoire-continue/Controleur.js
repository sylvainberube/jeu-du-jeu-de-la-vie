const Grille = require('./Grille');
const Simulateur = require('./Simulateur');

class Controleur {
    constructor(lignes = 60, colonnes = 40, intervalle = 200) {
        this.lignes = lignes;
        this.colonnes = colonnes;

        this.grille = new Grille(lignes, colonnes);
        // this.vue = new Vue(this.grille);
        // this.vue.associerControleur(this);
        this.simulateur = new Simulateur(this.simulateur);

        this.grilleInitiale = Grille.copier(this.grille);

        this.nbGenerations = 0;

        this.intervalle = intervalle; // en ms
        this.derniereMiseAJour = 0;

        this.nbJoueurs = 10;
        this.joueursNoms = [];
        this.joueursCouleurs = [];

        this.etatGlobal = "accueil";   // États possibles : "accueil", "jeu"
        // États du jeu
        // - "accueil"
        // - "partieInitialisation", "partieFin"
        // - "mancheInitialisation", "mancheFin"
        // - "tourAutomatique", "tourInteraction"
        this.etatJeu = "accueil";

        // Suivi de la progression d'une partie, des manches et des tours
        this.jeuNumeroManche = 1;
        this.jeuNumeroTour = 1;
        this.nbToursMax = 3;
        this.nbGenerationsParTour = 250;
        this.nbGenerationsTour = 0;
        this.interactionAutomatique = 0;        // Compteur dans tourAutomatique
        this.joueurTour = 1;                    // Index du joueur dans tourInteraction
        this.phaseActionJoueur = false;
        this.pointsManche = [];                 // Nombre de manches remportées par joueur
        this.phaseActionJoueurTemps;
        this.phaseActionTemps = 8000;

        this.grillePeutEtreDeplace = true;
        this.peutModifierCellule = false;

        // Initialisation des motifs
        this.motifsJson;
        this.motifsComplets;
        this.grillesMotifs;
        // this.motifsJson = loadJSON('motifsCompetition.json', this.initialiserMotifs.bind(this));
        this.motifActuelIndex = null;
        this.blocAleatoireActif = false;
        this.motifPixelActif = true;
        this.rotationMotifs = 0;   // 0=0, 1=90, 2=180, 3=270

        // À enlever ?
        this.modeIteration = true;
        this.modeModification = false;
        this.modeModificationTemps = 0;
        this.etampeActif = false;
        this.nbTours = 1;
        this.joueurActuel = 0;
        this.jeuCommence = false;
        this.tourCommence = false;
        this.toursJoues = 0;
        this.gagnant;
        this.finAtteinte = false;
        this.nbTours = 2;
        this.nbIterationsMax = 10;
        this.tempsJeu = 2000;
        this.partiesGagnees = [];

        this.enMarche = true;
        this.grilleDeplacementEnCours = false;
        this.peutEtreMisEnPause = true;
        this.sourisPrecedente = null;

        // Variables non utilisées
        this.mode = 2;  // 2:Bac à sable, 4:Compétition
        this.etat = "en-marche";
    }

    obtenirIntervalle() {
        return this.intervalle;
    }

    obtenirGrille() {
        return this.grille.getCellules();
    }

    genererGrilleAleatoire(nbJoueurs = 2) {
        this.grille.genererAleatoire(nbJoueurs);
    }

    modifierCellule(celluleLigne, celluleColonne, etat) {
        this.grille.modifierCellule(celluleLigne, celluleColonne, etat);
    }

    gestionDuJeu() {
        background(this.couleurFond());

        if (keyIsDown(UP_ARROW)) {
            this.vue.modifierDecalage(0, -20);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.vue.modifierDecalage(20, 0);
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.vue.modifierDecalage(0, 20);
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.vue.modifierDecalage(-20, 0);
        }


        switch (this.etatJeu) {
            case "accueil":
                this.gestionJeuAccueil();
                break;
            case "partieInitialisation":
                this.gestionJeuPartieInitialisation();
                break;
            case "mancheInitialisation":
                this.gestionJeuMancheInitialisation();
                break;
            case "tourInitialisation":
                this.gestionJeuTourInitialisation();
                break;
            case "tourInteraction":
                this.gestionJeuTourInteraction();
                break;
            case "tourAutomatique":
                this.gestionJeuTourAutomatique();
                break;
            case "tourFin":
                this.gestionJeuTourFin();
                break;
            case "mancheFin":
                this.gestionJeuMancheFin();
                break;
            case "partieFin":
                break;
        }
        /*
        switch (controleur.etatGlobal) {
            case "accueil":
                controleur.dessiner();
                interfaceAccueil.afficher();
                break

            case "jeu":
                interfaceAccueil.cacher();
                // if (!interfaceJeu.visible) interfaceJeu.afficher();
                // controleur.gestionDuJeu();
                controleur.mettreAJour();
        }
        */
    }

    gestionJeuAccueil() {
        this.vue.cacherClassementJoueursPartie();
        this.vue.cacherClassementJoueurs();
        this.vue.dessiner();
        this.vue.afficherDiapoAccueil();
    }

    gestionJeuPartieInitialisation() {
        this.jeuNumeroManche = 1;
        this.pointsManche = Array(this.nbJoueurs).fill(0);
        this.vue.cacherDiapoAccueil();

        this.etatJeu = "mancheInitialisation";
    }

    gestionJeuMancheInitialisation() {
        this.jeuNumeroTour = 1;
        this.joueurTour = 1;                    // Index du joueur dans tourInteraction

        this.grille = Grille.initialiserCompetition(this.lignes, this.colonnes, this.nbJoueurs);
        this.simulateur.grille = this.grille;
        this.vue.grille = this.grille;
        for (let i = 0; i < this.nbJoueurs; i++) {
            this.vue.modifierCouleurEtat(i + 1, this.joueursCouleurs[i]);
        }

        let classementJoueurs = this.obtenirClassementJoueurs();
        this.vue.afficherClassementJoueurs(classementJoueurs);
        let classementJoueursPartie = this.obtenirClassementJoueursPartie();
        this.vue.afficherClassementJoueursPartie(classementJoueursPartie);
        this.vue.dessiner();

        this.etatJeu = "tourInitialisation";
    }

    gestionJeuTourInitialisation() {
        this.nbGenerationsTour = 0;
        this.joueurTour = 1;
        this.phaseActionJoueurTemps = millis();
        this.phaseActionJoueur = false;
        this.etatJeu = "tourInteraction";
        this.vue.dessiner();
    }

    gestionJeuTourAutomatique() {
        this.grillePeutEtreDeplace = true;
        this.peutModifierCellule = false;

        if (this.nbGenerationsTour >= this.nbGenerationsParTour) {
            this.vue.dessiner();
            this.etatJeu = "tourFin";
            return;
        }

        if (!this.calculerGenerationSuivante()) {
            this.vue.dessiner();
            return;
        }

        this.nbGenerationsTour += 1;

        let classementJoueurs = this.obtenirClassementJoueurs();
        this.vue.afficherClassementJoueurs(classementJoueurs);
        let classementJoueursPartie = this.obtenirClassementJoueursPartie();
        this.vue.afficherClassementJoueursPartie(classementJoueursPartie);
        this.verifierFinPartie(classementJoueurs);
        this.vue.dessiner();
    }

    gestionJeuTourInteraction() {
        // Toujours utile?
        this.grillePeutEtreDeplace = false;
        this.peutModifierCellule = false;

        // Afficher le classement des joueurs
        let classementJoueurs = this.obtenirClassementJoueurs();
        this.vue.afficherClassementJoueurs(classementJoueurs);
        let classementJoueursPartie = this.obtenirClassementJoueursPartie();
        this.vue.afficherClassementJoueursPartie(classementJoueursPartie);

        // Dessiner la grille
        this.vue.dessiner();

        // Le joueur peut modifier la grille
        if (this.phaseActionJoueur) {
            this.peutModifierCellule = true;
            this.vue.afficherTempsRestant();
            // Afficher le motif sélectionné (actuel)
            if (this.motifActuelIndex != null) {
                let grilleMotif = this.grillesMotifs[this.motifActuelIndex];
                this.vue.afficherMotif(grilleMotif, mouseX, mouseY);
            }
            if (millis() - this.phaseActionJoueurTemps >= this.phaseActionTemps) {
                if (this.joueurTour == this.nbJoueurs) {
                    this.etatJeu = "tourAutomatique";
                } else {
                    this.joueurTour += 1;
                    this.phaseActionJoueur = false;
                    this.phaseActionJoueurTemps = millis();
                }
            }
        }
        // Affichage de la diapo du tour
        else {
            this.vue.afficherDiapoTour();
            let couleur = this.hsbToHsl(this.joueursCouleurs[this.joueurTour - 1]);
            this.vue.texteTourDiv.style('color', 'hsl(' + str(couleur[0]) + ', ' + str(couleur[1]) + '%, ' + str(couleur[2]) + '%)');
            this.vue.texteTourDiv.html("C'est le tour de " + this.joueursNoms[this.joueurTour - 1]);
        }
    }

    gestionJeuTourFin() {
        this.grillePeutEtreDeplace = true;
        this.peutModifierCellule = false;

        if (this.jeuNumeroTour == this.nbToursMax) {
            this.transitionMancheFin();
        }
        else {
            this.jeuNumeroTour += 1;
            this.phaseActionJoueur = false;
            this.etatJeu = "tourInitialisation";
        }
        this.vue.dessiner();
    }

    gestionJeuMancheFin() {
        let joueurGagnant = this.joueurGagnant();
        let nomGagnant = joueurGagnant.nom;
        let couleurGagnant = joueurGagnant.couleur;
        couleurGagnant = this.hsbToHsl(couleurGagnant);
        this.vue.gagnantFinMancheDiv.style('color', 'hsl(' + str(couleurGagnant[0]) + ', ' + str(couleurGagnant[1]) + '%, ' + str(couleurGagnant[2]) + '%)');
        this.vue.gagnantFinMancheDiv.html(nomGagnant + " a gagné!");

        this.vue.dessiner();
        this.vue.afficherFinManche();
    }

    joueurGagnant() {
        let classementJoueurs = this.obtenirClassementJoueurs();
        return classementJoueurs[0];
    }

    idJoueurGagnant() {
        let pointsParId = this.grille.compterCellulesParEtat(); // ex: {0: 150, 1: 97, ...}
        let pointageMax = pointsParId[1];
        let maxIndex = 0;

        for (let i = 1; i < this.nbJoueurs; i++) {
            if (pointsParId[i + 1] > pointageMax) {
                maxIndex = i;
                pointageMax = pointsParId[i + 1];
            }
        }

        return maxIndex;
    }

    calculerGenerationSuivante() {
        this.simulateur.calculerGenerationSuivante(this.nbJoueurs);
        /*
        if (this.enMarche && (millis() - this.derniereMiseAJour) > this.intervalle) {
            this.simulateur.calculerGenerationSuivante(this.nbJoueurs);
            this.nbGenerations += 1;
            this.derniereMiseAJour = millis();
            return true;
        } else {
            return false;
        }
        */
    }


    // [P] Modifier l'état de la simulation (pause / en marche)
    // [D] Avancer d'une génération
    // [M] Modifier une cellule
    // [I] Réinitialiser la grille
    gererKeyPressed() {
        switch (key) {
            case 'p':
            case 'P':
                // this.basculerPause();
                break;
            case 'd':
            case 'D':
                /* if (!this.enMarche) {
                    this.simulateur.calculerGenerationSuivante(this.nbJoueurs);
                }
                */
                break
            case 'm':
            case 'M':
                /*
                if (this.peutModifierCellule) {
                    this.peutModifierCellule = false;
                    this.grillePeutEtreDeplace = true;
                } else {
                    this.peutModifierCellule = true;
                    this.grillePeutEtreDeplace = false;
                }
                */
                break;
            case 'I':
            case 'i':
                // this.reinitialiserGrille();
                break;
        }
    }

    gererMouseWheel(delta) {
        if (delta < 0) {
            this.vue.augmenterZoom(mouseX, mouseY);
        } else if (delta > 0) {
            this.vue.diminuerZoom(mouseX, mouseY);
        }
    }

    gererMousePressed() {
        // if (this.grillePeutEtreDeplace) controleur.debuterDeplacementGrille(mouseX, mouseY);

        if (this.peutModifierCellule && this.motifActuelIndex != null) {
            let [celluleColonne, celluleLigne] = this.vue.pixelVersCellule(mouseX, mouseY);
            let grilleMotif = this.grillesMotifs[this.motifActuelIndex];
            for (let j = 0; j < grilleMotif.length; j++) {
                for (let i = 0; i < grilleMotif[j].length; i++) {
                    let etat = 0;
                    if (grilleMotif[j][i] == 1) {
                        etat = this.joueurTour;
                    }
                    this.grille.modifierCellule(celluleLigne + i, celluleColonne + j, etat);
                    /*
                    if (config[i][j] == 1 && grille[centreX + i][centreY + j] == 0) {
                        grille[centreX + i][centreY + j] = joueurActuel + 1;
                    }
                    */
                }
            }
        }

        if (this.peutModifierCellule && this.motifPixelActif) {
            let [celluleColonne, celluleLigne] = this.vue.pixelVersCellule(mouseX, mouseY);
            if (mouseButton === LEFT && this.grille.obtenirEtatCellule(celluleLigne, celluleColonne) == 0) {
                this.grille.modifierCellule(celluleLigne, celluleColonne, this.joueurTour);
            }
        }

        if (this.peutModifierCellule && this.blocAleatoireActif) {
            let [celluleColonne, celluleLigne] = this.vue.pixelVersCellule(mouseX, mouseY);
            for (let i = -2; i < 3; i++) {
                for (let j = -2; j < 3; j++) {
                    let aleatoire = Math.random();
                    let etatCelluleActuelle = this.grille.obtenirEtatCellule(celluleLigne + i, celluleColonne + j);
                    if (aleatoire < 0.4 && etatCelluleActuelle == 0) {
                        this.grille.modifierCellule(celluleLigne + i, celluleColonne + j, this.joueurTour);
                    } else if (etatCelluleActuelle == this.joueurTour && aleatoire >= 0.4) {
                        this.grille.modifierCellule(celluleLigne + i, celluleColonne + j, 0);
                    }
                }
            }
        }
    }

    debuterDeplacementGrille(mx, my) {
        if (this.grillePeutEtreDeplace) this.grilleDeplacementEnCours = true;
        this.sourisPrecedente = createVector(mx, my);
    }

    gererMouseDragged() {
        // if (this.grillePeutEtreDeplace) controleur.deplacerGrille(mouseX, mouseY);

        if (this.peutModifierCellule && this.motifPixelActif) {
            let [celluleColonne, celluleLigne] = this.vue.pixelVersCellule(mouseX, mouseY);
            if (mouseButton === LEFT && this.grille.obtenirEtatCellule(celluleLigne, celluleColonne) == 0) {
                this.grille.modifierCellule(celluleLigne, celluleColonne, this.joueurTour);
            }
        }

        if (this.peutModifierCellule && this.blocAleatoireActif) {
            let [celluleColonne, celluleLigne] = this.vue.pixelVersCellule(mouseX, mouseY);
            for (let i = -2; i < 3; i++) {
                for (let j = -2; j < 3; j++) {
                    let aleatoire = Math.random();
                    let etatCelluleActuelle = this.grille.obtenirEtatCellule(celluleLigne + i, celluleColonne + j);
                    if (aleatoire < 0.4 && etatCelluleActuelle == 0) {
                        this.grille.modifierCellule(celluleLigne + i, celluleColonne + j, this.joueurTour);
                    } else if (etatCelluleActuelle == this.joueurTour && aleatoire >= 0.4) {
                        this.grille.modifierCellule(celluleLigne + i, celluleColonne + j, 0);
                    }
                }
            }
        }
    }

    deplacerGrille(mx, my) {
        if (this.grilleDeplacementEnCours) {
            this.vue.modifierDecalage(mouseX - this.sourisPrecedente.x, mouseY - this.sourisPrecedente.y);
            this.sourisPrecedente = createVector(mx, my);
        }
    }

    gererMouseReleased() {
        controleur.finDeplacementGrille();
    }

    finDeplacementGrille() {
        this.sourisPrecedente = null;
        this.grilleDeplacementEnCours = false;
    }

    togglePause() {
        this.paused = !this.paused;
        this.simulator.setPaused(this.paused);
    }

    mettreEnPause() {
        if (this.peutEtreMisEnPause) {
            this.enMarche = false;
        }
    }

    reprendre() {
        this.enMarche = true;
        this.derniereMiseAJour = millis(); // pour éviter un saut
    }

    basculerPause() {
        if (!this.peutEtreMisEnPause) return;
        this.enMarche ? this.mettreEnPause() : this.reprendre();
    }

    changerIntervalle(ms) {
        this.intervalle = ms;
    }

    chargerMotifBase() {

    }

    ajouterMotif() {

    }

    reinitialiserGrille() {
        this.nbGenerations = 0;
        this.derniereMiseAJour = millis();
        this.grille.remplacerCellules(this.grilleInitiale.cellules);
    }

    accueil() {
        this.etatJeu = "accueil";
    }

    nouvellePartie(nbJoueurs = 0) {
        this.nbJoueurs = nbJoueurs;
        for (let i = 1; i <= nbJoueurs; i++) {
            this.joueursNoms.push("Joueur" + i);
            // let couleur = color((Math.floor((i - 1) / 5) * 36 + 2 * 36 * (i - 1)) % 360, 100, 75);
            // this.joueursCouleurs.push(couleur);
            // this.vue.modifierCouleurEtat(i, couleur);
        }

        this.grille = Grille.initialiserCompetition(this.lignes, this.colonnes, nbJoueurs);
        this.simulateur.grille = this.grille;
        // this.vue.grille = this.grille;
        // this.vue.centrerGrille();

        // this.vue.dessiner();
    }

    couleurFond() {
        return this.vue.couleurFond;
    }

    commencerPartie() {
        this.etatJeu = "partieInitialisation";

        /*
        interfaceAccueil.cacher();
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
    
        for (i = 0; i < nbJoueurs; i++) {
            joueurNom.push(joueursNomsAccueil[i].value());
            couleur = joueursCouleursAccueil[i].value();
            joueurCouleur.push(hexToHSL(couleur));
        }
    
        for (i = 0; i < nbJoueurs; i++) {
            partiesGagnees.push(0);
        }
    */
    }

    commencerManche() {
        this.etatJeu = "mancheInitialisation";
    }

    commencerTourActionJoueur() {
        this.phaseActionJoueur = true;
        this.phaseActionJoueurTemps = millis();
        this.vue.cacherDiapoTour();
    }

    obtenirClassementJoueurs() {
        const pointsParId = this.grille.compterCellulesParEtat(); // ex: {0: 150, 1: 97, ...}

        let classement = [];

        // On construit un tableau structuré pour la Vue
        for (let i = 0; i < this.nbJoueurs; i++) {
            classement.push({
                nom: this.joueursNoms[i],
                couleur: this.joueursCouleurs[i],
                points: pointsParId[i + 1] || 0
            });
        }

        // Trier par points décroissants
        classement.sort((a, b) => b.points - a.points);

        return classement;
    }

    obtenirClassementJoueursPartie() {
        let classementPartie = [];

        // On construit un tableau structuré pour la Vue
        for (let i = 0; i < this.nbJoueurs; i++) {
            classementPartie.push({
                nom: this.joueursNoms[i],
                couleur: this.joueursCouleurs[i],
                manches: this.pointsManche[i] || 0
            });
        }

        // Trier par points décroissants
        classementPartie.sort((a, b) => b.manches - a.manches);

        return classementPartie;
    }

    verifierFinPartie(classementJoueurs) {
        let total = 0;
        for (let i = 0; i < classementJoueurs.length; i++) {
            total += classementJoueurs[i].points;
        }

        if (total === 0) return;

        // Recherche d’un joueur dominant
        for (let i = 0; i < classementJoueurs.length; i++) {
            let pourcentage = classementJoueurs[i].points / total;
            if (pourcentage >= 0.85) {
                this.transitionMancheFin();
                break;
            }
        }
    }

    transitionMancheFin() {
        this.etatJeu = "mancheFin";

        let idJoueurGagnant = this.idJoueurGagnant();
        print("transitionMancheFin idJoueurGagnant", idJoueurGagnant);
        this.pointsManche[idJoueurGagnant] += 1;

        let classementJoueursPartie = this.obtenirClassementJoueursPartie();
        this.vue.afficherClassementJoueursPartie(classementJoueursPartie);
    }

    hexToHSL(H) {
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

        return [h, s, l];
    }

    hsbToHsl([h, s, b]) {
        const l = (b / 100) * (100 - s / 2);
        s = l === 0 || l === 1 ? 0 : ((b - l) / Math.min(l, 100 - l)) * 100;
        return [h, s, l];
    }

    initialiserMotifs() {
        this.motifsComplets = this.motifsJson.motifs;

        let grilleMotifPlaneur = this.motifsComplets[0].grille;
        let grilleMotifLWSS = this.motifsComplets[1].grille;
        let grilleMotifMWSS = this.motifsComplets[2].grille;
        let grilleMotifHWSS = this.motifsComplets[3].grille;

        this.grillesMotifs = [grilleMotifPlaneur, grilleMotifLWSS, grilleMotifMWSS, grilleMotifHWSS];

        /*
        rotationsMotifs = [];
        for (i = 0; i < configurations.length; i++) {
            rotationsMotifs.push(0);
        }
        */
    }

    activerBlocAleatoire() {
        this.blocAleatoireActif = true;
        this.motifPixelActif = false;
        this.motifActuelIndex = null;
        this.vue.reinitialiserIcones();
        this.vue.iconeAleatoireImg.style('background-color', 'var(--blanc)');
    }

    activerMotifPixel() {
        this.motifPixelActif = true;
        this.blocAleatoireActif = false;
        this.motifActuelIndex = null;
        this.vue.reinitialiserIcones();
        this.vue.iconeMotifPixelImg.style('background-color', 'var(--blanc)');
    }

    activerRotationMotifs() {
        this.rotationMotifs = (this.rotationMotifs + 1) % 4;
        for (let i = 0; i < this.grillesMotifs.length; i++) {
            this.grillesMotifs[i] = this.rotationMotif(this.grillesMotifs[i]);
            this.vue.iconesMotifsImg[i].style('transform', 'rotate(-' + str(this.rotationMotifs * 90) + 'deg)');
        }
    }

    rotationMotif(motif) {
        let lignes = motif.length;
        let colonnes = motif[0].length;
        let motifRotation = Array.from({ length: lignes }, () => Array(colonnes).fill(0));
        for (let i = 0; i < motif.length; i++) {
            for (let j = 0; j < motif[i].length; j++) {
                motifRotation[j][motif.length - 1 - i] = motif[i][j];
            }
        }
        return motifRotation
    }
}

module.exports = Controleur;
