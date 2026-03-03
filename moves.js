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



// Alle mogelijke zetten voor een witte pion.
// De functie kijkt eerst of er een pion op de gegeven positie staat.
// Daarna kijkt hij of er een lege plek is waar de pion naartoe kan en of er stukken van de tegenstander zijn die kunnen worden geslagen.
function generatePawnMoves(board, x, y) {
  let moves = []; // Hier maak je een lege array aan waarin de mogelijke zetten worden opgeslagen.
  let piece = board[y][x]; // Je definieerd welke piece door de y en x values door te geven.

  if (piece !== "P") return moves; // Als er geen witte pion (P) op de gegeven positie staat, return dan een lege array, oftewel er zijn geen mogelijke zetten.

  if (inBounds(x, y - 1) && board[y - 1][x] === ".") { // Als de positie recht voor de pion binnen het bord ligt en leeg is, voeg deze zet dan toe aan de moves array. Dit is belangrijk omdat pionnen alleen recht vooruit kunnen bewegen en niet vooruit kunnen slaan.
    moves.push(createMove(x, y, x, y - 1, "."));
    if (y === 6 && board[y - 2][x] === ".") { // Als de pion nog op zijn startpositie staat (y === 6) en de positie twee vakken vooruit ook leeg is, voeg dan deze zet toe aan de moves array. Dit is belangrijk omdat pionnen vanaf hun startpositie twee vakken vooruit kunnen bewegen.
      moves.push(createMove(x, y, x, y - 2, "."));
    }
  }

  for (let dx of [-1, 1]) { // Deze loop controleert de diagonale posities links en rechts van de pion. dx is een variabele die eerst -1 is (links) en daarna 1 (rechts).
    let nx = x + dx; // variabel nx = nieuwe x-positie (links of rechts)
    let ny = y - 1; // variabel ny = nieuwe y-positie (vooruit)
    if (inBounds(nx, ny) && isBlack(board[ny][nx])) { // Als de diagonale positie binnen het bord ligt en er een zwart stuk staat, voeg dan deze zet toe aan de moves array. Dit is belangrijk omdat pionnen diagonaal kunnen slaan.
      moves.push(createMove(x, y, nx, ny, board[ny][nx]));
    }
  }

  return moves; // Return de array met mogelijke zetten voor de pion op de gegeven positie.
}



// Alle mogelijke zetten voor een paard.
// Engine kijkt hij of er een lege plek is waar het paard naartoe kan en of er stukken van de tegenstander zijn die kunnen worden geslagen.
function generateKnightMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  const offsets = [
    [1,2],[2,1],[2,-1],[1,-2],
    [-1,-2],[-2,-1],[-2,1],[-1,2]
  ]; // Variabel die de L-vorm van het paard beschrijft

  for (let [dx, dy] of offsets) { // Deze loop controleert alle mogelijke L-vormen die net gedefinieerd zijn.
    let nx = x + dx;
    let ny = y + dy;

    if (!inBounds(nx, ny)) continue; // Als de nieuwe positie buiten het bord ligt, sla deze iteratie dan over.

    let target = board[ny][nx]; // Variabel target = of een stuk van zwart of een leeg vakje.
    if (target === "." ||
       (isWhite(piece) && isBlack(target)) ||
       (isBlack(piece) && isWhite(target))) {
      moves.push(createMove(x, y, nx, ny, target));
    }
  }

  return moves; // Return de array met mogelijke zetten voor de pion op de gegeven positie.
}



// Alle mogelijke zetten voor een loper.
// Engine kijkt hij of er een lege plek is waar de loper naartoe kan en of er stukken van de tegenstander zijn die kunnen worden geslagen.
function generateBishopMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  const directions = [
    [1,1],[1,-1],[-1,1],[-1,-1]
  ]; // Variabel die de diagonale richtingen beschrijft waarin de loper kan bewegen.

  for (let [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;

    while (inBounds(nx, ny)) {
      let target = board[ny][nx];

      if (target === ".") {
        moves.push(createMove(x, y, nx, ny, "."));
      } else { // Als er een stuk op de nieuwe positie staat, controleer dan of het een stuk van de tegenstander is dat geslagen kan worden.
        if ((isWhite(piece) && isBlack(target)) ||
            (isBlack(piece) && isWhite(target))) {
          moves.push(createMove(x, y, nx, ny, target));
        }
        break;
      }

      nx += dx;
      ny += dy; // Blijf in dezelfde richtingen bewegen totdat je een stuk tegenkomt of buiten het bord gaat.
    }
  }

  return moves;
}



// Alle mogelijke zetten voor toren.
// Engine kijkt hij of er een lege plek is waar de toren naartoe kan en of er stukken van de tegenstander zijn die kunnen worden geslagen.
function generateRookMoves(board, x, y) {
  let moves = [];
  let piece = board[y][x];

  const directions = [
    [1,0],[-1,0],[0,1],[0,-1]
  ]; // Variabel die de horizontale en verticale richtingen beschrijft waarin de toren kan bewegen.

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
    // Wederom zelfde functie om te checken of er een stuk in de weg staat en of het een stuk van de tegenstander is dat geslagen kan worden.
    // Blijf in dezelfde richtingen bewegen totdat je een stuk tegenkomt of buiten het bord gaat.
  }

  return moves;
}



// Alle mogelijke zetten voor dame.
// Engine kijkt hij of er een lege plek is waar de dame naartoe kan en of er stukken van de tegenstander zijn die kunnen worden geslagen.
// De dame beweegt als een toren en een loper tegelijk, dus we kunnen de functies van de toren en loper hergebruiken.
function generateQueenMoves(board, x, y) {
  return [
    ...generateRookMoves(board, x, y),
    ...generateBishopMoves(board, x, y)
  ];
}










// Deze functie genereert alle mogelijke zetten voor de gegeven kleur (side) op het bord.
function generateAllMoves(board, side) {
  let moves = [];

  for (let y = 0; y < 8; y++) { // Loop door alle rijen van het bord.
    for (let x = 0; x < 8; x++) { // Loop door alle kolommen van het bord.
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
      }
    }
  }

  return moves;
}



// Functie als helper om zetten leesbaar te maken.
function squareName(x, y) {
  const files = "abcdefgh"; // Definieerd kolommen a t/m h
  return files[x] + (8 - y); // De rijen worden van 8 naar 1 genummerd, dus we moeten 8 - y doen om de juiste rij te krijgen.
}

function describeMove(board, move) { // Deze functie neemt een move object en beschrijft deze in een leesbaar formaat, bijvoorbeeld "N: g1-f3" voor een paard dat van g1 naar f3 beweegt.
  let piece = board[move.from.y][move.from.x];
  let from = squareName(move.from.x, move.from.y);
  let to = squareName(move.to.x, move.to.y);
  let capture = move.captured !== "." ? "x" : "-";
  return `${piece}: ${from}${capture}${to}`;
}