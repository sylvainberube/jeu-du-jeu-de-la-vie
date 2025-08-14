const diapo1 = new diapo(Globals.w/2, haut/2, "ok");
diapos.push(diapo1)

let boutton1_0 = createButton("Commencer");
const demi1_0 = 50;
boutton1_0.position(diapos[0].centerX - demi1_0, diapos[0].centerY + Globals.w/6);
boutton1_0.hide();

function diapoUn() {
   diapos[0].show()
   diapos[0].titre("Initiation au jeu de la vie", diapo1.centerX, diapo1.centerY);
   boutton1_0.show();
}

let diapos1 = [diapoUn];
fonctionsDiapos.push(diapos1);


aller1 = function () {
   diapoActuelle = 1;
   boutton1_0.hide();
}

boutton1_0.mouseClicked(aller1);