function keyPressed() {
    if (key === 's') {
        transitionActif = !transitionActif;
        transitionActifTemps = millis();
    }
    if (key === 'd') {
        if (!transitionActif) {
            transitionGrille();
        }
    }
    if (key === 'm') {
        modificationCellules = !modificationCellules;
    }
    if (key === 'i') {
        afficherImporterConfiguration = !afficherImporterConfiguration;
        afficherExporterConfiguration = false;
    }
    if (key === 'e') {
        configurationRLE = genererRLEComplet();
        exportationZonetexte.value(configurationRLE);
        afficherExporterConfiguration = !afficherExporterConfiguration;
        afficherImporterConfiguration = false;
    }
   if (key == 'e') {
        etampeActif = !etampeActif;
    }
    if (key == 'n') {
        configActuelle = (configActuelle + 1)%(configurations.length);
    }
}

// Zoom in/out avec la roulette de la souris
function mouseWheel(event) {
    if (jeuCommence) {
    let [cellX, cellY] = cellMouse();
    if (event.delta < 0) {
        grillePosX = cellX - (cellX - grillePosX) / 1.15;
        grillePosY = cellY - (cellY - grillePosY) / 1.15;
        grilleZoom = grilleZoom * 1.15;
    } else if (event.delta > 0) {
        grillePosX = cellX - 1.15 * (cellX - grillePosX);
        grillePosY = cellY - 1.15 * (cellY - grillePosY);
        grilleZoom = grilleZoom / 1.15;
    }
}
}

// Déplacement avec un cliquer-glisser
function mousePressed() {
    grille_startX = mouseX;
    grille_startY = mouseY;
    if (modificationCellules === false &&  !tourCommence && jeuCommence) {
        dragging = true;
    }

    if (mode == 4 && modeModification && modificationCellules && tourCommence) {
        if (etampeActif) {
            etampe(configurations[configActuelle]);
        } else if (aleatoireActif) {
            let [cellX, cellY] = cellMouse();
    for (i = -1; i < 2; i++) {
        for(j = -1; j < 2; j++) {
            aleatoire = Math.random();
            if (aleatoire < 0.4 && grille[cellX + i][cellY + j] == (0)) {
                grille[cellX + i][cellY + j] = joueurActuel + 1;
            } else if (grille[cellX + i][cellY + j] == joueurActuel + 1 && aleatoire >= 0.4){
                grille[cellX + i][cellY + j] = 0;
            }
        }
    }
    } else {
            let [cellX, cellY] = cellMouse();
            if (mouseButton === LEFT && grille[cellX][cellY] == 0) {
                grille[cellX][cellY] = joueurActuel + 1;
            } else if (mouseButton === RIGHT && grille[cellX][cellY] == joueurActuel + 1) {
                grille[cellX][cellY] = 0;
            }
        }
    }
    else {    // Modifier état cellule
        if (modificationCellules && mode != 4) {
            let [cellX, cellY] = cellMouse();
            if (mouseButton === LEFT) {
                grille[cellX][cellY] = 1;
            } else if (mouseButton === RIGHT) {
                grille[cellX][cellY] = 0;
            }
        }
    }
    return;
}

function mouseDragged() {
    if (dragging) {
        grillePosX += (grille_startX - mouseX) / (grilleTailleCell * grilleZoom);
        grillePosY += (grille_startY - mouseY) / (grilleTailleCell * grilleZoom);
        grille_startX = mouseX;
        grille_startY = mouseY;
    }
    if (mode == 4 && modeModification && modificationCellules && tourCommence) {
        if (aleatoireActif) {
            let [cellX, cellY] = cellMouse();
    for (i = -1; i < 2; i++) {
        for(j = -1; j < 2; j++) {
            aleatoire = Math.random();
            if (aleatoire < 0.4 && grille[cellX + i][cellY + j] == (0)) {
                grille[cellX + i][cellY + j] = joueurActuel + 1;
            } else if (grille[cellX + i][cellY + j] == joueurActuel + 1 && aleatoire >= 0.4){
                grille[cellX + i][cellY + j] = 0;
            }
        }
    }
    } else {
        let [cellX, cellY] = cellMouse();
        if (mouseButton === LEFT && grille[cellX][cellY] == 0) {
            grille[cellX][cellY] = joueurActuel + 1;
        } else if (mouseButton === RIGHT && grille[cellX][cellY] == joueurActuel + 1) {
            grille[cellX][cellY] = 0;
        }
    }
    }
    else {    // Modifier état cellule
        if (modificationCellules && mode != 4) {
            let [cellX, cellY] = cellMouse();
            if (mouseButton === LEFT) {
                grille[cellX][cellY] = 1;
            } else if (mouseButton === RIGHT) {
                grille[cellX][cellY] = 0;
            }
        }
    }
}
function mouseReleased() {
    dragging = false;
}


function afficherGrille() {
    let grille_taille_cell_zoom = grilleTailleCell * grilleZoom;

    stroke(128);
    strokeWeight(1);
    colorMode(HSB, 360, 100, 100);
    for (let i = 0; i < grilleNbColonnes; i++) {
        for (let j = 0; j < grilleNbLignes; j++) {
            if ((i - grillePosX + 1) * grille_taille_cell_zoom < 0) {
                continue;
            }
            if ((i - grillePosX - 1) * grille_taille_cell_zoom > Globals.w) {
                continue;
            }
            if ((j - grillePosY + 1) * grille_taille_cell_zoom < 0) {
                continue;
            }
            if ((j - grillePosY - 1) * grille_taille_cell_zoom > Globals.h) {
                continue;
            }
            if (grille[i][j] == 0) {
                fill(0, 0, 100);
            } else if (grille[i][j] >= 1) {
                fill(color(joueurCouleur[grille[i][j] - 1]));
            }
            square((i - grillePosX) * grille_taille_cell_zoom, (j - grillePosY) * grille_taille_cell_zoom, grille_taille_cell_zoom);
        }
    }
    colorMode(RGB, 255, 255, 255, 255);
    /*
        let img = createImage(2000, 1000);
        img.loadPixels();
        for (let i = 0; i < grilleNbColonnes; i++) {
            for (let j = 0; j < grilleNbLignes; j++) {
                if ((i - grillePosX + 1) * grille_taille_cell_zoom < 0) {
                    continue;
                }
                if ((i - grillePosX - 1) * grille_taille_cell_zoom > Globals.w) {
                    continue;
                }
                if ((j - grillePosY + 1) * grille_taille_cell_zoom < 0) {
                    continue;
                }
                if ((j - grillePosY - 1) * grille_taille_cell_zoom > Globals.h) {
                    continue;
                }
                // Load the pixels array.
                for (let a = 0; a < grille_taille_cell_zoom; a++) {
                    for (let b = 0; b < grille_taille_cell_zoom; b++) {
                        pixelX = (i - grillePosX) * grille_taille_cell_zoom + a;
                        pixelY = (j - grillePosY) * grille_taille_cell_zoom + b;
                        if (pixelX >= 0 && pixelX < 2000 && pixelY >= 0 && pixelY < Globals.h) {
                            let index = 4 * (pixelY * 2000 + pixelX);
                            if (grille[i][j] == 0) {
                                img.pixels[index] = 255;
                                img.pixels[index + 1] = 255;
                                img.pixels[index + 2] = 255;
                                img.pixels[index + 3] = 255;
                            } else {
                                img.pixels[index] = joueurCouleur[grille[i][j] - 1][0];
                                img.pixels[index + 1] = joueurCouleur[grille[i][j] - 1][1];
                                img.pixels[index + 2] = joueurCouleur[grille[i][j] - 1][2];
                                img.pixels[index + 3] = 255;
                            }
                        }
                    }
                }
            }
        }
        img.updatePixels();
        image(img, 0, 0);
        */
}

function transitionGrille() {
    nbGenerations += 1;
    let prochaine_grille = creerTableau2D(grilleNbColonnes, grilleNbLignes);
    for (let i = 1; i < grilleNbColonnes - 1; i++) {
        for (let j = 1; j < grilleNbLignes - 1; j++) {
            let voisinnageEtat = [];
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    if (k == 0 && l == 0) {
                        continue;
                    }
                    if (grille[i + k][j + l] >= 1) {
                        voisinnageEtat.push(grille[i + k][j + l]);
                    }
                }
            }
            let voisinageSomme = voisinnageEtat.length;

            // Naissance
            if (grille[i][j] === 0) {
                if (configurationRegleNaissance.includes(voisinageSomme)) {
                    prochaine_grille[i][j] = voisinnageEtat[Math.floor(Math.random() * voisinageSomme)];
                } else {
                    prochaine_grille[i][j] = 0;
                }
            }

            // Survie
            if (grille[i][j] >= 1) {
                if (configurationRegleSurvie.includes(voisinageSomme)) {
                    prochaine_grille[i][j] = grille[i][j];
                } else {
                    prochaine_grille[i][j] = 0;
                }
            }
        }
    }
    grille = prochaine_grille;
}

function actionGrille() {
    if (keyIsPressed) {
        switch (keyCode) {
            case UP_ARROW:
                grillePosY -= 0.2;
                break;
            case DOWN_ARROW:
                grillePosY += 0.2;
                break;
            case LEFT_ARROW:
                grillePosX -= 0.2;
                break;
            case RIGHT_ARROW:
                grillePosX += 0.2;
                break;
            case 90: // z
                grilleZoom = grilleZoom * 1.05;
                break;
            case 88: // x
                grilleZoom = grilleZoom * 0.9524;
                break;
            case 65: // a
                centrerGrille();
                break;
        }
    }
}

function initialiserGrille() {
    grille = creerTableau2D(grilleNbColonnes, grilleNbLignes);
    if (!configurationRLE) {
        return;
    }
    const lines = configurationRLE.split("\n");
    let rleData = "";
    // Extraire la partie RLE seulement
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || trimmed.startsWith('x') || trimmed === '') {
            continue; // on saute les commentaires et les métadonnées
        }
        rleData += trimmed;
    }
    // Nettoyage (arrêt au caractère "!")
    rleData = rleData.split('!')[0];

    const rows = rleData.split('$');
    let y = 0;

    const regex = /(\d*)([bo])/g;
    let centreX = Math.floor((grilleNbColonnes - configurationNbColonnes) / 2);
    let centreY = Math.floor((grilleNbLignes - configurationNbLignes) / 2);
    for (const row of rows) {
        let x = 0;
        let match;
        while ((match = regex.exec(row)) !== null) {
            const count = match[1] === '' ? 1 : parseInt(match[1], 10);
            const type = match[2];

            if (type === 'b') {
                x += count;
            } else if (type === 'o') {
                for (let i = 0; i < count; i++) {
                    grille[centreX + i + x][centreY + y] = 1;
                }
                x += count;
            }
        }
        y++; // ligne suivante
    }
}

function creerTableau2D(nbColonnes, nbLignes) {
    let arr = new Array(nbColonnes);
    for (let i = 0; i < nbColonnes; i++) {
        arr[i] = new Array(nbLignes);
        for (let j = 0; j < nbLignes; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function chargerConfiguration() {
    // Taille de la configuration
    let matchXY = configurationRLE.match(/x\s*=\s*(\d+),\s*y\s*=\s*(\d+)/);
    if (matchXY) {
        configurationNbColonnes = matchXY[1];
        configurationNbLignes = matchXY[2];
    }
    let matchRule = configurationRLE.match(/rule\s*=\s*B(\d+)\/S(\d+)/);
    if (matchRule) {
        configurationRegleNaissance = matchRule[1].split('').map(Number);
        configurationRegleSurvie = matchRule[2].split('').map(Number);
    }
    return;
}

function initialiserInterface() {
    // Interface graphique pour importation
    importationBoite = createDiv();
    importationBoite.hide();
    importationBoite.style('background', '#111111');
    importationBoite.style('color', '#ffffff');
    importationBoite.style('padding', '20px');
    importationBoite.style('border', '1px solid white');
    importationBoite.style('border-radius', '10px');
    importationBoite.style('position', 'absolute');
    importationBoite.style('top', '50%');
    importationBoite.style('left', '50%');
    importationBoite.style('transform', 'translate(-50%, -50%)');
    importationBoite.style('width', '500px');

    importationTitre = createElement('h3', 'Importation d\'une configuration');
    importationTitre.style('padding', '0px');
    importationTitre.style('margin', '0px');
    importationBoite.child(importationTitre);

    importationZonetexte = createElement('textarea');
    importationZonetexte.attribute('placeholder', 'Copier la configuration au format RLE.');
    importationZonetexte.style('width', '100%');
    importationZonetexte.style('height', '150px');
    importationZonetexte.style('background', '#000000');
    importationZonetexte.style('color', 'lightgray');
    importationZonetexte.style('font-family', 'monospace');
    importationZonetexte.style('border', '1px solid white');
    importationZonetexte.style('resize', 'vertical');
    importationBoite.child(importationZonetexte);

    importationFichier = createFileInput(importerConfigurationFichier);
    importationFichier.style('display', 'inline');
    importationBoite.child(importationFichier);

    importationBoite.child(createP());

    importationBouton = createButton('Importer');
    importationBouton.mousePressed(importerConfigurationTexte);
    importationBoite.child(importationBouton);

    // Interface graphique pour exporation
    exportationBoite = createDiv();
    exportationBoite.hide();
    exportationBoite.style('background', '#111111');
    exportationBoite.style('color', '#ffffff');
    exportationBoite.style('padding', '20px');
    exportationBoite.style('border', '1px solid white');
    exportationBoite.style('border-radius', '10px');
    exportationBoite.style('position', 'absolute');
    exportationBoite.style('top', '50%');
    exportationBoite.style('left', '50%');
    exportationBoite.style('transform', 'translate(-50%, -50%)');
    exportationBoite.style('width', '500px');

    exportationTitre = createElement('h3', 'Exportation de la configuration');
    exportationTitre.style('padding', '0px');
    exportationTitre.style('margin', '0px');
    exportationBoite.child(exportationTitre);

    exportationZonetexte = createElement('textarea');
    exportationZonetexte.attribute('placeholder', 'fdfgdsfsd');
    exportationZonetexte.value(configurationRLE);
    exportationZonetexte.style('width', '100%');
    exportationZonetexte.style('height', '150px');
    exportationZonetexte.style('background', '#000000');
    exportationZonetexte.style('color', 'lightgray');
    exportationZonetexte.style('font-family', 'monospace');
    exportationZonetexte.style('border', '1px solid white');
    exportationZonetexte.style('resize', 'vertical');
    exportationBoite.child(exportationZonetexte);

    exportationBouton = createButton('Exporter');
    exportationBouton.mousePressed(exporterConfigurationFichier);
    exportationBoite.child(exportationBouton);

}
// configurationRLE
function importerConfigurationFichier(file) {
    importationZonetexte.value(file.data);
}


function importerConfigurationTexte() {
    configurationRLE = importationZonetexte.value();
    chargerConfiguration();
    initialiserGrille();
    afficherImporterConfiguration = false;
}

function exporterConfigurationFichier() {
    const contenu = exportationZonetexte.value()
    const nomFichier = "motif.rle";

    // Créer un blob texte
    const blob = new Blob([contenu], { type: "text/plain" });

    // Créer un lien de téléchargement temporaire
    const url = URL.createObjectURL(blob);
    const lien = createA(url, nomFichier);
    lien.attribute('download', nomFichier);
    lien.hide();     // pas besoin de l'afficher
    lien.elt.click(); // déclenche le téléchargement
    URL.revokeObjectURL(url); // libère la mémoire
}

function genererRLEComplet() {
    // Trouver les limites non vides (bounding box)
    let minRow = Infinity, maxRow = -1;
    let minCol = Infinity, maxCol = -1;
    for (let i = 0; i < grilleNbColonnes; i++) {
        for (let j = 0; j < grilleNbLignes; j++) {
            if (grille[i][j] === 1) {
                if (i < minCol) minCol = i;
                if (i > maxCol) maxCol = i;
                if (j < minRow) minRow = j;
                if (j > maxRow) maxRow = j;
            }
        }
    }
    // Si aucun pixel vivant, retourner un motif vide
    if (maxRow === -1) {
        return `x = 0, y = 0, rule = B3/S23\n!`;
    }

    let height = maxRow - minRow + 1;
    let width = maxCol - minCol + 1;

    // Construire une sous-grille coupée aux bonnes dimensions
    let sousGrille = [];
    for (let i = minRow; i <= maxRow; i++) {
        let ligne = [];
        for (let j = minCol; j <= maxCol; j++) {
            ligne.push(grille[j][i]);
        }
        sousGrille.push(ligne);
    }
    // Encoder cette sous-grille
    let rleData = genererRLECellules(sousGrille);

    return `x = ${width}, y = ${height}, rule = B3/S23\n${rleData}`;
}

function genererRLECellules(grid) {
    let lignesRLE = [];

    for (let row of grid) {
        let ligne = "";
        let count = 0;
        let last = null;

        for (let cell of row) {
            let etat = cell ? 'o' : 'b';

            if (etat === last) {
                count++;
            } else {
                if (last !== null) {
                    ligne += (count > 1 ? count : '') + last;
                }
                last = etat;
                count = 1;
            }
        }

        if (last !== null) {
            ligne += (count > 1 ? count : '') + last;
        }

        lignesRLE.push(ligne);
    }
    return lignesRLE.join('$') + '!';
}

function genererGrilleRLE(RLE) {
    const lines = RLE.split("\n");
    let rleData = RLE;
    // Extraire la partie RLE seulement
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || trimmed.startsWith('x') || trimmed === '') {
            continue; // on saute les commentaires et les métadonnées
        }
        rleData += trimmed;
    }
    // Nettoyage (arrêt au caractère "!")
    rleData = rleData.split('!')[0];

    const rows = rleData.split('$');

    const regex = /(\d*)([bo])/g;
    let nbColumns = 0;
     while ((match = regex.exec(rows[0])) !== null) {
            const count = match[1] === '' ? 1 : parseInt(match[1], 10);
        nbColumns += count;
     }

    let matriceInitiale = creerTableau2D(nbColumns, rows.length);
    
    let y = 0;

    for (const row of rows) {
        let x = 0;
        let match;
        while ((match = regex.exec(row)) !== null) {
            const count = match[1] === '' ? 1 : parseInt(match[1], 10);
            const type = match[2];

            if (type === 'b') {
                x += count;
            } else if (type === 'o') {
                for (let i = 0; i < count; i++) {
                        matriceInitiale[i + x][y] = 1;
                }
                x += count;
            }
        }
        y++; // ligne suivante
    }

    return(matriceInitiale);
}

function centrerGrille() {
    let min_x = 0;
    let max_x = grilleNbColonnes;
    let min_y = 0;
    let max_y = grilleNbLignes;
    for (let i = 0; i < grilleNbColonnes; i++) {
        for (let j = 0; j < grilleNbLignes; j++) {
            if (grille[i][j] == 1) {
                min_x = i;
                max_x = i;
                min_y = j;
                max_y = j;
                break;
            }
        }
    }
    for (let i = 0; i < grilleNbColonnes; i++) {
        for (let j = 0; j < grilleNbLignes; j++) {
            if (grille[i][j] >= 1 && i < min_x) {
                min_x = i
            } else if (grille[i][j] >= 1 && i > max_x) {
                max_x = i
            }
            if (grille[i][j] >= 1 && j < min_y) {
                min_y = j
            } else if (grille[i][j] >= 1 && j > max_y) {
                max_y = j
            }
        }
    }
    grilleZoom = Math.min(Globals.w / (grilleTailleCell * (max_x - min_x + 3)), Globals.h / (grilleTailleCell * (max_y - min_y + 3)));
    grillePosX = -((Globals.w - (max_x - min_x + 3) * grilleTailleCell * grilleZoom) / 2) / (grilleTailleCell * grilleZoom);
    grillePosY = min_y - 1;
}