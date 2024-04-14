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
var spelStatus = UITLEG;

var spelerRichting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
var speler2Richting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
var spelerX = 0; // x-positie van speler1
var spelerY = 0; // y-positie van speler1
var spelerX2 = 0; // x-positie van speler2
var spelerY2 = 0; // y-positie van speler2
var health = 0;  // health van speler
var snelheid = 0;  // snelheid van speler

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */
function reset(){

   spelerRichting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
   speler2Richting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
   spelerX = 600; // x-positie van speler1
   spelerY = 600; // y-positie van speler1
   spelerX2 = 800; // x-positie van speler2
   spelerY2 = 600; // y-positie van speler2
   health = 200;  // health van speler
   snelheid = 4;  // snelheid van speler
}
/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
   if (keyIsDown(LEFT_ARROW)) {
    spelerX = spelerX - snelheid;
     spelerRichting = 135;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spelerX = spelerX + snelheid;
    spelerRichting = 45;
  }
  if (keyIsDown(UP_ARROW)) {
    spelerY = spelerY - snelheid;
    spelerRichting = 0;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spelerY = spelerY + snelheid;
    spelerRichting = 90;
  }
  
  // vijand
  if (keyIsDown(KEY_a)) {
    spelerX2 = spelerX2 - snelheid;
    speler2Richting = 135;
  }
  if (keyIsDown(KEY_d)) {
    spelerX2 = spelerX2 + snelheid;
    speler2Richting = 45;
  }
  if (keyIsDown(KEY_w)) {
    spelerY2 = spelerY2 - snelheid;
    speler2Richting = 0;
  }
  if (keyIsDown(KEY_s)) {
    spelerY2 = spelerY2 + snelheid;
    speler2Richting = 90;
  }
  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 *d Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
if (spelerX - spelerX2 < 50 && spelerX - spelerX2 > -50 ) {
console.log("botsing");
  health = health - 200;
}
  // botsing kogel tegen vijandw

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("black");
  rect(0, 0, 1280, 720);
  // vijand
  if (speler2Richting === 45 || speler2Richting === 135) {
    fill("red");
    rect(spelerX2 - 50, spelerY2 - 25, 100, 50);
    }
    if (speler2Richting === 0 || speler2Richting === 90) {
      fill("red");
      rect(spelerX2 - 25, spelerY2 - 50, 50, 100);
      }
  fill("white");
  ellipse(spelerX2, spelerY2, 10, 10);
  // kogel

  // speler
  if (spelerRichting === 45 || spelerRichting === 135) {
  fill("white");
  rect(spelerX - 50, spelerY - 25, 100, 50);
  }
  if (spelerRichting === 0 || spelerRichting === 90) {
    fill("white");
    rect(spelerX - 25, spelerY - 50, 50, 100);
    }
  
  fill("red");
  ellipse(spelerX, spelerY, 10, 10);
  
  
  // punten en health

};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond zwart, zodat je het kunt zien
  background('black');
  reset();
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  if ( keyIsDown(ESCAPE)) {
    spelStatus = PAUZE;
  };
  if (spelStatus === GAMEOVER) {
    background('black');
    console.log("GAME OVER");
    textSize(50);
    fill("white");
    text("GAME OVER" , 280, 150);
    text("Druk op enter om naar startscherm te gaan" , 280, 200);
    // teken game-over scherm
    if ( keyIsDown(ENTER)) {
      spelStatus = UITLEG;
      
    };
  }
  if (spelStatus === PAUZE) {
    background('black');
    console.log("PAUZE");
    textSize(50);
    fill("white");
    text("Dit is het pauze menu." , 280, 150);
    text("Kies wat u wilt doen;" , 280, 200);
    fill("red");
    rect(250, 300, 400, 200);
    fill("black");
    text("PLAY" , 375, 420);
    fill("red");
    rect(700, 300, 400, 200);
    fill("black");
    text("RESET" , 825, 420);
    // teken pauze scherm
    if (mouseIsPressed && mouseY > 300 && mouseY < 500 && mouseX > 250 && mouseX < 650) {
      spelStatus = SPELEN;
    } 
    if (mouseIsPressed && mouseY > 300 && mouseY < 500 && mouseX > 700 && mouseX < 1100) {
      spelStatus = SPELEN;
      reset();
    }
  }
  if (spelStatus === UITLEG) {
    background('black');
    console.log("uitleg");
    textSize(50);
    fill("white");
    text("Welkom bij de game," , 280, 150);
    text("Druk op de knop om verder te gaan!" , 280, 200);
    fill("red");
    rect(450, 300, 400, 200);
  fill("black");
    text("PLAY" , 575, 420);
    // teken uitleg scherm
    if (mouseIsPressed && mouseY > 300 && mouseY < 500 && mouseX > 450 && mouseX < 850) {
      spelStatus = SPELEN;
      reset();
    }
  }
}
