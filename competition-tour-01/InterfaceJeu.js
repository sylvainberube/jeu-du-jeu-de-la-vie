.root {
    --noir: rgb(3,3,3);
    --bleu: rgb(18, 52 ,88);
    --beige: rgb(212,201,190);
    --blanc: rgb(241, 239, 236);
}

.conteneur-classement-joueurs {
    background-color: var(--bleu);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 10%;
    position: absolute;
    right : 0px;
    top: 33%;
    transform: translate(0, -50%);
    border-radius: 10px 0px 0px 10px;
}

.item-classement-joueurs {
    background-color: var(--blanc);
    width: 80%;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    font-size: 14pt;
    margin-bottom: 1px;
}

.titre-classement-joueurs {
    color: var(--blanc);
    background-color: var(--bleu);
    font-size: 16pt;
   text-align: center;
   width: 94%;
   border-radius: 10px 0px 0px 0px;
   order: -1;
}

.conteneur-classement-parties {
    background-color: var(--bleu);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;

    width: 10%;
    position: absolute;
    left : 0px;
    top: 33%;
    transform: translate(0, -50%);
    border-radius: 0px 10px 10px 0px;
    align-items: flex-end;
    justify-content: flex-start
}

.titre-classement-parties {
    background-color: var(--bleu);
    color: var(--blanc);
    font-size: 16pt;
    text-align: center;
    width: 100%;
    border-radius: 0px 10px 0px 0px;
    margin: 0px;
    border: none;
}

.item-classement-parties {
    background-color: var(--blanc);
    width: 80%;
    margin: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    font-size: 14pt;
    margin-bottom: 1px;
}


.encadre-temps-restant {
    background-color: var(--bleu);
    display: flex;
    width: 30% ;
    border-radius: 0px 0px 10px 10px;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}

.interieur-temps-restant {
    background-color: var(--blanc);
    margin-top: 5px;
    font-size: 14pt;
    width : 100%;
    border-radius: 0px 0px 10px 10x;
    padding: 10px;
    justify-self: center;
    text-align: center;
}

.tour {
    padding: 10px;
    color: var(--blanc);
    width: 12%;
}

.conteneur-bouton-recentrer {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    background-color: var(--blanc);
    background-color: var(--bleu);
    text-align: center;
    font-size: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    
    width: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    align-items: center;
    border-radius: 5px;
}

.icone-bouton-recentrer {
    font-size: 14pt;
    color : var(--noir);
    background-color: var(--blanc);
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
    width: 30px;
}