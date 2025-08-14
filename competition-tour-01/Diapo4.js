const diapo4 = new diapo(Globals.w/2, haut/2);
diapos.push(diapo4);

var boutton4_0 = createButton("Voir les règles");
const demi4_0 = 50;
boutton4_0.position(diapos[3].centerX - demi4_0, diapos[3].centerY+Globals.w/15);
boutton4_0.hide();

var boutton4_1 = createButton("Prochaine règle");
const demi4_1 = 55;
boutton4_1.position(diapos[3].centerX - demi4_1, diapos[3].centerY + Globals.w/10);
boutton4_1.hide();

var boutton4_2 = createButton("Prochaine règle");
const demi4_2 = demi4_1;
boutton4_2.position(diapos[3].centerX - demi4_2, diapos[3].centerY + Globals.w/10);
boutton4_2.hide();

var boutton4_3 = createButton("Prochaine règle");
const demi4_3 = demi4_1;
boutton4_3.position(diapos[3].centerX - demi4_3, diapos[3].centerY + Globals.w/10);
boutton4_3.hide();

var boutton4_4 = createButton("Suite");
const demi4_4 = 30;
boutton4_4.position(diapos[3].centerX - demi4_4, diapos[3].centerY + Globals.w/6);
boutton4_4.hide();

var temps4_1 = 0;
var temps4_2 = 0;
var temps4_3 = 0;
var temps4_4 = 0;

function diapo4_0 () {
    diapos[3].show();
    diapos[3].texte("Toutes les cellules évoluent selon leur voisinage. Il y a donc des règles qui définissent le prochain état d'une cellule selon son voisinage actuel.", diapos[3].centerX, diapos[3].centerY);
    boutton4_0.show();
}

aller4_1 = function() {
    diapoActuelle = 3;
    sousDiapo = 1;
    boutton4_0.hide();
    temps4_1 = 0;
}

boutton4_0.mouseClicked(aller4_1);

function diapo4_1 () {
    temps4_1 ++;

    let deplace;

    if (temps4_1/60 < 5) {
        deplace = 0;
    } else if (temps4_1/60 >= 5) {
        deplace = temps4_1/60 - 5;
    }

    diapos[3].show();
    diapos[3].texte("Si une cellule morte a trois voisines vivantes, elle devient vivante. On peut aussi dire qu'elle naît au prochain tour.", diapos[2].centerX, diapos[2].centerY - Globals.w/12);

    rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  var sqWidth = constrain(width/8,0,diapos[2].centerY+diapos[2].hauteur/2);
    var decalage = width/10;

    if (deplace == 0) {
        square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
    } else if (deplace > 0 && deplace < 0.5) {
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0,0,0,deplace*255*2);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

    } else if (deplace >= 0.5 && deplace < 2){
             square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0,0,0);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
    } else if (deplace >= 2 && deplace < 4 ) {
        strokeWeight(3);
        fill(255);
        square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

        noStroke();
        fill(0);
        square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
        square(diapos[2].centerX - sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        square(diapos[2].centerX - sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);

        strokeWeight(3);
        stroke(0);
        fill(255);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }  

        noStroke();
        fill(0);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
        square(diapos[2].centerX - sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        square(diapos[2].centerX - sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        
     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        
    } else {
        square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth);

  strokeWeight(1);
  for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    line(diapos[2].centerX - sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    }

  noStroke();
  fill(0);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5 - decalage, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5 - decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);

  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5 + decalage, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5 + decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth/5);

  strokeWeight(3);
  stroke(100,100,255);
  fill(100,100,255,35);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, 3*sqWidth/5);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, 3*sqWidth/5);

  strokeWeight(3);
  stroke(255,0,0);
  fill(0);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth/5);
  fill(255);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth/5);

  stroke(0);
  strokeWeight(2);
  line(diapos[3].centerX-width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40, diapos[3].centerY + height/50);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 - width/150);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 + width/150);
    }

  boutton4_1.show();
}

aller4_2 = function() {
    diapoActuelle = 3;
    sousDiapo = 2;
    boutton4_1.hide();
    temps4_2 = 0;
}

boutton4_1.mouseClicked(aller4_2);

function diapo4_2 () {
   diapos[3].show();
    diapos[3].texte("Si une cellule vivante a deux ou trois voisines en vie, elle reste en vie.", diapos[2].centerX, diapos[2].centerY - Globals.w/12);
    temps4_2 ++;

     let deplace;

    if (temps4_2/60 < 5) {
        deplace = 0;
    } else if (temps4_2/60 >= 5) {
        deplace = temps4_2/60 - 5;
    }

    rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  var sqWidth = constrain(width/8,0,diapos[2].centerY+diapos[2].hauteur/2);
    var decalage = width/10;

    if (deplace == 0) {
        square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
    } else if (deplace > 0 && deplace < 0.5) {
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0,0,0,deplace*255*2);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

    } else if (deplace >= 0.5 && deplace < 2){
             square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0,0,0);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
    } else if (deplace >= 2 && deplace < 4 ) {
        strokeWeight(3);
        fill(255);
        square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

        noStroke();
        fill(0);
        square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
        square(diapos[2].centerX - sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        square(diapos[2].centerX + sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);

        strokeWeight(3);
        stroke(0);
        fill(255);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }  

        noStroke();
        fill(0);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
        square(diapos[2].centerX - sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        square(diapos[2].centerX + sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        
     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        
    } else {
        square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth);

  strokeWeight(1);
  for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    line(diapos[2].centerX - sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    }

  noStroke();
  fill(0);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5 - decalage, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX + sqWidth/5 - decalage, diapos[2].centerY + height/50, sqWidth/5);

  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
  square(diapos[2].centerX - sqWidth/5 + decalage, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX + sqWidth/5 + decalage, diapos[2].centerY + height/50, sqWidth/5);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth/5);

  strokeWeight(3);
  stroke(100,100,255);
  fill(100,100,255,35);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, 3*sqWidth/5);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, 3*sqWidth/5);

  strokeWeight(3);
  stroke(255,0,0);
  fill(0);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth/5);
  fill(0);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth/5);

  stroke(0);
  strokeWeight(2);
  line(diapos[3].centerX-width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40, diapos[3].centerY + height/50);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 - width/150);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 + width/150);
    }
  boutton4_2.show();
}

aller4_3 = function() {
    diapoActuelle = 3;
    sousDiapo = 3;
    boutton4_2.hide();
    temps4_3 = 0;
}

boutton4_2.mouseClicked(aller4_3);

function diapo4_3() {
  diapos[3].show();
    diapos[3].texte("Si une cellule a moins de deux voisines en vie, elle est en sous-population et sera donc morte au prochain tour, peu importe son état actuel.", diapos[2].centerX, diapos[2].centerY - Globals.w/12);
    rectMode(CENTER);

    let deplace;
    temps4_3 ++;

    if (temps4_3/60 < 5) {
        deplace = 0;
    } else if (temps4_3/60 >= 5) {
        deplace = temps4_3/60 - 5;
    }

        rectMode(CENTER);
     fill(255);
     stroke(0);
     strokeWeight(3);
      var sqWidth = constrain(width/8,0,diapos[2].centerY+diapos[2].hauteur/2);
     var decalage = width/10;

    fill(255);
    strokeWeight(3);
    stroke(0);

    if (deplace == 0) {
    square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
        line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
        line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    }

     noStroke();
     fill(0);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
    } else if (deplace > 0 && deplace < 0.5) {

        fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

     fill(0, 255 - (deplace*255*2));
     noStroke();

      square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);

        stroke(0);
        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }


     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0,255 - (deplace*255*2));
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

    } else if (deplace >= 0.5 && deplace < 2){
             square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

    } else if (deplace >= 2 && deplace < 4 ) {
        strokeWeight(3);
        fill(255);
        square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

        noStroke();
        fill(0);
        square(diapos[2].centerX - sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);

        strokeWeight(3);
        stroke(0);
        fill(255);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }  

        noStroke();
        fill(0);
        
     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        
    } else {
        square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth);

  strokeWeight(1);
  for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    line(diapos[2].centerX - sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    }

  noStroke();
  fill(0);

  square(diapos[2].centerX - sqWidth/5 - decalage, diapos[2].centerY + height/50, sqWidth/5);


  strokeWeight(3);
  stroke(100,100,255);
  fill(100,100,255,35);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, 3*sqWidth/5);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, 3*sqWidth/5);

  strokeWeight(3);
  stroke(255,0,0);
  fill(255);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth/5);
  fill(0);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth/5);

  stroke(0);
  strokeWeight(2);
  line(diapos[3].centerX-width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40, diapos[3].centerY + height/50);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 - width/150);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 + width/150);
    }

  boutton4_3.show();
}

aller4_4 = function() {
    diapoActuelle = 3;
    sousDiapo = 4;
    boutton4_3.hide();
    temps4_4 = 0;
}

boutton4_3.mouseClicked(aller4_4);

function diapo4_4 () {
    temps4_4 ++;
    diapos[3].show();
    diapos[3].texte("Finalement, si une cellule a plus de trois voisines, elle est en surpopulation et sera morte au prochain tour, peu importe son état actuel.", diapos[2].centerX, diapos[2].centerY - Globals.w/12);

    let deplace;
    temps4_4 ++;

    if (temps4_4/60 < 5) {
        deplace = 0;
    } else if (temps4_4/60 >= 5) {
        deplace = temps4_4/60 - 5;
    }

    rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);
  var sqWidth = constrain(width/8,0,diapos[2].centerY+diapos[2].hauteur/2);
    var decalage = width/10;

  if (deplace == 0) {
    square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

    strokeWeight(1);
    for (var i = 1; i < 5; i++) {
        line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
        line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    }

     noStroke();
     fill(0);
     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);
    } else if (deplace > 0 && deplace < 0.5) {

        fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

     noStroke();
     fill(0);

     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

        stroke(0);
        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }


     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(0,255 - (deplace*255*2));
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

    } else if (deplace >= 0.5 && deplace < 2){
             square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 , diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

     noStroke();
     fill(0);

     square(diapos[2].centerX - sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX, diapos[2].centerY + height/50, 3*sqWidth/5);

     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX, diapos[2].centerY + height/50, sqWidth/5);

    } else if (deplace >= 2 && deplace < 4 ) {
        strokeWeight(3);
        fill(255);
        square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }

        noStroke();
        fill(0);
     square(diapos[2].centerX - sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5 - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(0);
     square(diapos[2].centerX - decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);

        strokeWeight(3);
        stroke(0);
        fill(255);
        square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth);

        strokeWeight(1);
        for (var i = 1; i < 5; i++) {
            line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY-sqWidth/2 + height/50);
            line(diapos[2].centerX - sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage*(deplace - 2)/2, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
        }  

        noStroke();
        fill(0);

     square(diapos[2].centerX - sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5 + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);
        
     strokeWeight(3);
     stroke(100,100,255);
     fill(100,100,255,35);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, 3*sqWidth/5);
  
     strokeWeight(3);
     stroke(255,0,0);
     fill(255);
     square(diapos[2].centerX + decalage*(deplace - 2)/2, diapos[2].centerY + height/50, sqWidth/5);
        
    } else {
        square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth);

  strokeWeight(1);
  for (var i = 1; i < 5; i++) {
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 + decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY+sqWidth/2 + height/50, diapos[2].centerX - sqWidth/2 + i*sqWidth/5 - decalage, diapos[2].centerY-sqWidth/2 + height/50);
    line(diapos[2].centerX - sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 + decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    line(diapos[2].centerX - sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5, diapos[2].centerX + sqWidth/2 - decalage, diapos[2].centerY - sqWidth/2 + height/50 + i*sqWidth/5);
    }

  noStroke();
  fill(0);

     square(diapos[2].centerX - sqWidth/5 + decalage, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5 + decalage, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX + decalage, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);

     square(diapos[2].centerX - sqWidth/5 - decalage, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX + sqWidth/5 - decalage, diapos[2].centerY + height/50, sqWidth/5);
     square(diapos[2].centerX - decalage, diapos[2].centerY + height/50 - sqWidth/5, sqWidth/5);
     square(diapos[2].centerX - decalage, diapos[2].centerY + height/50 + sqWidth/5, sqWidth/5);


  strokeWeight(3);
  stroke(100,100,255);
  fill(100,100,255,35);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, 3*sqWidth/5);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, 3*sqWidth/5);

  strokeWeight(3);
  stroke(255,0,0);
  fill(255);
  square(diapos[2].centerX + decalage, diapos[2].centerY + height/50, sqWidth/5);
  fill(0);
  square(diapos[2].centerX - decalage, diapos[2].centerY + height/50, sqWidth/5);

  stroke(0);
  strokeWeight(2);
  line(diapos[3].centerX-width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40, diapos[3].centerY + height/50);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 - width/150);
  line(diapos[3].centerX+width/40, diapos[3].centerY + height/50, diapos[3].centerX+width/40 -width/150, diapos[3].centerY + height/50 + width/150);
    }
  boutton4_4.show();
}

aller5_0 = function() {
    diapoActuelle = 4;
    sousDiapo = 0;
    boutton4_4.hide();
    boutton6_0.hide();
    console.log("ok)");
}

boutton4_4.mouseClicked(aller5_0);

let diapos4 = [diapo4_0, diapo4_1, diapo4_2, diapo4_3, diapo4_4];
fonctionsDiapos.push(diapos4);