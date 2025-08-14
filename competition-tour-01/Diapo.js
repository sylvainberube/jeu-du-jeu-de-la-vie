class Diapo {
    constructor(w, h) {
        this.diapoDiv = createDiv();
        this.diapoDiv.addClass('diapo');
        // this.diapoDiv.hide();
        // this.diapoDiv.show();
    }

    ajouterTitre(element) {
        element.addClass('titre');
        this.diapoDiv.child(element);
    }

    ajouterTexte(element) {
        element.addClass('texte-diapo');
        this.diapoDiv.child(element);
    }

    ajouterElement(element) {
        element.addClass('element');
        this.diapoDiv.child(element);
    }

    afficher() {
        this.diapoDiv.show();
    }

    cacher() {
        this.diapoDiv.hide();
    }
}
