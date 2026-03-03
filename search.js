// minMax is een functie die de score van een positie berekent door alle mogelijke zetten te doorlopen
// en de score van de resulterende posities te evalueren.
function minimax(board, depth, color) {

  if (depth === 0) {
    return evaluateBoard(board);
  }

  let moves = generateAllMoves(board, color);

  if (moves.length === 0) {
    return evaluateBoard(board);
  }

  if (color === "white") {

    let maxEval = -Infinity;

    for (let move of moves) {
      let newBoard = copyBoard(board);
      applyMove(newBoard, move);

      let score = minimax(newBoard, depth - 1, "black");
      maxEval = Math.max(maxEval, score);
    }

    return maxEval;

  } else {

    let minEval = Infinity;

    for (let move of moves) {
      let newBoard = copyBoard(board);
      applyMove(newBoard, move);

      let score = minimax(newBoard, depth - 1, "white");
      minEval = Math.min(minEval, score);
    }

    return minEval;
  }
}


// getBestMove is een functie die de beste zet vindt door alle mogelijke zetten te doorlopen en
// de score van de resulterende posities te evalueren met behulp van minimax.
function getBestMove(board, depth, color) {
  let bestMove = null;
  let bestValue = color === "white" ? -Infinity : Infinity;

  let moves = generateAllMoves(board, color);

  for (let move of moves) {

    let newBoard = copyBoard(board);
    applyMove(newBoard, move);

    let value = minimax(newBoard, depth - 1, color === "white" ? "black" : "white");

    if (color === "white") {
      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
    } else {
      if (value < bestValue) {
        bestValue = value;
        bestMove = move;
      }
    }
  }

  return bestMove;
}