// window.onload = function () {
//     let currentTurn = "white";
    

//   const canvas = document.getElementById("board");
//   const ctx = canvas.getContext("2d");

//   const squareSize = 60;
//   let selectedSquare = null;
//   let legalMoves = [];

//   const pieceSymbols = {
//     "P": "♙", "N": "♘", "B": "♗", "R": "♖", "Q": "♕", "K": "♔",
//     "p": "♟", "n": "♞", "b": "♝", "r": "♜", "q": "♛", "k": "♚"
//   };

//   function drawBoard() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (let y = 0; y < 8; y++) {
//       for (let x = 0; x < 8; x++) {

//         // Board colors
//         ctx.fillStyle = (x + y) % 2 === 0 ? "#f0d9b5" : "#b58863";
//         ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

//         // Highlight selected square
//         if (selectedSquare && selectedSquare.x === x && selectedSquare.y === y) {
//           ctx.fillStyle = "rgba(0,0,255,0.4)";
//           ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
//         }

//         // Highlight legal moves
//         legalMoves.forEach(move => {
//           if (move.to.x === x && move.to.y === y) {
//             ctx.beginPath();
//             ctx.arc(
//               x * squareSize + squareSize / 2,
//               y * squareSize + squareSize / 2,
//               10,
//               0,
//               Math.PI * 2
//             );
//             ctx.fillStyle = "rgba(0,255,0,0.6)";
//             ctx.fill();
//           }
//         });

//         // Draw piece
//         let piece = board[y][x];
//         if (piece !== ".") {
//           ctx.font = "40px Arial";
//           ctx.textAlign = "center";
//           ctx.textBaseline = "middle";
//           ctx.fillStyle = isWhite(piece) ? "white" : "black";
//           ctx.fillText(
//             pieceSymbols[piece],
//             x * squareSize + squareSize / 2,
//             y * squareSize + squareSize / 2
//           );
//         }
//       }
//     }
//   }

//   canvas.addEventListener("click", function (e) {

//     let rect = canvas.getBoundingClientRect();
//     let x = Math.floor((e.clientX - rect.left) / squareSize);
//     let y = Math.floor((e.clientY - rect.top) / squareSize);

//     let clickedPiece = board[y][x];

//     // Select piece
//     if (!selectedSquare) {

//       if (
//   clickedPiece !== "." &&
//   ((currentTurn === "white" && isWhite(clickedPiece)) ||
//    (currentTurn === "black" && isBlack(clickedPiece)))
// ) {
//         selectedSquare = { x, y };

//         let allMoves = generateAllMoves(board, "white");
//         legalMoves = allMoves.filter(m =>
//           m.from.x === x && m.from.y === y
//         );
//       }

//     } else {

//       // Try to make move
//       let move = legalMoves.find(m =>
//         m.to.x === x && m.to.y === y
//       );

//       if (move) {
//         let movedPiece = board[move.from.y][move.from.x];
//         applyMove(board, move);
//         addMoveToList(move, movedPiece);
//         currentTurn = currentTurn === "white" ? "black" : "white";

//         if (currentTurn === "black") {
//             let engineMove = getBestMove(board, 2);
//         if (engineMove) {
//             let movedPiece = board[engineMove.from.y][engineMove.from.x];
//             applyMove(board, engineMove);
//             addMoveToList(engineMove, movedPiece);
//         }
//   currentTurn = "white";
// }
//       }

//       selectedSquare = null;
//       legalMoves = [];
//     }

//     drawBoard();
//   });

//   drawBoard();
// };


// function squareName(x, y) {
//   const files = "abcdefgh";
//   return files[x] + (8 - y);
// }

// function addMoveToList(move, piece) {
//   let list = document.getElementById("moveList");

//   let from = squareName(move.from.x, move.from.y);
//   let to = squareName(move.to.x, move.to.y);

//   let text = piece + ": " + from + "-" + to;

//   let item = document.createElement("li");
//   item.textContent = text;
//   list.appendChild(item);
// }