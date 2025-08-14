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
        let gilleGenerationSuivante = Array.from({ length: lignes }, () => Array(colonnes).fill(0));

        for (let i = 0; i < this.grille.lignes; i++) {
            for (let j = 0; j < this.grille.colonnes; j++) {
                let etatsVoisins = this.grille.obtenirEtatsVoisins(i, j);
                const nbVoisinesVivantes = etatsVoisins.length;
                const etatActuel = this.grille.obtenirEtatCellule(i, j);

                // Naissance
                if (etatActuel === 0 && this.#regleNaissances.includes(nbVoisinesVivantes)) {
                    if (nbVoisinesVivantes > 0) {
                        gilleGenerationSuivante[i][j] = etatsVoisins[Math.floor(Math.random() * nbVoisinesVivantes)];
                    } else if (nbVoisinesVivantes === 0) {
                        gilleGenerationSuivante[i][j] = Math.floor(1 + Math.random() * nbJoueurs);
                    }
                }
                
                // Survie
                if (etatActuel >= 1 && this.#regleSurvie.includes(nbVoisinesVivantes)) {
                    /*
                    etatsVoisins.push(etatActuel);
                    gilleGenerationSuivante[i][j] = etatsVoisins[Math.floor(Math.random() * nbVoisinesVivantes)];
                    */
                    /*
                    if (etatsVoisins.includes(etatActuel)) {
                        gilleGenerationSuivante[i][j] = etatActuel;
                    }
                    else {
                        etatsVoisins.push(etatActuel);
                        gilleGenerationSuivante[i][j] = etatsVoisins[Math.floor(Math.random() * nbVoisinesVivantes)];
                    }
                    */
                    gilleGenerationSuivante[i][j] = etatActuel;
                }
            }
        }
        this.grille.remplacerCellules(gilleGenerationSuivante);
    }

}