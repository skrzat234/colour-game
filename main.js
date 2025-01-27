let hiddenColors = ["gray", "gray", "gray", "gray", "gray"];
let wybraneKolory = [null, null, null, null, null];
let availableColors = ["red", "green", "blue", "yellow", "purple"];
let cellSize = 60;
let numColors = 5;
let kliknietyKolor = null;
let isColorSelected = false;
let currentColor = null;
let circleRadius = 30;
let gracze = ["gracz1", "gracz2", "gracz3"];
let currentPlayer = 0;
let countdown = -1;
let countdownBox = null;

function setup() {
  createCanvas(600, 400);
  sekwencja = shuffle([...availableColors]).slice(0, numColors);
  console.log("losowa sekwencja:", sekwencja);
}

function draw() {
  background(220);

  // Rząd kolorów ukrytych
  fill(0);
  textSize(16);
  text("sekwencja do odgadniecia", 20, 30);
  for (let i = 0; i < numColors; i++) {
    fill(hiddenColors[i]);
    rect(100 + i * cellSize, 50, cellSize, cellSize);
  }

  // Kolory odgadywane
  text("kolory odgadywane", 20, 150);
  for (let i = 0; i < numColors; i++) {
    fill(wybraneKolory[i] || "white");
    rect(100 + i * cellSize, 170, cellSize, cellSize);
    stroke(0);
    noFill();
    rect(100 + i * cellSize, 170, cellSize, cellSize);
  }

  // Lista dostępnych kolorów
  text("paleta kolorow do wybrania", 20, 300);
  for (let i = 0; i < availableColors.length; i++) {
    fill(availableColors[i]);
    rect(100 + i * cellSize, 320, cellSize, cellSize);
  }

  // Timer odliczający
  if (countdown >= 0 && countdownBox !== null) {
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    let x = 100 + countdownBox * cellSize + cellSize / 2;
    let y = 170 + cellSize + 20;
    text(countdown, x, y);
  }

  // Kółko pod kursorem
  if (isColorSelected && currentColor !== null) {
    fill(currentColor);
    ellipse(mouseX, mouseY, circleRadius * 2, circleRadius * 2);
  }

  // Informacja o aktualnym graczu
  fill(0);
  textAlign(LEFT, BASELINE);
  text(`Kolej: ${gracze[currentPlayer]}`, 20, 380);
}

// Funkcja do obsługi kliknięcia na paletę kolorów
function wybierzKolor(kolor) {
  kliknietyKolor = kolor;
  currentColor = kolor;
  isColorSelected = true;
  console.log("Wybrano kolor:", kliknietyKolor);
}

// Funkcja do obsługi kliknięcia na planszę
function ustawKolor(idBox) {
  if (kliknietyKolor === null && gracze[currentPlayer] === "gracz1") {
    console.log("Najpierw wybierz kolor z palety!");
    return;
  }

  if (wybraneKolory[idBox] !== null) {
    console.log("To miejsce jest już zajęte!");
    return;
  }

  let kolorDoUstawienia =
    gracze[currentPlayer] === "gracz1" ? kliknietyKolor : botWybierzKolor();

  wybraneKolory[idBox] = kolorDoUstawienia;
  console.log(`${gracze[currentPlayer]} ustawił kolor ${kolorDoUstawienia} na pozycji ${idBox}`);

  let ustawionyKolor = kolorDoUstawienia;
  if (gracze[currentPlayer] === "gracz1") {
    kliknietyKolor = null;
    isColorSelected = false;
  }

  countdown = 2;
  countdownBox = idBox;

  const interval = setInterval(() => {
    countdown--;
    if (countdown < 0) {
      clearInterval(interval);
      countdownBox = null;

      if (ustawionyKolor === sekwencja[idBox]) {
        console.log("Kolor poprawny! Gracz kontynuuje swoją kolej.");
        usunKolorZPalety(ustawionyKolor);

        if (gracze[currentPlayer] !== "gracz1") {
          botTura(); // Bot kontynuuje swoją turę
        }
      } else {
        console.log("Kolor niepoprawny! Kolej przechodzi na następnego gracza.");
        wybraneKolory[idBox] = null;
        currentPlayer = (currentPlayer + 1) % gracze.length;
        if (gracze[currentPlayer] !== "gracz1") {
          botTura();
        }
      }
    }
  }, 1000);
}

function botWybierzKolor() {
  let index = Math.floor(Math.random() * availableColors.length);
  return availableColors[index];
}

function botWybierzPole() {
  let pustePola = wybraneKolory.map((kolor, i) => (kolor === null ? i : null)).filter(i => i !== null);
  let index = Math.floor(Math.random() * pustePola.length);
  return pustePola[index];
}

function botTura() {
  let pole = botWybierzPole();
  let kolor = botWybierzKolor();
  console.log(`Bot ${gracze[currentPlayer]} wybiera kolor ${kolor} i pole ${pole}`);
  ustawKolor(pole);
}

// Funkcja do usunięcia koloru z palety
function usunKolorZPalety(kolor) {
  const index = availableColors.indexOf(kolor);
  if (index !== -1) {
    availableColors.splice(index, 1);
    console.log("Usunięto kolor z palety:", kolor);
  }
}

function mousePressed() {
  if (gracze[currentPlayer] !== "gracz1") return;

  for (let i = 0; i < availableColors.length; i++) {
    let x = 100 + i * cellSize;
    let y = 320;
    if (mouseX > x && mouseX < x + cellSize && mouseY > y && mouseY < y + cellSize) {
      wybierzKolor(availableColors[i]);
    }
  }

  for (let i = 0; i < numColors; i++) {
    let x = 100 + i * cellSize;
    let y = 170;
    if (mouseX > x && mouseX < x + cellSize && mouseY > y && mouseY < y + cellSize) {
      ustawKolor(i);
    }
  }
}
