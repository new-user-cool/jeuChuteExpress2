let joueur = document.getElementById("rectangle_bleu");
/* de la même façon, à compléter */
let ennemi = document.getElementById("rectangle_rouge");
let scoreHTML = document.getElementById("score");
let bouton_droite = document.getElementById("bouton_droite");
let bouton_gauche = document.getElementById("bouton_gauche");
let bouton_musique = document.getElementById("bouton_musique");
let positionJoueur = 175;
let ennemiX = 175;
let ennemiY = 0;
let score = 0;
let vitesse = 30;
let intervalID = null; //solution pour agmenter la vitesse grâçe à ChatGPT



function deplacerJoueurClavier(event) {
	if (event.key == "ArrowRight") {
		deplacerDroite();
	}
	if (event.key == "ArrowLeft") {
		deplacerGauche();
	}
}

function deplacerDroite() {
	if (positionJoueur < 355) {
		positionJoueur += 20;
		joueur.style.left = positionJoueur + "px";
	}


}

function deplacerGauche() {
	if (positionJoueur > 15) {
		positionJoueur -= 20;
		joueur.style.left = positionJoueur + "px";
	}


}

function descendreEnnemi() {
	ennemiY +=5;
	ennemi.style.top = ennemiY +"px";
	if(ennemiY>400){
		if(ennemiX-positionJoueur<40 && positionJoueur-ennemiX<40){
			score+=1;
		}
		else{
			score-=1;
		}
		document.getElementById("score").innerHTML = score;
		ennemiY=0;
		passage_niveau_automatique();
		fin_jeu_un();
		ennemiX=Math.floor(Math.random()*360);
		ennemi.style.left = ennemiX+"px";
	}

}function lancerJeu(vitesse) { //ChatGPT
	if(score>=50){
		return;
	}
	if (intervalID !== null) {
		clearInterval(intervalID);// arrêter l’ancien intervalle s’il existe
	}
	intervalID = setInterval(descendreEnnemi, vitesse);// créer un nouveau
}

function levelOne(){
	lancerJeu(30);
	document.getElementById("Niveau").innerHTML = "Facile";
	}


function levelTwo(){
	lancerJeu(20);
	document.getElementById("Niveau").innerHTML = "Moyen";
}

function levelThree(){
	lancerJeu(13);
	document.getElementById("Niveau").innerHTML = "Difficile";
}

function passage_niveau_automatique(){
	if(score>=-10 && score<=14){
		levelOne();
	}
	if(score>=15 && score<=29){
		levelTwo();
	}
	if(score>=30){
		levelThree();
	}
}

function fin_jeu_un(){
	if(score>=50){
		fin_jeu_deux();
		document.getElementById("score").innerHTML="Vous avez gagné !";
	}
	if (score<=-10){
		fin_jeu_deux();
		document.getElementById("score").innerHTML="Vous avez perdu !";
	}
}

function fin_jeu_deux(){
	clearInterval(intervalID);
	intervalID =null;
	ennemiX =175;
	ennemiY = 0;
	ennemi.style.top = ennemiY +"px";
	ennemi.style.left = ennemiX + "px";
}

function startMusic(){
	const musique = document.getElementById("music");
	musique.play();
}

levelOne();

document.onkeydown = deplacerJoueurClavier;
bouton_droite.onclick = deplacerDroite;
bouton_gauche.onclick = deplacerGauche;
bouton_musique.onclick = startMusic;