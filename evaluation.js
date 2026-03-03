// Waarden van de stukken, negatief voor zwart en positief voor wit.
const pieceValues = {
  p: -100, n: -320, b: -330, r: -500, q: -900, k: -20000,
  P:  100, N:  320, B:  330, R:  500, Q:  900, K:  20000
};

// Deze functie berekent de score van een positie door alle stukken op het bord te tellen en hun waarden op te tellen.
// Bij 0,0 is de positie gelijk, - values betekent dat zwart beter is en + values betekent dat wit beter is.
function evaluate(board) {
  let score = 0;

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let piece = board[y][x];
      if (pieceValues[piece]) {
        score += pieceValues[piece];
      }
    }
  }

  return score;
}