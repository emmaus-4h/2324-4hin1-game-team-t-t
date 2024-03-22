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
const KEY_w = 87;
const KEY_a = 65;
const KEY_s = 83;
const KEY_d = 68;
var spelStatus = SPELEN;

var spelerRichting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
var speler2Richting = 0; // 0 is omhoog, 45 is rechts, 90 is omlaag, 135 is links
var spelerX = 600; // x-positie van speler1
var spelerY = 600; // y-positie van speler1
var spelerX2 = 800; // x-positie van speler2
var spelerY2 = 600; // y-positie van speler2
var health = 200;  // health van speler
var snelheid = 4;  // snelheid van speler

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
   if (keyIsDown(LEFT_ARROW)) {
    spelerX = spelerX - snelheid;
     
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spelerX = spelerX + snelheid;
  }
  if (keyIsDown(UP_ARROW)) {
    spelerY = spelerY - snelheid;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spelerY = spelerY + snelheid;
  }
  
  // vijand
  if (keyIsDown(KEY_a)) {
    spelerX2 = spelerX2 - snelheid;
  }
  if (keyIsDown(KEY_d)) {
    spelerX2 = spelerX2 + snelheid;
  }
  if (keyIsDown(KEY_w)) {
    spelerY2 = spelerY2 - snelheid;
  }
  if (keyIsDown(KEY_s)) {
    spelerY2 = spelerY2 + snelheid;
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

  // botsing kogel tegen vijand

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
  if (keyIsDown(KEY_a) || keyIsDown(KEY_d)) {
    fill("red");
    rect(spelerX2 - 50, spelerY2 - 25, 100, 50);
    }
    if (keyIsDown(KEY_w) || keyIsDown(KEY_s)) {
      fill("red");
      rect(spelerX2 - 25, spelerY2 - 50, 50, 100);
      }
  fill("white");
  ellipse(spelerX2, spelerY2, 10, 10);
  // kogel

  // speler
  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
  fill("white");
  rect(spelerX - 50, spelerY - 25, 100, 50);
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
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

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('black');
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
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
  }
}
