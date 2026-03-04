// In de moves.js file komen functies waarmee ik eerst. definieer hoe de stukken bewegen.



// Onderstaande functie is de gemene deler. De zetten van alle stukken worden op deze manier aangegeven.
// De functie pakt eerst de beginpositie met (fromX, fromY) en daarna de eindpositie (toX, toY).
// Ook wordt er aangegeven wat er gecaptured wordt, in de code geldt een leeg vakje ook als capture, maar dan met een ".".
// Deze functie maakt het makkelijker om de zetten te beschrijven en te debuggen.
function createMove(fromX, fromY, toX, toY, captured) {
  return {
    from: { x: fromX, y: fromY },
    to: { x: toX, y: toY },
    captured: captured
  };
}



// PAWNS
function generatePawnMoves(board, x, y) {
  let moves = []; // Hier maak je een lege array aan waarin de mogelijke zetten worden opgeslagen.
  let piece = board[y][x]; // Je definieerd welke piece door de y en x values door te geven.

  if (piece !== "P") return moves; // Als er geen witte pion (P) op de gegeven positie staat, return dan een lege array, oftewel er zijn geen mogelijke zetten.

  // Beweegt vooruit, kan niet vooruit slaan en kan vanaf de startpositie twee vakken vooruit bewegen.
  if (inBounds(x, y - 1) && board[y - 1][x] === ".") {
    moves.push(createMove(x, y, x, y - 1, "."));
    if (y === 6 && board[y - 2][x] === ".") {
      moves.push(createMove(x, y, x, y - 2, "."));
    }
  }

  // Diagonaal slaan
  for (let dx of [-1, 1]) {
    let nx = x + dx;
    let ny = y - 1;
    if (inBounds(nx, ny) && isBlack(board[ny][nx])) {
      moves.push(createMove(x, y, nx, ny, board[ny][nx]));
    }
  }

  return moves;
}


// KNIGHT
function generateKnightMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  // Variabel die de L-vorm van het paard beschrijft
  const offsets = [
    [1,2],[2,1],[2,-1],[1,-2],
    [-1,-2],[-2,-1],[-2,1],[-1,2]
  ];

  // Deze loop controleert alle mogelijke L-vormen die net gedefinieerd zijn.
  for (let [dx, dy] of offsets) {
    let nx = x + dx;
    let ny = y + dy;

    if (!inBounds(nx, ny)) continue;

    let target = board[ny][nx];
    if (target === "." ||
       (isWhite(piece) && isBlack(target)) ||
       (isBlack(piece) && isWhite(target))) {
      moves.push(createMove(x, y, nx, ny, target));
    }
  }

  return moves;
}


// BISHOP
function generateBishopMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  const directions = [
    [1,1],[1,-1],[-1,1],[-1,-1]
  ];

  for (let [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;

    while (inBounds(nx, ny)) {
      let target = board[ny][nx];

      // Als er een stuk op de nieuwe positie staat, controleer dan of het een stuk van de tegenstander is dat geslagen kan worden.
      if (target === ".") {
        moves.push(createMove(x, y, nx, ny, "."));
      } else {
        if ((isWhite(piece) && isBlack(target)) ||
            (isBlack(piece) && isWhite(target))) {
          moves.push(createMove(x, y, nx, ny, target));
        }
        break;
      }

      nx += dx;
      ny += dy;
    }
  }

  return moves;
}


// ROOK
function generateRookMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  const directions = [
    [1,0],[-1,0],[0,1],[0,-1]
  ];

  for (let [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;

    while (inBounds(nx, ny)) {
      let target = board[ny][nx];

      if (target === ".") {
        moves.push(createMove(x, y, nx, ny, "."));
      } else {
        if ((isWhite(piece) && isBlack(target)) ||
            (isBlack(piece) && isWhite(target))) {
          moves.push(createMove(x, y, nx, ny, target));
        }
        break;
      }

      nx += dx;
      ny += dy;
    }
  }

  return moves;
}


// QUEEN
function generateQueenMoves(board, x, y) {
  return [
    ...generateRookMoves(board, x, y),
    ...generateBishopMoves(board, x, y)
  ];
}


// KING
function generateKingMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  const offsets = [
    [1,0],[-1,0],[0,1],[0,-1],
    [1,1],[1,-1],[-1,1],[-1,-1]
  ];

  for (let [dx, dy] of offsets) {
    let nx = x + dx;
    let ny = y + dy;

    if (!inBounds(nx, ny)) continue;

    let target = board[ny][nx];

    if (target === "." ||
       (isWhite(piece) && isBlack(target)) ||
       (isBlack(piece) && isWhite(target))) {
      moves.push(createMove(x, y, nx, ny, target));
    }
  }

  return moves;
}





// Deze functie genereert alle mogelijke zetten voor zowel wit als zwart
function generateAllMoves(board, side) {
  let moves = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let piece = board[y][x];
      if (piece === ".") continue; // Geen stukken = sla over

      if (side === "white" && !isWhite(piece)) continue; // Als kleur wit is en het stuk is niet wit = sla over
      if (side === "black" && !isBlack(piece)) continue; // Als kleur zwart is en het stuk is niet zwart = sla over

      switch (piece.toLowerCase()) { // Gebruik toLowerCase() om zowel witte als zwarte stukken te kunnen herkennen, aangezien de functies voor zetten alleen kleine letters gebruiken.
        case "p":
          moves.push(...generatePawnMoves(board, x, y));
          break;
        case "n":
          moves.push(...generateKnightMoves(board, x, y));
          break;
        case "b":
          moves.push(...generateBishopMoves(board, x, y));
          break;
        case "r":
          moves.push(...generateRookMoves(board, x, y));
          break;
        case "q":
          moves.push(...generateQueenMoves(board, x, y));
          break;
        case "k":
          moves.push(...generateKingMoves(board, x, y));
          break;
      }
    }
  }
  return moves;
}





// Functies als helpers om zetten leesbaar te maken.
function squareName(x, y) {
  const files = "abcdefgh";
  return files[x] + (8 - y);
}


function describeMove(board, move) { // Deze functie neemt een move object en beschrijft deze in een leesbaar formaat, bijvoorbeeld "N: g1-f3" voor een paard dat van g1 naar f3 beweegt.
  let piece = board[move.from.y][move.from.x];
  let from = squareName(move.from.x, move.from.y);
  let to = squareName(move.to.x, move.to.y);
  let capture = move.captured !== "." ? "x" : "-";
  return `${piece}: ${from}${capture}${to}`;
}


// Funtie applyMove past een zet toe op het bord. Het verplaatst het stuk van de beginpositie naar de eindpositie en vervangt de beginpositie door een leeg vakje.
// Als er een pion wordt gepromoveerd, wordt deze vervangen door een dame.
function applyMove(board, move) {
  let piece = board[move.from.y][move.from.x];
  board[move.to.y][move.to.x] = piece;
  board[move.from.y][move.from.x] = ".";

  // Pawn promotion
  if (piece === "P" && move.to.y === 0) {
  board[move.to.y][move.to.x] = "Q";
  }

  if (piece === "p" && move.to.y === 7) {
  board[move.to.y][move.to.x] = "q";
  }
}


function undoMove(board, move) {
  let piece = board[move.to.y][move.to.x];
  board[move.from.y][move.from.x] = piece;
  board[move.to.y][move.to.x] = move.captured;
}



// Console log om moves te checken
// let moves = generateAllMoves(board, "white");
// moves.forEach(m => console.log(describeMove(board, m)));