class Motif {
    constructor(nom, cellules) {
        this.nom = nom;                             // #N RLE (à ajouter)
        this.createur = "";                         // #O RLE (à ajouter)
        this.cellules = cellules;                   // Tableau des états du motif
        this.colonnes = this.cellules.length;
        this.lignes = this.cellules[0].length;
    }

    // Créer un nouveau motif à partir d'un code RLE
    static depuisRLE(nom = "Anonyme", texteRLE) {
        // Obtenir lignes et colonnes
        let matchXY = texteRLE.match(/x\s*=\s*(\d+),\s*y\s*=\s*(\d+)/);
        if (matchXY) {
            this.colonnes = parseInt(matchXY[1]);
            this.lignes = parseInt(matchXY[2]);
        }

        // Créer les cellules
        let cellules = Array.from({ length: this.lignes }, () => Array(this.colonnes).fill(0));  // Initialiser toutes les cellules à 0

        const linesRLE = texteRLE.split("\n");
        let rleDonnees = "";
        // Extraire la partie RLE seulement
        for (const lineRLE of linesRLE) {
            const trimmedRLE = lineRLE.trim();
            if (trimmedRLE.startsWith('#') || trimmedRLE.startsWith('x') || trimmedRLE === '') {
                continue; // on saute les commentaires et les métadonnées
            }
            rleDonnees += trimmedRLE;
        }

        // Nettoyage (arrêt au caractère "!")
        rleDonnees = rleDonnees.split('!')[0];

        const lignesRLE = rleDonnees.split('$');
        let y = 0;

        const regex = /(\d*)([bo])/g;

        for (const ligneRLE of lignesRLE) {
            let x = 0;
            let match;
            while ((match = regex.exec(ligneRLE)) !== null) {
                const count = match[1] === '' ? 1 : parseInt(match[1], 10);
                const type = match[2];

                if (type === 'b') {
                    x += count;
                } else if (type === 'o') {
                    for (let i = 0; i < count; i++) {
                        cellules[y][i + x] = 1;
                    }
                    x += count;
                }
            }
            y++; // ligne suivante
        }

        return new Motif(nom, cellules);
    }
}