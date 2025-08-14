const Rappels = new diapo(Globals.w/2, haut/2);
diapos.push(Rappels);

var boutton6_0 = createButton("Retour");
const demi6_0 = 30;
boutton6_0.position(diapos[5].centerX - Globals.w/6, diapos[5].centerY - Globals.w/8.5);
boutton6_0.hide();

function rappels () {
    let decalage = width/20;
    let decalageX = width/10;
    let decalageY = width/19;

    diapos[5].show();
    diapos[5].texte("Rappel des règles", diapos[5].centerX, diapos[5].centerY - width/9);

    rectMode(CENTER);
    fill(255);
    strokeWeight(3);
    stroke(0);

    sqWidth = sqWidth/2;


    square(diapos[5].centerX + decalage - decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth);
    square(diapos[5].centerX - decalage - decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth);

    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage - decalageX, diapos[2].centerY+sqWidth/2 + height/50 - decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage - decalageX, diapos[2].centerY-sqWidth/2 + height/50 - decalageY);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage - decalageX, diapos[2].centerY+sqWidth/2 + height/50 - decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage - decalageX, diapos[2].centerY-sqWidth/2 + height/50 - decalageY);
    line(diapos[2].centerX - sqWidth/2 + decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY, diapos[2].centerX + sqWidth/2 + decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY);
    line(diapos[2].centerX - sqWidth/2 - decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY, diapos[2].centerX + sqWidth/2 - decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY);
    }

    noStroke();
    fill(0);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 - sqWidth/5 - decalageY, sqWidth/5);
    square(diapos[2].centerX - sqWidth/5 - decalage - decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);
    square(diapos[2].centerX - sqWidth/5 - decalage - decalageX, diapos[2].centerY + height/50 - sqWidth/5 - decalageY, sqWidth/5);

    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 - sqWidth/5 - decalageY, sqWidth/5);
    square(diapos[2].centerX - sqWidth/5 + decalage - decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);
    square(diapos[2].centerX - sqWidth/5 + decalage - decalageX, diapos[2].centerY + height/50 - sqWidth/5 - decalageY, sqWidth/5);

    strokeWeight(3);
    stroke(100,100,255);
    fill(100,100,255,35);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 - decalageY, 3*sqWidth/5);
    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 - decalageY, 3*sqWidth/5);

    strokeWeight(3);
    stroke(255,0,0);
    fill(0);
    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);
    fill(255);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);

    stroke(0);
    strokeWeight(2);
    line(diapos[3].centerX-width/80 - decalageX, diapos[3].centerY + height/50 - decalageY, diapos[3].centerX+width/80 - decalageX, diapos[3].centerY + height/50 - decalageY);
    line(diapos[3].centerX+width/80 - decalageX, diapos[3].centerY + height/50 - decalageY, diapos[3].centerX+width/80 -width/150 - decalageX, diapos[3].centerY + height/50 - width/150 - decalageY);
    line(diapos[3].centerX+width/80 - decalageX, diapos[3].centerY + height/50 - decalageY, diapos[3].centerX+width/80 -width/150 - decalageX, diapos[3].centerY + height/50 + width/150 - decalageY);

    diapos[5].soustexte("Naissance si 3 voisines vivantes", diapos[5].centerX - decalageX, diapos[5].centerY - decalageY + width/15);

    rectMode(CENTER);
    fill(255);
    strokeWeight(3);
    stroke(0);

    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth);

    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage - decalageX, diapos[2].centerY+sqWidth/2 + height/50 + decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage - decalageX, diapos[2].centerY-sqWidth/2 + height/50 + decalageY);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage - decalageX, diapos[2].centerY+sqWidth/2 + height/50 + decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage - decalageX, diapos[2].centerY-sqWidth/2 + height/50 + decalageY);
    line(diapos[2].centerX - sqWidth/2 + decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY, diapos[2].centerX + sqWidth/2 + decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY);
    line(diapos[2].centerX - sqWidth/2 - decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY, diapos[2].centerX + sqWidth/2 - decalage - decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY);
    }

    noStroke();
    fill(0);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 - sqWidth/5 + decalageY, sqWidth/5);
    square(diapos[2].centerX - sqWidth/5 - decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    square(diapos[2].centerX + sqWidth/5 - decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);

    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 - sqWidth/5 + decalageY, sqWidth/5);
    square(diapos[2].centerX - sqWidth/5 + decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    square(diapos[2].centerX + sqWidth/5 + decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);

    strokeWeight(3);
    stroke(100,100,255);
    fill(100,100,255,35);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 + decalageY, 3*sqWidth/5);
    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 + decalageY, 3*sqWidth/5);

    strokeWeight(3);
    stroke(255,0,0);
    fill(0);
    square(diapos[2].centerX + decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    fill(255);
    square(diapos[2].centerX - decalage - decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);

    stroke(0);
    strokeWeight(2);
    line(diapos[3].centerX-width/80 - decalageX, diapos[3].centerY + height/50 + decalageY, diapos[3].centerX+width/80 - decalageX, diapos[3].centerY + height/50 + decalageY);
    line(diapos[3].centerX+width/80 - decalageX, diapos[3].centerY + height/50 + decalageY, diapos[3].centerX+width/80 -width/150 - decalageX, diapos[3].centerY + height/50 - width/150 + decalageY);
    line(diapos[3].centerX+width/80 - decalageX, diapos[3].centerY + height/50 + decalageY, diapos[3].centerX+width/80 -width/150 - decalageX, diapos[3].centerY + height/50 + width/150 + decalageY);

    diapos[5].soustexte("Mort si moins de 2 voisines vivantes", diapos[5].centerX + decalageX, diapos[5].centerY - decalageY + width/15);

    rectMode(CENTER);
    fill(255);
    strokeWeight(3);
    stroke(0);

    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth);

    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage + decalageX, diapos[2].centerY+sqWidth/2 + height/50 - decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage + decalageX, diapos[2].centerY-sqWidth/2 + height/50 - decalageY);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage + decalageX, diapos[2].centerY+sqWidth/2 + height/50 - decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage + decalageX, diapos[2].centerY-sqWidth/2 + height/50 - decalageY);
    line(diapos[2].centerX - sqWidth/2 + decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY, diapos[2].centerX + sqWidth/2 + decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY);
    line(diapos[2].centerX - sqWidth/2 - decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY, diapos[2].centerX + sqWidth/2 - decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 - decalageY);
    }

    noStroke();
    fill(0);
    square(diapos[2].centerX - sqWidth/5 - decalage + decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);

    strokeWeight(3);
    stroke(100,100,255);
    fill(100,100,255,35);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 - decalageY, 3*sqWidth/5);
    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 - decalageY, 3*sqWidth/5);

    strokeWeight(3);
    stroke(255,0,0);
    fill(255);
    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);
    fill(0);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 - decalageY, sqWidth/5);

    stroke(0);
    strokeWeight(2);
    line(diapos[3].centerX-width/80 + decalageX, diapos[3].centerY + height/50 - decalageY, diapos[3].centerX+width/80 + decalageX, diapos[3].centerY + height/50 - decalageY);
    line(diapos[3].centerX+width/80 + decalageX, diapos[3].centerY + height/50 - decalageY, diapos[3].centerX+width/80 -width/150 + decalageX, diapos[3].centerY + height/50 - width/150 - decalageY);
    line(diapos[3].centerX+width/80 + decalageX, diapos[3].centerY + height/50 - decalageY, diapos[3].centerX+width/80 -width/150 + decalageX, diapos[3].centerY + height/50 + width/150 - decalageY);

    diapos[5].soustexte("Survie si 2 ou 3 voisines vivantes", diapos[5].centerX - decalageX, diapos[5].centerY + decalageY + width/15);


    rectMode(CENTER);
    fill(255);
    strokeWeight(3);
    stroke(0);

    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth);

    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage + decalageX, diapos[2].centerY+sqWidth/2 + height/50 + decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage + decalageX, diapos[2].centerY-sqWidth/2 + height/50 + decalageY);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage + decalageX, diapos[2].centerY+sqWidth/2 + height/50 + decalageY, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage + decalageX, diapos[2].centerY-sqWidth/2 + height/50 + decalageY);
    line(diapos[2].centerX - sqWidth/2 + decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY, diapos[2].centerX + sqWidth/2 + decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY);
    line(diapos[2].centerX - sqWidth/2 - decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY, diapos[2].centerX + sqWidth/2 - decalage + decalageX, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5 + decalageY);
    }

    noStroke();
    fill(0);
    square(diapos[2].centerX - sqWidth/5 + decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    square(diapos[2].centerX + sqWidth/5 + decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 - sqWidth/5 + decalageY, sqWidth/5);
    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 + sqWidth/5 + decalageY, sqWidth/5);

    square(diapos[2].centerX - sqWidth/5 - decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    square(diapos[2].centerX + sqWidth/5 - decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 - sqWidth/5 + decalageY, sqWidth/5);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 + sqWidth/5 + decalageY, sqWidth/5);

    strokeWeight(3);
    stroke(100,100,255);
    fill(100,100,255,35);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 + decalageY, 3*sqWidth/5);
    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 + decalageY, 3*sqWidth/5);

    strokeWeight(3);
    stroke(255,0,0);
    fill(255);
    square(diapos[2].centerX + decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);
    fill(0);
    square(diapos[2].centerX - decalage + decalageX, diapos[2].centerY + height/50 + decalageY, sqWidth/5);

    stroke(0);
    strokeWeight(2);
    line(diapos[3].centerX-width/80 + decalageX, diapos[3].centerY + height/50 + decalageY, diapos[3].centerX+width/80 + decalageX, diapos[3].centerY + height/50 + decalageY);
    line(diapos[3].centerX+width/80 + decalageX, diapos[3].centerY + height/50 + decalageY, diapos[3].centerX+width/80 -width/150 + decalageX, diapos[3].centerY + height/50 - width/150 + decalageY);
    line(diapos[3].centerX+width/80 + decalageX, diapos[3].centerY + height/50 + decalageY, diapos[3].centerX+width/80 -width/150 + decalageX, diapos[3].centerY + height/50 + width/150 + decalageY);

    diapos[5].soustexte("Mort si plus de 3 voisines vivantes", diapos[5].centerX + decalageX, diapos[5].centerY + decalageY + width/15);

    sqWidth *= 2;

    boutton6_0.show();
}

boutton6_0.mouseClicked(aller5_0);


let rappel = [rappels];
fonctionsDiapos.push(rappel);
