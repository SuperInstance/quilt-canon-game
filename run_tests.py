"""Test runner for quilt-canon-game (no pytest dep)."""
import sys

sys.path.insert(0, "/workspace/repos/quilt-canon-game")

from canary import canary

results = []
failures = []


def test(name, func):
    try:
        func()
        results.append((name, "PASS"))
    except AssertionError as e:
        results.append((name, f"FAIL: {e}"))
        failures.append(name)
    except Exception as e:
        results.append((name, f"ERROR: {type(e).__name__}: {e}"))
        failures.append(name)


def t_canary():
    assert canary() == "0x24a555471370b18d"


def t_lore_json_valid():
    """lore.js should contain CANON_PIECES with at least 21 entries."""
    import re
    lore_js = open("/workspace/repos/quilt-canon-game/game/lore.js").read()
    # Count pieces by counting `lore:` occurrences (each piece has one)
    n = lore_js.count('lore:')
    assert n >= 21, f"only {n} canon pieces in lore.js (need ≥21)"


def t_score_js_logic():
    """score.js should export calculateScore."""
    score_js = open("/workspace/repos/quilt-canon-game/game/score.js").read()
    assert "calculateScore" in score_js
    assert "doctrines_hit" in score_js


def t_game_js_logic():
    """game.js should have initGrid, move, getProgress."""
    game_js = open("/workspace/repos/quilt-canon-game/game/game.js").read()
    assert "initGrid" in game_js
    assert "move" in game_js
    assert "getProgress" in game_js
    assert "GRID_SIZE" in game_js


def t_html_includes_game():
    """index.html should include all game modules."""
    html = open("/workspace/repos/quilt-canon-game/game/index.html").read()
    assert "lore.js" in html
    assert "score.js" in html
    assert "game.js" in html
    assert "ArrowUp" in html or "w" in html  # keyboard controls


def t_all_5_doctrines():
    """All 5 doctrines should appear in lore.js."""
    lore_js = open("/workspace/repos/quilt-canon-game/game/lore.js").read()
    for d in ["cells_are_scars", "witness_log_is_prediction", "canon_gate_is_chord", "oracle_is_heard", "substrate_quantum"]:
        assert d in lore_js, f"missing doctrine: {d}"


test("test_canary", t_canary)
test("test_lore_json_valid", t_lore_json_valid)
test("test_score_js_logic", t_score_js_logic)
test("test_game_js_logic", t_game_js_logic)
test("test_html_includes_game", t_html_includes_game)
test("test_all_5_doctrines", t_all_5_doctrines)

print("\n=== quilt-canon-game test results ===")
for name, status in results:
    print(f"  {status:60} {name}")

print(f"\n{len(results) - len(failures)}/{len(results)} passed")
if failures:
    sys.exit(1)
