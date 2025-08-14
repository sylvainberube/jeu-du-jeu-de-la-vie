class diapo  {
    constructor (w, h) {
    this.div = createDiv();
    this.div.addClass('diapo');
    this.div.hide();
    }

    ajouterTitre(element) {
        element.addClass('titre');
        this.div.child(element);
        }
    
    ajouterTexte(texte) {
        texte.addClass('texte-diapo');
        this.div.child(texte);
    }

    ajouterElement(element) {
        element.addClass('element');
        this.div.child(element);
    }


    show () {
        this.div.show();
    }

    hide() {
        this.div.hide();
    }

/*    titre(titre, x, y, couleur = [0,0,0]) {
        fill(color(couleur));
        textSize(width/50);
        noStroke();
        textAlign(CENTER,CENTER);
        textFont('Georgia');
        text(titre,x,constrain(y, this.centerY-this.hauteur/2, this.centerY+this.hauteur/2));
    }

    texte(texte, x, y) {
        //let affichage = createDiv(texte);
        //this.div.child(affichage);
        fill(0);
        noStroke();
        textSize(width/75);
        textAlign(CENTER, CENTER);
        rectMode(CORNER);
        textFont('Georgia');
        textWidth(this.largeur);
        text(texte, x - this.largeur*2/5, constrain(y,this.centerY-this.hauteur/2,this.centerY+this.hauteur/2), this.largeur*4/5);
    }

    soustexte(texte,x,y) {
        fill(0);
        noStroke();
        textSize(width/100);
        textAlign(CENTER,CENTER);
        rectMode(CORNER);
        textFont('Georgia');
        textWidth(this.largeur);
        text(texte, x - this.largeur*2/5, constrain(y, this.centerY - this.hauteur/2, this.centerY + this.hauteur/2), this. largeur*4/5);
    } */
}
