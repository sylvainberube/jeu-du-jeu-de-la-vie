const diapo5 = new diapo(Globals.w / 2, haut / 2);
diapos.push(diapo5);

grilleInit = [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]];
grilleModif = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
solution = [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]];

var sqWidth = constrain(Globals.w / 8, 0, diapos[4].centerY + diapos[4].hauteur / 2);

let temps = 0;
let currentTime = 0;

var boutton5_0 = createButton("Rappel");
const demi5_0 = 30;
boutton5_0.position(diapos[4].centerX - demi5_0, diapos[4].centerY + Globals.w / 10);
boutton5_0.hide();

victoire = false;

function diapo5_0() {
    diapos[4].show();
    diapos[4].texte("On s'entraîne ! \n Prévoyez la prochaine configuration de la grille suivante.", diapos[4].centerX, diapos[4].centerY - width / 12);
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(3);
    var sqWidth = constrain(width / 8, 0, diapos[4].centerY + diapos[4].hauteur / 2);
    square(diapos[2].centerX, diapos[2].centerY + height / 50, sqWidth);
    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
        line(diapos[2].centerX - sqWidth / 2 + i * sqWidth / 5, diapos[2].centerY + sqWidth / 2 + height / 50, diapos[2].centerX - sqWidth / 2 + i * sqWidth / 5, diapos[2].centerY - sqWidth / 2 + height / 50);
        line(diapos[2].centerX - sqWidth / 2, diapos[2].centerY - sqWidth / 2 + height / 50 + i * sqWidth / 5, diapos[2].centerX + sqWidth / 2, diapos[2].centerY - sqWidth / 2 + height / 50 + i * sqWidth / 5);
    }

    noStroke();
    fill(0);

    for (var i = 0; i < grilleInit.length; i++) {
        for (var j = 0; j < grilleInit[i].length; j++) {
            if (grilleInit[i][j] == 1) {
                square(diapos[4].centerX - sqWidth * 2 / 5 + sqWidth / 5 * i, diapos[4].centerY + height / 50 - sqWidth * 2 / 5 + sqWidth / 5 * j, sqWidth / 5);
            }
        }
    }

    var bons = 0;

    for (var i = 0; i < grilleModif.length; i++) {
        for (var j = 0; j < grilleModif[i].length; j++) {
            if (grilleInit[i][j] == 1 && grilleModif[i][j] == 1) {
                stroke(255, 0, 0);
                strokeWeight(2);
                line(diapos[4].centerX - sqWidth * 2 / 5 + sqWidth / 5 * i + sqWidth / 15, diapos[4].centerY + height / 50 - sqWidth * 2 / 5 + sqWidth / 5 * j + sqWidth / 15, diapos[4].centerX - sqWidth * 2 / 5 + sqWidth / 5 * i - sqWidth / 15, diapos[4].centerY + height / 50 - sqWidth * 2 / 5 + sqWidth / 5 * j - sqWidth / 15);
                line(diapos[4].centerX - sqWidth * 2 / 5 + sqWidth / 5 * i - sqWidth / 15, diapos[4].centerY + height / 50 - sqWidth * 2 / 5 + sqWidth / 5 * j + sqWidth / 15, diapos[4].centerX - sqWidth * 2 / 5 + sqWidth / 5 * i + sqWidth / 15, diapos[4].centerY + height / 50 - sqWidth * 2 / 5 + sqWidth / 5 * j - sqWidth / 15);
            }

            if (grilleInit[i][j] == 0 && grilleModif[i][j] == 1) {
                noFill();
                stroke(0, 225, 0);
                strokeWeight(2);
                circle(diapos[4].centerX - sqWidth * 2 / 5 + sqWidth / 5 * i, diapos[4].centerY + height / 50 - sqWidth * 2 / 5 + sqWidth / 5 * j, sqWidth / 7);
            }

            if (grilleModif[i][j] == solution[i][j]) {
                bons++;
            }
        }
    }

    currentTime = temps / 60;

    if (bons == 25) {
        temps++;
        if (victoire == false) {
            for (let i = 0; i < 300; i++) {
                snowflakes.push(new Snowflake());
            }
        }
        victoire = true
        for (let flake of snowflakes) {
            flake.update(currentTime);
            flake.display();
            if (flake.posY > height) {
                const index = snowflakes.indexOf(flake);
                snowflakes.splice(index, 1);
            }
        }
    } else {
        victoire = false;
        temps = 0;
        for (let flake of snowflakes) {
            snowflakes.splice(0, snowflakes.len);
        }

    }

    boutton5_0.show();

}

function allerRappel() {
    diapoActuelle = 5;
    sousDiapo = 0;
    boutton5_0.hide();
}

boutton5_0.mouseClicked(allerRappel);

let diapos5 = [diapo5_0];
fonctionsDiapos.push(diapos5);
