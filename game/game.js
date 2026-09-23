// Game state and movement logic for the substrate walker
const GRID_SIZE = 16;
const DOCTRINE_PER_CELL_CHANCE = 0.4;  // 40% of cells have canon

let grid = [];  // 2D array of cells
let player = { x: 0, y: 0, score: 0, canon_collected: [], visited: new Set() };

function initGrid() {
  grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const hasCanon = Math.random() < DOCTRINE_PER_CELL_CHANCE;
      const canon = hasCanon
        ? CANON_PIECES[Math.floor(Math.random() * CANON_PIECES.length)]
        : null;
      row.push({ x, y, canon, doctrine_color: canon ? DOCTRINE_COLORS[canon.doctrines[0]] : "#1e293b" });
    }
    grid.push(row);
  }
  // Reset player
  player = { x: 0, y: 0, score: 0, canon_collected: [], visited: new Set(["0,0"]) };
}

function getCell(x, y) {
  if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;
  return grid[y][x];
}

function move(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;
  const cell = getCell(nx, ny);
  if (!cell) return { moved: false, reason: "out of bounds" };

  player.x = nx;
  player.y = ny;
  player.visited.add(`${nx},${ny}`);

  // Activate canon if cell has it
  if (cell.canon) {
    if (!player.canon_collected.find(c => c.name === cell.canon.name)) {
      player.canon_collected.push(cell.canon);
      player.score += 100;
    } else {
      player.score += 10;  // revisit
    }
  } else {
    player.score += 1;  // walking
  }

  return { moved: true, cell, canon_collected: cell.canon ? true : false };
}

function getProgress() {
  return {
    canon_collected: player.canon_collected.length,
    canon_total: CANON_PIECES.length,
    percent_complete: (player.canon_collected.length / CANON_PIECES.length * 100).toFixed(1),
    score: player.score,
    position: { x: player.x, y: player.y },
    cells_visited: player.visited.size,
    cells_total: GRID_SIZE * GRID_SIZE,
    is_winner: player.canon_collected.length === CANON_PIECES.length
  };
}

if (typeof module !== "undefined") {
  module.exports = { initGrid, getCell, move, getProgress, GRID_SIZE, player };
}
