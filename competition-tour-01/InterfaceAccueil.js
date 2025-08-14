class InterfaceAccueil {
    constructor(controleur) {
        this.controleur = controleur;
        this.diapoAccueil = new Diapo();

        // Nombre de joueurs, noms et couleurs des joueurs
        this.nbJoueurs = 3;
        this.joueurNom = [];
        this.joueurCouleur = [];

        // Éléments pour l'interface
        this.titreDiv;
        this.createursDiv;
        this.testerDiv;
        this.nbJoueursSlider;
        this.conteneurJoueursAccueilDiv;
        this.joueursListeDiv = [];
        this.joueursNomsListeInput = [];
        this.joueursCouleursListeColor = [];
        this.nbJoueursDiv;

        this.commencerButton;

        this.initialiserInterface();
    }

    initialiserInterface() {
        // Formatage du titre
        this.titreDiv = createDiv();
        this.diapoAccueil.ajouterTitre(this.titreDiv);
        this.titreDiv.html("Jeu du jeu de la vie (prototype 002)");
        this.titreDiv.style('top', '20%');

        // Formatage du texte de présentation des créateurs
        this.createursDiv = createDiv();
        this.diapoAccueil.ajouterTexte(this.createursDiv);
        this.createursDiv.html("Créé par Mathilde Poulin et Sylvain Bérubé.");
        this.createursDiv.style('top', '28%');

        // Formatage du texte de remerciement pour tester le prototype
        this.testerDiv = createDiv();
        let texte = "Merci de tester ce prototype! ";
        texte += "Vous pouvez nous envoyer vos commentaires à ";
        texte += "<a href=\"mailto:sylvain.berube@usherbrooke.ca\">sylvain.berube@usherbrooke.ca</a>.";
        this.testerDiv.html(texte);
        this.testerDiv.style('top', '38%');
        this.diapoAccueil.ajouterTexte(this.testerDiv);

        // Formatage du slider
        this.nbJoueursSlider = createSlider(2, 10, this.nbJoueurs, 1);
        let sliderWidth = 0.2 * 1000;
        this.nbJoueursSlider.style('width', sliderWidth + 'px');
        this.nbJoueursSlider.style('top', '72%');
        this.diapoAccueil.ajouterElement(this.nbJoueursSlider);

        // Formatage des div des joueurs (nom + couleur)
        this.conteneurJoueursAccueilDiv = createDiv();
        this.conteneurJoueursAccueilDiv.style('top', '55%');
        this.conteneurJoueursAccueilDiv.addClass('conteneur-joueurs')
        this.diapoAccueil.ajouterElement(this.conteneurJoueursAccueilDiv);

        for (let i = 0; i < this.nbJoueurs; i++) {
            let joueurDiv = createDiv("");
            joueurDiv.addClass("joueur");
            joueurDiv.parent(this.conteneurJoueursAccueilDiv);
            this.joueursListeDiv.push(joueurDiv);

            let nomJoueurInput = createInput(' joueur ' + str(i + 1));
            nomJoueurInput.style('width', '100px')
            nomJoueurInput.parent(this.joueursListeDiv[i]);
            this.joueursNomsListeInput.push(nomJoueurInput);

            let couleurJoueurColorPicker = createColorPicker(color((Math.floor(i / 5) * 36 + 2 * 36 * i) % 360, 75, 100));
            couleurJoueurColorPicker.parent(this.joueursListeDiv[i]);
            this.joueursCouleursListeColor.push(couleurJoueurColorPicker);
        }

        // Formatage du nombre de joueur
        this.nbJoueursDiv = createDiv();
        this.nbJoueursDiv.html("Nombre de joueurs : " + str(this.nbJoueursSlider.value()));
        this.nbJoueursDiv.style('top', '67%');
        this.diapoAccueil.ajouterTexte(this.nbJoueursDiv);

        this.commencerButton = createButton();
        this.commencerButton.html("Commencer");
        this.commencerButton.style('top', '85%');
        this.diapoAccueil.ajouterElement(this.commencerButton);

        this.joueurNom = [];
        this.joueurCouleur = [];

        for (let i = 0; i < this.nbJoueurs; i++) {
            this.joueurNom.push(this.joueursNomsListeInput[i].value());
            let couleur = this.joueursCouleursListeColor[i].value();
            this.joueurCouleur.push(this.hexToHSB(couleur));
        }

        // Modifier l'apparence lorsque l'on utilise le slider
        this.nbJoueursSlider.changed(() => this.changerNbJoueurs());

        // Commencer une partie lorsqu'on clique sur le bouton
        this.commencerButton.mouseClicked(() => this.commencerJeu());
    }

    afficher() {
        this.diapoAccueil.afficher();
    }

    cacher() {
        this.diapoAccueil.cacher();
    }

    commencerJeu() {
        this.joueurNom = [];
        this.joueurCouleur = [];
        for (let i = 0; i < this.nbJoueurs; i++) {
            this.joueurNom.push(this.joueursNomsListeInput[i].value());
            let couleur = this.joueursCouleursListeColor[i].value();
            this.joueurCouleur.push(this.hexToHSB(couleur));
        }

        this.controleur.nbJoueurs = this.nbJoueurs;
        this.controleur.joueurNom = this.joueurNom;
        this.controleur.joueurCouleur = this.joueurCouleur;
        this.controleur.commencerJeu();
    }

    // Changer le nombre de joueurs via le slider et ajuster les div des joueurs
    changerNbJoueurs() {
        if (this.nbJoueursSlider.value() > this.nbJoueurs) {
            for (let i = this.nbJoueurs; i < this.nbJoueursSlider.value(); i++) {
                let joueurDiv = createDiv('');
                joueurDiv.addClass('joueur');
                joueurDiv.parent(this.conteneurJoueursAccueilDiv);
                this.joueursListeDiv.push(joueurDiv);

                let nomDuJoueurInput = createInput(' joueur ' + str(i + 1));
                nomDuJoueurInput.style('width', '100px')
                nomDuJoueurInput.parent(this.joueursListeDiv[i]);
                this.joueursNomsListeInput.push(nomDuJoueurInput);

                let couleurJoueurColorPicker = createColorPicker(color((Math.floor(i / 5) * 36 + 2 * 36 * i) % 360, 75, 100));
                couleurJoueurColorPicker.parent(this.joueursListeDiv[i]);
                this.joueursCouleursListeColor.push(couleurJoueurColorPicker);
            }
        } else if (this.nbJoueursSlider.value() < this.nbJoueurs) {
            for (let i = this.nbJoueurs - 1; i >= this.nbJoueursSlider.value(); i--) {
                this.joueursListeDiv[i].remove();
                this.joueursListeDiv[i].hide();
                this.joueursListeDiv.pop();
                this.joueursCouleursListeColor.pop();
                this.joueursNomsListeInput.pop();
            }
        }
        this.nbJoueurs = this.nbJoueursSlider.value();
        this.nbJoueursDiv.html("Nombre de joueurs : " + str(this.nbJoueursSlider.value()));
    }

    // Convertir la couleur du ColorPicker au format HSL
    hexToHSB(H) {
        // Convertir hex vers RGB
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
        }
        // Convertir RGB vers to HSB
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0)
            h += 360;
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return [h, s, l * 2];
    }

}
