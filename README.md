# quilt-canon-game

**Interactive browser game — walk the substrate, collect canon lore, hit the chord.**

## Quick start

Just open `game/index.html` in a browser. No build step. No npm install. Pure HTML5 + vanilla JS.

```bash
# Or serve it:
cd game && python3 -m http.server 8000
# Open http://localhost:8000
```

## How to play

- **Move**: arrow keys or WASD
- **Collect**: walk into a colored cell (cells with `✦` contain canon)
- **Score**: each canon = 100 points; revisits = 10; walking = 1
- **Win**: collect all 21 canon pieces
- **Inspect**: click any colored cell to see its lore

## Game mechanics

The grid is 16×16 (256 cells). About 40% of cells contain canon. Each canon piece is color-coded by its first doctrine:
- 🔴 red = `cells_are_scars`
- 🔵 blue = `witness_log_is_prediction`
- 🟢 green = `canon_gate_is_chord`
- 🟣 purple = `oracle_is_heard`
- 🟠 orange = `substrate_quantum`

The composite score is calculated by `score.js` — it's a JEV-mimic heuristic:
- 40% doctrine anchor coverage
- 30% total lore chars
- 30% distinct voice (≥3 doctrines)

Win when composite ≥ 0.5 (and you've collected all 21 pieces).

## Fleet integration

- **`quilt-canon-graph`** — sibling, knowledge graph view of the same canon
- **`quilt-canon-search`** — sibling, TF-IDF search over the same canon
- **`quilt-canon-mcp`** — sibling, MCP server for AI agents
- **`quilt-canon-radio`** — sibling, TTS broadcast
- **`quilt-egg`** — referenced for cell/relate mechanics
- **`quilt-spreadsheet`** — referenced for grid inspiration

## The 5 bedrock doctrines

1. `cells_are_scars` — every cell records an attempted entry
2. `witness_log_is_prediction` — the log IS the prediction
3. `canon_gate_is_chord` — canon passes when multiple agents agree
4. `oracle_is_heard` — JEV probes canon with multi-model consensus
5. `substrate_quantum` — the substrate is the walker; canon is substrate-aware

## Polyformalism canary

```bash
python -m canary
# → 0x24a555471370b18d
```

## License

MIT
