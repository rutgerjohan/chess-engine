// 8x8 board
// Uppercase = White, lowercase = Black
// . = empty

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


function isWhite(piece) {
  return piece >= "A" && piece <= "Z";
}

function isBlack(piece) {
  return piece >= "a" && piece <= "z";
}

function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}




function makeMove(fromX, fromY, toX, toY, captured) {
  return {
    from: { x: fromX, y: fromY },
    to: { x: toX, y: toY },
    captured: captured
  };
}





function generatePawnMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  if (piece !== "P") return moves;

  // move forward
  if (inBounds(x, y - 1) && board[y - 1][x] === ".") {
    moves.push(makeMove(x, y, x, y - 1, "."));

    // double move from starting rank
    if (y === 6 && board[y - 2][x] === ".") {
      moves.push(makeMove(x, y, x, y - 2, "."));
    }
  }

  // captures
  for (let dx of [-1, 1]) {
    let nx = x + dx;
    let ny = y - 1;

    if (inBounds(nx, ny) && isBlack(board[ny][nx])) {
      moves.push(makeMove(x, y, nx, ny, board[ny][nx]));
    }
  }

  return moves;
}





function generateAllWhiteMoves(board) {
  let moves = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let piece = board[y][x];

      if (piece === "P") {
        moves.push(...generatePawnMoves(board, x, y));
      }
      // later: N, B, R, Q, K
    }
  }

  return moves;
}