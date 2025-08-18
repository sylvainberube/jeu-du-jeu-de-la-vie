class Grille {
    lignes;
    colonnes;
    cellules;
    cellulesTerritoire;
    typeMonde;
    constructor(lignes = 75, colonnes = 75, typeMonde = "torique") {
        this.lignes = lignes;
        this.colonnes = colonnes;
        this.typeMonde = typeMonde;        // "plat", "torique"
        this.cellules = Array.from({ length: lignes }, () => Array(colonnes).fill(0));  // Initialiser toutes les cellules à 0
        this.cellulesTerritoire = Array.from({ length: lignes }, () => Array(colonnes).fill(0));
    }

    static initialiserCompetition(lignes = 50, colonnes = 25, nbJoueurs) {
        let grille = new Grille(lignes, colonnes);
        if (nbJoueurs === 0) return grille;
        for (let i = 0; i < lignes; i++) {
            for (let j = 0; j < colonnes; j++) {
                if (Math.random() <= 0.15) {
                    grille.cellules[i][j] = Math.floor(1 + nbJoueurs * Math.random());
                    grille.cellulesTerritoire[i][j] = grille.cellules[i][j];
                }
            }
        }
    }

    get lignes() {
        return this.lignes;
    }

    get colonnes() {
        return this.colonnes;
    }

    getCellules() {
        return this.cellules;
    }

    getCellulesTerritoire() {
        return this.cellulesTerritoire;
    }

    // Obtenir l'état d'une cellule
    obtenirEtatCellule(ligne, colonne) {
        if (ligne >= 0 && ligne < this.lignes && colonne >= 0 && colonne < this.colonnes) {
            return this.cellules[ligne][colonne];
        }
    }

    // Obtenir le territoire d'une cellule
    obtenirTerritoireCellule(ligne, colonne) {
        if (ligne >= 0 && ligne < this.lignes && colonne >= 0 && colonne < this.colonnes) {
            return this.cellulesTerritoire[ligne][colonne];
        }
    }

    // Modifier l'état d'une cellule
    modifierCellule(ligne, colonne, etat) {
        if (etat != 0) {
            this.cellulesTerritoire[ligne][colonne] = etat;
        }
        this.cellules[ligne][colonne] = etat;
    }

    // Remplacer la grille
    remplacerCellules(cellules, cellulesTerritoire) {
        this.cellules = cellules;
        this.cellulesTerritoire = cellulesTerritoire;
    }

    // Effacer la grille (réinitialiser à 0 partout)
    effacerGrille() {
        this.cellules = Array.from({ length: this.lignes }, () => Array(this.colonnes).fill(0));  // Initialiser toutes les cellules à 0
        this.cellulesTerritoire = Array.from({ length: this.lignes }, () => Array(this.colonnes).fill(0));  // Initialiser toutes les cellules à 0
    }

    // Générer une nouvelle grille aléatoire
    genererAleatoire(etatsJoueurs, densite = 0.25) {
        // Initialisation aléatoire
        for (let i = 0; i < this.lignes; i++) {
            for (let j = 0; j < this.colonnes; j++) {
                if (Math.random() < densite) {
                    let indexAlea = Math.floor(Math.random() * etatsJoueurs.length);
                    let etatAlea = etatsJoueurs[indexAlea];
                    this.modifierCellule(i, j, etatAlea);
                }
            }
        }
    }

    // Trouver les cellules vivantes du voisinnage de la cellule (i,j),  
    obtenirEtatsVoisins(i, j) {
        let voisins = [];
        switch (this.typeMonde) {
            case ("plat"):
                voisins = this.obtenirEtatsVoisinsMondePlat(i, j);
                break;
            case ("torique"):
                voisins = this.obtenirEtatsVoisinsMondeTorique(i, j);
                break;
        }
        return voisins;
    }

    obtenirEtatsVoisinsMondePlat(i, j) {
        const voisins = [];
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                if (k === 0 && l === 0) continue;

                const ni = i + k;
                const nj = j + l;

                // Vérification des bornes
                if (ni >= 0 && ni < this.lignes && nj >= 0 && nj < this.colonnes) {
                    const etat = this.cellules[ni][nj];
                    if (etat >= 1) {
                        voisins.push(etat);
                    }
                }
            }
        }
        return voisins;
    }

    obtenirEtatsVoisinsMondeTorique(i, j) {
        const voisins = [];
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                if (k === 0 && l === 0) continue;
                const ni = (i + k + this.lignes) % this.lignes;
                const nj = (j + l + this.colonnes) % this.colonnes;

                const etat = this.cellules[ni][nj];
                if (etat >= 1) {
                    voisins.push(etat);
                }
            }
        }
        return voisins;
    }

    static copier(grille) {
        let nouvelleGrille = new Grille(grille.ligne, grille.colonne);
        nouvelleGrille.cellules = grille.cellules.map(ligne => [...ligne]);
        return nouvelleGrille;
    }

    // Ajouter un nouveau motif centré en centreLigne, centreColonne
    ajouterMotif(motif, centreLigne, centreColonne) {
        let ligneHaut = centreLigne - Math.floor(motif.lignes / 2);
        let colonneGauche = centreColonne - Math.floor(motif.colonnes / 2);
        if (ligneHaut < 0 || ligneHaut + motif.ligne > this.lignes || colonneGauche < 0 || colonneGauche + motif.colonne > this.colonnes) {
            return;
        }
        for (let i = 0; i < motif.lignes; i++) {
            for (let j = 0; j < motif.colonnes; j++) {
                this.cellules[i + ligneHaut][j + colonneGauche] = motif.cellules[i][j];
                // this.cellulesTerritoire[i + ligneHaut][j + colonneGauche] = motif.cellules[i][j];
            }
        }
        return;
    }

    // Initialiser une nouvelle grille à partir d'un motif
    initialiserMotif(motif) {
        this.effacerGrille();
        let centreLigne = Math.floor(this.lignes / 2);
        let centreColonne = Math.floor(this.colonnes / 2);

        // this.ajouterMotif(motif, centreLigne, centreColonne);
    }

    compterCellulesParEtat() {
        const compteur = {};

        for (let i = 0; i < this.lignes; i++) {
            for (let j = 0; j < this.colonnes; j++) {
                const cellule = this.cellules[i][j];

                if (!(cellule in compteur)) {
                    compteur[cellule] = 0;
                }
                compteur[cellule]++;
            }
        }
        return compteur;
    }

    compterTerritoireParEtat() {
        const compteur = {};

        for (let i = 0; i < this.lignes; i++) {
            for (let j = 0; j < this.colonnes; j++) {
                const celluleTerritoire = this.cellulesTerritoire[i][j];

                if (!(celluleTerritoire in compteur)) {
                    compteur[celluleTerritoire] = 0;
                }
                compteur[celluleTerritoire]++;
            }
        }
        return compteur;
    }
}

module.exports = Grille;
