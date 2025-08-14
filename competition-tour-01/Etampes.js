function initialiserMotifs() {
    motifs = dataMotifs.motif;

    let planeurGrille = motifs[0].grille;
    let lwssGrille = motifs[1].grille;
    let mwssGrille = motifs[2].grille;
    let hwssGrille = motifs[3].grille;

    configurations = [planeurGrille, lwssGrille, mwssGrille, hwssGrille];

    rotationsMotifs = [];
    for (i = 0; i < configurations.length; i++){
        rotationsMotifs.push(0);
    }
}



function etampe(config) {

    let [centreX, centreY] = cellMouse()

    for (let i = 0; i < config.length; i++) {
        for(let j = 0; j < config[i].length; j++) {
            if (config[i][j] == 1 && grille[centreX + i][centreY + j] == 0) {
                grille[centreX + i][centreY + j] = joueurActuel + 1;
            }
        }
    }
}

function afficherEtampe(config) {
    if (etampeActif && modeModification && tourCommence) {
        
         let [centreX, centreY] = cellMouse();

        for (let i = 0; i < config.length; i++) {
            for(let j = 0; j < config[i].length; j++) {
                if (config[i][j] == 1) {
                    colorMode(HSB, 360, 100, 100);
                    let c = color(joueurCouleur[joueurActuel]);
                    colorMode(RGB, 255, 255, 255, 255);
                    fill(red(c), green(c), blue(c), 185);
                    noStroke();
                    square((i + centreX - grillePosX) * grilleTailleCell * grilleZoom, (j + centreY - grillePosY) * grilleTailleCell * grilleZoom, grilleTailleCell * grilleZoom);
    }
}
        }
    }
        
}

function rotation(config) {
    let retour = creerTableau2D(config[0].length, config.length);
    for(i = 0; i <config.length; i++){
        for(j = 0; j <config[i].length; j++){
           retour[j][config.length -1 - i] = config[i][j];
        }
    }
    return retour
}

let conteneurIcones = createDiv();
conteneurIcones.addClass('conteneur-icones-etampes');
conteneurIcones.hide();

let iconePlaneur = createImg('Images/planeurTransparent.png');
conteneurIcones.child(iconePlaneur);
iconePlaneur.style('order', '0');
iconePlaneur.addClass('icone-etampe');


let iconeLwss = createImg('Images/lwss.png');
conteneurIcones.child(iconeLwss);
iconeLwss.style('order', '1');
iconeLwss.addClass('icone-etampe');

let iconeMwss = createImg('Images/mwss.png');
conteneurIcones.child(iconeMwss);
iconeMwss.style('order', '2');
iconeMwss.addClass('icone-etampe');

let iconeHwss = createImg('Images/hwss.png');
conteneurIcones.child(iconeHwss);
iconeHwss.style('order', '3');
iconeHwss.addClass('icone-etampe');


let icones = selectAll('.icone-etampe');

let iconeRotation = createImg('Images/iconeRotation.png');
conteneurIcones.child(iconeRotation);
iconeRotation.style('order', '4');
iconeRotation.addClass('icone-etampe');

function faireRotation() {
    if (etampeActif) {
    configurations[configActuelle] = rotation(configurations[configActuelle]);
    rotationsMotifs[configActuelle] = (rotationsMotifs[configActuelle] + 1) % 4;
    icones[configActuelle].style('transform', 'rotate(-' + str(rotationsMotifs[configActuelle]*90) + 'deg)');
    }
}

iconeRotation.mousePressed(faireRotation);

let iconeAleatoire = createImg('Images/aleatoire.png');
conteneurIcones.child(iconeAleatoire);
iconeAleatoire.style('order', '5');
iconeAleatoire.addClass('icone-etampe');

function changementAleatoire() {
    aleatoireActif =! aleatoireActif
    if(aleatoireActif) {
        etampeActif = false;
        iconeAleatoire.style('background-color', 'var(--beige)');
    } else {
        iconeAleatoire.style('background-color', 'var(--blanc)');
    }
}


iconeAleatoire.mousePressed(changementAleatoire);


for (let icone of icones) {
    icone.hide();
}



function updateIcones () {
    conteneurIcones.show();
    for (let i = 0; i < icones.length; i ++) {
        iconeVerifiee = i;
        icones[i].show();
        icones[i].mousePressed(activerEtampe);
    }
}


function activerEtampe() {
    let indice = this.style('order');
    if (etampeActif && configActuelle == indice) {
        etampeActif = !etampeActif;
        this.style('background-color', 'var(--blanc)');
    } else if (etampeActif && configActuelle != indice) {
        configActuelle = indice;
        for (let i = 0; i < icones.length; i ++) {
            icones[i].style('background-color', 'var(--blanc)');
        }
        this.style('background-color', 'var(--beige)');
    } else {
        etampeActif = !etampeActif;
        configActuelle = indice;
        this.style('background-color', 'var(--beige)');
    }
}

function clearIcones () {
    for (let icone of icones) {
        icone.style('background-color', 'var(--blanc)');
        icone.hide();
    }
    iconeAleatoire.style('background-color', 'var(--blanc)');
    conteneurIcones.hide();
    etampeActif = false;
    aleatoireActif = false;
}