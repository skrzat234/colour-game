let hiddenColors = ["gray", "gray", "gray", "gray", "gray"];
let guessColors = ["white", "white", "white", "white", "white"];
let availableColors = ["red", "green", "blue", "yellow", "purple"];
let cellSize = 60;
let numColors = 5;

function setup() {
  createCanvas(600, 400);
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

  // kolory odgadywane
  text("kolory odgadywane", 20, 150);
  for (let i = 0; i < numColors; i++) {
    fill(guessColors[i]);
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
}
