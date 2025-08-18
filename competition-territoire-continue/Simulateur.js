class Simulateur {
    #regleNaissances;
    #regleSurvie;

    constructor(grille) {
        this.grille = grille;
        this.#regleNaissances = [3];
        this.#regleSurvie = [2, 3];
    }

    // Effectuer une transition
    calculerGenerationSuivante(nbJoueurs) {             // TODO: Remplacer le nom par evoluer(nbJoueurs)?
        const lignes = this.grille.lignes;
        const colonnes = this.grille.colonnes;

        // Initialiser toutes les cellules à 0
        let grilleGenerationSuivante = Array.from({ length: lignes }, () => Array(colonnes).fill(0));
        let grilleGenerationSuivanteTerritoire = Array.from({ length: lignes }, () => Array(colonnes).fill(0));

        for (let i = 0; i < this.grille.lignes; i++) {
            for (let j = 0; j < this.grille.colonnes; j++) {
                let etatsVoisins = this.grille.obtenirEtatsVoisins(i, j);
                let nbVoisinesVivantes = etatsVoisins.length;
                const etatActuel = this.grille.obtenirEtatCellule(i, j);
                const territoireActuel = this.grille.obtenirTerritoireCellule(i, j);

                // Naissance
                if (etatActuel === 0 && this.#regleNaissances.includes(nbVoisinesVivantes)) {
                    if (nbVoisinesVivantes > 0) {
                        grilleGenerationSuivante[i][j] = etatsVoisins[Math.floor(Math.random() * nbVoisinesVivantes)];
                        grilleGenerationSuivanteTerritoire[i][j] = grilleGenerationSuivante[i][j];
                    } else if (nbVoisinesVivantes === 0) {
                        grilleGenerationSuivante[i][j] = Math.floor(1 + Math.random() * nbJoueurs);
                        grilleGenerationSuivanteTerritoire[i][j] = grilleGenerationSuivante[i][j];
                    }
                }
                if (etatActuel === 0 && !this.#regleNaissances.includes(nbVoisinesVivantes)) {
                    grilleGenerationSuivanteTerritoire[i][j] = territoireActuel;
                }

                // Survie
                if (etatActuel >= 1 && this.#regleSurvie.includes(nbVoisinesVivantes)) {
                    etatsVoisins.push(etatActuel);
                    etatsVoisins.push(etatActuel);
                    etatsVoisins.push(etatActuel);
                    etatsVoisins.push(etatActuel);
                    etatsVoisins.push(etatActuel);
                    nbVoisinesVivantes = etatsVoisins.length;
                    grilleGenerationSuivante[i][j] = etatsVoisins[Math.floor(Math.random() * nbVoisinesVivantes)];
                    grilleGenerationSuivanteTerritoire[i][j] = grilleGenerationSuivante[i][j];
                    /*
                    if (etatsVoisins.includes(etatActuel)) {
                        gilleGenerationSuivante[i][j] = etatActuel;
                    }
                    else {
                        etatsVoisins.push(etatActuel);
                        gilleGenerationSuivante[i][j] = etatsVoisins[Math.floor(Math.random() * nbVoisinesVivantes)];
                    }
                    */
                    /*
                    grilleGenerationSuivante[i][j] = etatActuel;
                    grilleGenerationSuivanteTerritoire[i][j] = grilleGenerationSuivante[i][j];
                    */
                }
                if (etatActuel >= 1 && !this.#regleSurvie.includes(nbVoisinesVivantes)) {
                    grilleGenerationSuivanteTerritoire[i][j] = etatActuel;
                }
            }
        }
        this.grille.remplacerCellules(grilleGenerationSuivante, grilleGenerationSuivanteTerritoire);
    }
}

module.exports = Simulateur;