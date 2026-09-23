# Canon — quilt-canon-game

## What this tool is

An interactive browser game. The player IS a substrate walker, moving across a 16×16 grid. Some cells hold canon lore. Walking into a canon cell activates it (collects it). Win by collecting all 21 canon pieces.

## How it proves itself

**It runs.** Open `game/index.html` in any browser. Pure HTML5 + vanilla JS. No build, no dependencies. Tested with 6 tests in `run_tests.py`.

**It polyformalisms.** The canary hash `0x24a555471370b18d` matches across the fleet's 5 ports.

**It measures.** Composite score (JEV-mimic) gates progression:
- 40% doctrine anchor coverage
- 30% total lore chars
- 30% distinct voice (≥3 doctrines)
- Win threshold: composite ≥ 0.5

## Doctrines it instantiates

- **cells_are_scars** — every cell on the grid is a scar; the player's visited cells light up
- **witness_log_is_prediction** — visiting a canon cell "predicts" your future visits
- **oracle_is_heard** — the composite score IS the chord
- **substrate_quantum** — the grid is the substrate; the player is the walker; canon is what they collect

## Game mechanics

- 16×16 grid (256 cells)
- ~40% canon density (random per cell)
- 21 unique canon pieces (color-coded by first doctrine)
- Arrow keys / WASD to move
- Click cells to inspect
- Composite scoring mimics JEV verification

## Fleet usage

- **`quilt-canon-graph`** — sibling, knowledge graph
- **`quilt-canon-search`** — sibling, TF-IDF search
- **`quilt-canon-mcp`** — sibling, MCP server
- **`quilt-canon-radio`** — sibling, TTS broadcast
- **`quilt-egg`** — referenced for cell mechanics
- **`quilt-spreadsheet`** — referenced for grid inspiration
