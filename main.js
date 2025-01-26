let hiddenColors = ["gray", "gray", "gray", "gray", "gray"];
let guessColors = ["white", "white", "white", "white", "white"]; //do wywalenia
let availableColors = ["red", "green", "blue", "yellow", "purple"];
let cellSize = 60;
let numColors = 5;
let wybraneKolory = [null, null, null, null, null];
let kliknietyKolor = null;
let isColorSelected = false; // Zmienna do sprawdzania, czy kolor jest wybrany
let currentColor = null; // Przechowuje aktualnie wybrany kolor
let circleRadius = 30; // Promień kółka wokół kursora

function setup() {
  createCanvas(600, 400);
  sekwencja = shuffle([...availableColors]).slice(0, numColors);
  console.log("losowa sekwencja:", sekwencja); //F12
}

function draw() {
  background(220);

  // rzad kolorow ukrytych
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
    fill(wybraneKolory[i] || "white"); // Domyślny kolor to 'white', gdy null
    rect(100 + i * cellSize, 170, cellSize, cellSize);
    stroke(0);
    noFill();
    rect(100 + i * cellSize, 170, cellSize, cellSize);
  }

  // lista dostepnych kolorow
  text("paleta kolorow do wybrania", 20, 300);
  for (let i = 0; i < availableColors.length; i++) {
    fill(availableColors[i]);
    rect(100 + i * cellSize, 320, cellSize, cellSize);
  }

  // Kółko pod kursorem, jeśli kolor jest wybrany
  if (isColorSelected && currentColor !== null) {
    fill(currentColor);
    noStroke();
    ellipse(mouseX, mouseY, circleRadius * 2, circleRadius * 2); // Kółko pod kursorem
  }
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

  // Przypisanie wybranego koloru do odpowiedniego miejsca
  wybraneKolory[idBox] = kliknietyKolor;
  console.log("Ustawiono kolor:", kliknietyKolor, "na pozycji:", idBox);

  // Usunięcie koloru z palety
  usunKolorZPalety(kliknietyKolor);

  // Reset klikniętego koloru
  kliknietyKolor = null;
  isColorSelected = false; // Dezaktywowanie kółka
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
