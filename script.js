/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
const PAUZE = 4;
const KEY_w = 87;
const KEY_a = 65;
const KEY_s = 83;
const KEY_d = 68;
const KEY_c = 67;
var spelStatus = UITLEG;

// Player variables
var spelerX = 0; 
var spelerY = 0; 
var spelerRichting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
var spelerSpringt = false; // of speler aan het springen is
var springSnelheid = 2; // hoe snel speler beweegt tijdens springen
var springSnelheidStart = 4; // snelheid bij starten van springen
var zwaartekracht = 0.2; // snelheid van de zwaartekracht

// Enemy variables
var vijanden = []; // Array to store enemy data
var vijandSnelheid = 4; 
var YminUp = 100; //  minimum y-positie van vijanden
var YmaxUp = 200; //  maximum y-positie van vijanden
var YminDown = 450; //  minimum y-positie van vijanden
var YmaxDown = 600; //  maximum y-positie van vijanden

// Game variables
var health = 0;  // health van speler
var points = 0; // punten van speler
var time = 0; // tijd van speler
var highscore = 0; // highscore van speler
var snelheid = 0;  // snelheid van speler

//photo's
var backgroundImage;


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */
function reset() {
  spelerX = 600;
  spelerY = 600;
  spelerRichting = 0;
  spelerSpringt = false;
  health = 200;
  snelheid = 4;
  points = 0;

  // Reset enemies
  vijanden = [
    { x: 1300, y: 200, richting: 0 }, 
    { x: 1800, y: 1000, richting: 0 }, 
    { x: 2400, y: 150, richting: 0 },
    { x: 2800, y: 400, richting: 0 }, 
    { x: 3200, y: 500, richting: 0 }, 
    { x: 3600, y: 350, richting: 0 } 
  ];
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // Speler
  if (keyIsDown(32)) {
    spelerSpringt = true;
    springSnelheid = springSnelheidStart;
    spelerRichting = 90;
  }
  if (spelerSpringt === true) {
    spelerY = spelerY - springSnelheid;
    springSnelheid = springSnelheid - zwaartekracht;
    // Check if player is outside the canvas
    if (spelerY < 100) {
      spelerY = 100; // Reset to the top
    }
    if (spelerY > height) { 
      spelerY = height; // Reset to the bottom
    }
    if (spelerY > 600) {
      spelerSpringt = false;
    }
  }

  // Vijanden
  for (let i = 0; i < vijanden.length; i++) {
    let vijand = vijanden[i];
    vijand.x = vijand.x - (vijandSnelheid - 1); 

    if (vijand.x < 0) {
      vijand.x = 1500;
      if (vijand.y < 300) {
        vijand.y = getRandomNumber(YminUp, YmaxUp);
      } else {
        vijand.y = getRandomNumber(YminDown, YmaxDown);
      }
    }
  }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 *d Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // Botsing speler tegen vijand
  for (let i = 0; i < vijanden.length; i++) {
    let vijand = vijanden[i];
    if (spelerX - vijand.x < 25 && spelerX - vijand.x > -25 && 
        spelerY - vijand.y < 100 && spelerY - vijand.y > -100) {
      console.log("botsing");
      health = health - 200;
    }
  }

  // Update punten en health
  if (spelStatus === SPELEN) {
    points = points + 0.02;
    time = Math.round(points); //gevraagd aan een AI chat bot hoe ik decimale getallen naar een hele getal kan veranderen
  }
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min + 1)) + min; //gevraagd aan een AI chat bot hoe ik een random getal kan genereren;  This scales the random decimal number to fit within the range.
}


function preload() {
  backgroundImage = loadImage("afbeeldingen/achtergrond_game.jpeg"); 
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  // Kleur de achtergrond zwart, zodat je het kunt zien
  background('red');
  reset();
}

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // Achtergrond

  // Vijanden
  for (let i = 0; i < vijanden.length; i++) {
    let vijand = vijanden[i];
    if (vijand.richting === 45 || vijand.richting === 135) {
      fill("red");
      rect(vijand.x - 50, vijand.y - 25, 100, 50);
    } else if (vijand.richting === 0 || vijand.richting === 90) {
      fill("red");
      rect(vijand.x - 25, vijand.y - 50, 50, 100);
    }
    fill("white");
    ellipse(vijand.x, vijand.y, 10, 10);
  }

  // Speler
  if (spelerRichting === 45 || spelerRichting === 135) {
    fill("white");
    rect(spelerX - 50, spelerY - 25, 100, 50);
  } else if (spelerRichting === 0 || spelerRichting === 90) {
    fill("white");
    rect(spelerX - 25, spelerY - 50, 50, 100);
  }
  fill("red");
  ellipse(spelerX, spelerY, 10, 10);

  // Punten en health
  if (spelStatus === SPELEN) {
    
    fill("white");
    textSize(50);
    text("Score: " + time, 10, 50);
    text("Highscore: " + highscore, 950, 50);
  }

  if (time > highscore) {
    highscore = time;
  }
};


/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {

  if (spelStatus === SPELEN) {
    background(backgroundImage); // Set the background image only when playing
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  if (keyIsDown(ESCAPE)) {
    spelStatus = PAUZE;
  };
  if (spelStatus === GAMEOVER) {
    background('black');
    console.log("GAME OVER");
    textSize(50);
    fill("white");
    text("Score: " + time, 10, 50);
    text("Highscore: " + highscore, 950, 50);
    text("GAME OVER", 280, 150);
    text("Druk op enter om naar startscherm te gaan", 280, 200);
    // teken game-over scherm
    if (keyIsDown(ENTER)) {
      spelStatus = UITLEG;

    };
  }
  if (spelStatus === PAUZE) {
    background('black');
    console.log("PAUZE");
    textSize(50);
    fill("white");
    text("Score: " + time, 10, 50);
    text("Highscore: " + highscore, 950, 50);
    text("Dit is het pauze menu.", 280, 150);
    text("Kies wat u wilt doen", 280, 200);
    text("Klik op de knop of gebruik de bij behoorende pijltjestoets.", 25, 250);
    fill("red");
    rect(250, 300, 400, 200);
    fill("black");
    text("PLAY", 375, 400);
    text("Linker <-", 375, 450);
    fill("red");
    rect(700, 300, 400, 200);
    fill("black");
    text("RESET", 825, 400);
    text("-> Rechter", 765, 450);
    // teken pauze scherm
    if (mouseIsPressed && mouseY > 300 && mouseY < 500 && mouseX > 250 && mouseX < 650 || keyIsDown(LEFT_ARROW)) {
      spelStatus = SPELEN;
    }
    if (mouseIsPressed && mouseY > 300 && mouseY < 500 && mouseX > 700 && mouseX < 1100 || keyIsDown(RIGHT_ARROW)) {
      spelStatus = SPELEN;
      
      reset();
    }
  }
  if (spelStatus === UITLEG) {
    background('black');
    console.log("uitleg");
    textSize(50);
    fill("white");
    text("Welkom bij de game,", 280, 150);
    text("Highscore: " + highscore, 950, 50);
    text("Druk op de knop of op 'C' om verder te gaan!", 280, 200);
    fill("red");
    rect(450, 300, 400, 200);
    fill("black");
    text("PLAY", 575, 420);
   
    // teken uitleg scherm
    if (mouseIsPressed && mouseY > 300 && mouseY < 500 && mouseX > 450 && mouseX < 850 || keyIsDown(KEY_c)) {
      spelStatus = SPELEN;
       
      reset();
    }
  }

}