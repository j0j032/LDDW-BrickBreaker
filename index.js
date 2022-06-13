const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const affichageScore = document.querySelector(".score");

// toutes mes const
const rayonBalle = 10,
  barreHeight = 10,
  barreWidth = 75,
  nbCol = 8,
  nbRow = 5,
  largeurBrique = 75,
  hauteurBrique = 20;

// toutes mes let
let x = canvas.width / 2,
  y = canvas.height - 30,
  barreX = (canvas.width - barreWidth) / 2,
  fin = false,
  vitesseX = 5,
  vitesseY = -5;

const dessineBalle = () => {
  ctx.beginPath();
  ctx.arc(x, y, rayonBalle, 0, Math.PI * 2);
  ctx.fillStyle = "#3245D9";
  ctx.fill();
  ctx.closePath();
};

const dessineBarre = () => {
  ctx.beginPath();
  ctx.rect(barreX, canvas.height - barreHeight - 2, barreWidth, barreHeight);
  ctx.fillStyle = "#4987D8";
  ctx.fill();
  ctx.closePath();
};

// Tableau avec toutes les briques

const briques = [];
for (let i = 0; i < nbRow; i++) {
  briques[i] = [];

  for (let j = 0; j < nbCol; j++) {
    briques[i][j] = { x: 0, y: 0, statut: 1 };
  }
}

console.log(briques);

const dessineBriques = () => {
  for (let i = 0; i < nbRow; i++) {
    for (let j = 0; j < nbCol; j++) {
      if (briques[i][j].statut === 1) {
        // 75*8 + 10 * 8 + 35 = 750 permet de determiner la place des briques pour s'adapter parfaitement à la taille de notre canvas qui fait 750px
        let briqueX = j * (largeurBrique + 10) + 35;
        let briqueY = i * (hauteurBrique + 10) + 30;

        briques[i][j].x = briqueX;
        briques[i][j].y = briqueY;

        ctx.beginPath();
        ctx.rect(briqueX, briqueY, largeurBrique, hauteurBrique);
        ctx.fillStyle = "#4987D8";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

//function recursive (s'appellle elle meme 60x par seconde)
function dessine() {
  if (fin === false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessineBriques();
    dessineBalle();
    dessineBarre();

    //faire rebondir la balle contre les murs latéraux
    if (x + vitesseX > canvas.width - rayonBalle || x + vitesseX < rayonBalle) {
      vitesseX = -vitesseX;
    }
    // contre le plafond
    if (y + vitesseY < rayonBalle) {
      vitesseY = -vitesseY;
    }

    // contre la raquette
    if (y + vitesseY > canvas.heigth - rayonBalle) {
      // un intervalle
      //0-75 si tt à gauche
      if (x > barreX && x < barreX + barreWidth) {
        vitesseX = vitesseX + 0.1; // +0.1 pour accelérer légèrement la balle
        vitesseY = vitesseY + 0.1;
        vitesseY = -vitesseY;
      } else {
        fin = true;
        affichageScore.innerHTML = `Perdu ! <br> Clique sur le casse brique pour recommencer.`;
      }
    }

    x += vitesseX;
    y += vitesseY;
    requestAnimationFrame(dessine);
  }
}
dessine();
console.log(affichageScore);

// Recommencer
canvas.addEventListener("click", () => {
  if (fin === true) {
    fin = false;
    document.location.reload();
  }
});
