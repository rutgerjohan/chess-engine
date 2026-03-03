// minMax is een functie die de score van een positie berekent door alle mogelijke zetten te doorlopen
// en de score van de resulterende posities te evalueren.
function minimax(board, depth, maximizingPlayer) {
  if (depth === 0) {
    return evaluate(board);
  }

  let side = maximizingPlayer ? "white" : "black";
  let moves = generateAllMoves(board, side);

  if (maximizingPlayer) {
    let maxEval = -Infinity;

    for (let move of moves) {
      applyMove(board, move);
      let evalScore = minimax(board, depth - 1, false);
      undoMove(board, move);
      maxEval = Math.max(maxEval, evalScore);
    }

    return maxEval;
  } else {
    let minEval = Infinity;

    for (let move of moves) {
      applyMove(board, move);
      let evalScore = minimax(board, depth - 1, true);
      undoMove(board, move);
      minEval = Math.min(minEval, evalScore);
    }

    return minEval;
  }
}



// Deze functie doorloopt alle mogelijke zetten voor de witte stukken en gebruikt minimax om de score van elke zet te berekenen.
// De zet met de hoogste score wordt teruggegeven als de beste zet.
function getBestMove(board, depth) {
  let bestMove = null;
  let bestScore = -Infinity;

  let moves = generateAllMoves(board, "white");

  for (let move of moves) {
    applyMove(board, move);
    let score = minimax(board, depth - 1, false);
    undoMove(board, move);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}