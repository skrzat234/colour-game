let hiddenColors = ["gray", "gray", "gray", "gray", "gray"];
let wybraneKolory = [null, null, null, null, null];
let availableColors = ["red", "green", "blue", "yellow", "purple"];
let cellSize = 60;
let numColors = 5;
let kliknietyKolor = null;
let isColorSelected = false;
let currentColor = null;
let circleRadius = 30; // Promień kółka wokół kursora
let gracze = ["gracz1", "gracz2", "gracz3"];
let currentPlayer = 0; // Indeks obecnego gracza

function setup() {
  createCanvas(600, 400);
  sekwencja = shuffle([...availableColors]).slice(0, numColors);
  console.log("losowa sekwencja:", sekwencja); //F12
}

function draw() {
  background(220);

  // rzad kolorow ukrytych
  fill(0); // Czarny kolor tekstu
  stroke(0); // Czarna ramka
  textSize(16);
  text("sekwencja do odgadniecia", 20, 30);
  for (let i = 0; i < numColors; i++) {
    fill(hiddenColors[i]);
    rect(100 + i * cellSize, 50, cellSize, cellSize);
  }

  // Kolory odgadywane
  fill(0); // Czarny kolor tekstu
  stroke(0); // Czarna ramka
  text("kolory odgadywane", 20, 150);
  for (let i = 0; i < numColors; i++) {
    fill(wybraneKolory[i] || "white"); // Domyślny kolor to 'white', gdy null
    rect(100 + i * cellSize, 170, cellSize, cellSize);
    stroke(0);
    noFill();
    rect(100 + i * cellSize, 170, cellSize, cellSize);
  }

  // lista dostepnych kolorow
  fill(0); // Czarny kolor tekstu
  stroke(0); // Czarna ramka
  text("paleta kolorow do wybrania", 20, 300);
  for (let i = 0; i < availableColors.length; i++) {
    fill(availableColors[i]);
    rect(100 + i * cellSize, 320, cellSize, cellSize);
  }

  // Kółko pod kursorem, jeśli kolor jest wybrany
  if (isColorSelected && currentColor !== null) {
    fill(currentColor);
    ellipse(mouseX, mouseY, circleRadius * 2, circleRadius * 2); // Kółko pod kursorem
  }

  // Informacja o aktualnym graczu
  fill(0);
  text(`Kolej: ${gracze[currentPlayer]}`, 20, 380);
}

// Funkcja do obsługi kliknięcia na palecie kolorów
function wybierzKolor(kolor) {
  kliknietyKolor = kolor;
  currentColor = kolor; // Ustawienie koloru na ten, który został wybrany
  isColorSelected = true; // Uaktywnienie kółka wokół kursora
  console.log("Wybrano kolor:", kliknietyKolor);
}

// Funkcja do obsługi kliknięcia na białe miejsce na planszy
function ustawKolor(idBox) {
  if (kliknietyKolor === null) {
    console.log("Najpierw wybierz kolor z palety!");
    return;
  }

  if (wybraneKolory[idBox] !== null) {
    console.log("To miejsce jest już zajęte!");
    return;
  }

  // Tymczasowe ustawienie koloru
  wybraneKolory[idBox] = kliknietyKolor;
  console.log(`${gracze[currentPlayer]} ustawił kolor ${kliknietyKolor} na pozycji ${idBox}`);

  let ustawionyKolor = kliknietyKolor; // Zachowanie klikniętego koloru
  kliknietyKolor = null; // Resetowanie wybranego koloru
  isColorSelected = false;

  // Sprawdzenie poprawności po 2 sekundach
  setTimeout(() => {
    if (ustawionyKolor === sekwencja[idBox]) {
      console.log("Kolor poprawny! Gracz kontynuuje swoją kolej.");
      usunKolorZPalety(ustawionyKolor); // Usuwanie koloru z palety
    } else {
      console.log("Kolor niepoprawny! Kolej przechodzi na następnego gracza.");
      wybraneKolory[idBox] = null; // Usuwanie koloru
      currentPlayer = (currentPlayer + 1) % gracze.length; // Przełączanie gracza
    }
  }, 2000);
}

// Funkcja do usunięcia koloru z palety
function usunKolorZPalety(kolor) {
  const index = availableColors.indexOf(kolor);
  if (index !== -1) {
    availableColors.splice(index, 1); // Usuwa kolor z palety
    console.log("Usunięto kolor z palety:", kolor);
  }
}

function mousePressed() {
  // Sprawdzanie kliknięcia na paletę kolorów
  for (let i = 0; i < availableColors.length; i++) {
    let x = 100 + i * cellSize;
    let y = 320;
    if (mouseX > x && mouseX < x + cellSize && mouseY > y && mouseY < y + cellSize) {
      wybierzKolor(availableColors[i]);
    }
  }

  // Sprawdzanie kliknięcia na białe pola
  for (let i = 0; i < numColors; i++) {
    let x = 100 + i * cellSize;
    let y = 170;
    if (mouseX > x && mouseX < x + cellSize && mouseY > y && mouseY < y + cellSize) {
      ustawKolor(i);
    }
  }
}
