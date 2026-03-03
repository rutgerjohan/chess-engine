// play.js is de file waarin het spel wordt gespeeld. Hier wordt de hoofdloop van het spel gedefinieerd, waarbij de zetten worden gegenereerd, geëvalueerd en toegepast op het bord.

// Deze functie speelt een spel tussen twee AI's, waarbij de beste zet wordt berekend met behulp van minimax en de evaluatiefunctie.
// maxMoves bepaalt het maximum aantal zetten dat gespeeld wordt voordat het spel eindigt, en depth bepaalt hoe diep de minimax-functie zoekt.
function playGame(maxMoves = 100, depth = 2) {

  let currentTurn = "white";

  for (let moveNumber = 1; moveNumber <= maxMoves; moveNumber++) {

    let moves = generateAllMoves(board, currentTurn);

    if (moves.length === 0) {
      console.log("Game over!");
      console.log(currentTurn + " has no legal moves.");
      break;
    }

    let bestMove = getBestMove(board, depth, currentTurn);

    if (!bestMove) {
      console.log("No move found.");
      break;
    }

    let movedPiece = board[bestMove.from.y][bestMove.from.x];

    console.log(
      moveNumber + ".",
      currentTurn,
      movedPiece,
      squareName(bestMove.from.x, bestMove.from.y),
      "->",
      squareName(bestMove.to.x, bestMove.to.y)
    );

    applyMove(board, bestMove);

    printBoard();

    currentTurn = currentTurn === "white" ? "black" : "white";
  }

  console.log("Finished.");
}



// Deze functie converteert de coördinaten van een vakje naar de standaard schaaknotatie (bijv. a1, e4, h8).
function squareName(x, y) {
  const files = "abcdefgh";
  return files[x] + (8 - y);
}



// Deze functie print het bord in de console, waarbij elk vakje wordt gescheiden door een spatie en elke rij op een nieuwe regel staat.
function printBoard() {
  console.log(
    board.map(row => row.join(" ")).join("\n")
  );
  console.log("\n-----------------\n");
}


// Start het spel met een maximum van 50 zetten en een zoekdiepte van 2.
playGame(25, 3);