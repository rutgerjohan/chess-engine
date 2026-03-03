// Waarden van de stukken, negatief voor zwart en positief voor wit.
const pieceValues = {
  p: -100, n: -320, b: -330, r: -500, q: -900, k: -20000,
  P:  100, N:  320, B:  330, R:  500, Q:  900, K:  20000
};

// Deze functie berekent de score van een positie door alle stukken op het bord te tellen en hun waarden op te tellen.
// Bij 0,0 is de positie gelijk, - values betekent dat zwart beter is en + values betekent dat wit beter is.


// function evaluateBoard(board) {
//   let score = 0;

//   for (let y = 0; y < 8; y++) {
//     for (let x = 0; x < 8; x++) {
//       let piece = board[y][x];
//       if (pieceValues[piece]) {
//         score += pieceValues[piece];
//       }
//     }
//   }

//   return score;
//   console.log(score);
// }



function evaluateBoard(board) {

  const pieceValues = {
    "P": 100, "N": 320, "B": 330,
    "R": 500, "Q": 900, "K": 20000,
    "p": -100, "n": -320, "b": -330,
    "r": -500, "q": -900, "k": -20000
  };

  let score = 0;

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {

      let piece = board[y][x];
      if (piece === ".") continue;

      score += pieceValues[piece] || 0;

      // Center bonus
      if (x >= 2 && x <= 5 && y >= 2 && y <= 5) {
        score += isWhite(piece) ? 20 : -20;
      }

      // Pawn advancement bonus
      if (piece === "P") {
        score += (6 - y) * 10;
      }
      if (piece === "p") {
        score -= (y - 1) * 10;
      }

      // Encourage knight + bishop development
      if (piece === "N" && y < 7) score += 15;
      if (piece === "n" && y > 0) score -= 15;

      // Slight penalty for early rook move
      if (piece === "R" && y === 7 && (x === 0 || x === 7)) score -= 10;
      if (piece === "r" && y === 0 && (x === 0 || x === 7)) score += 10;
    }
  }

  return score;
}