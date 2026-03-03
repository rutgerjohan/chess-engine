// board.js is de file waarin het schaakbord wordt gedefinieerd. Het bord van 8x8 vakken.
// De stukken worden weergegeven als letters, kleine letters voor zwart en hoofdletters voor wit.
// Een punt is een leeg vak.

let board = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];


// Deze functies definieren de kleuren van de stukken
// inBounds functie controleert of een positie binnen het bord ligt
function isWhite(piece) {
  return piece >= "A" && piece <= "Z";
}

function isBlack(piece) {
  return piece >= "a" && piece <= "z";
}

function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}