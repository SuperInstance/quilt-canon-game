// Score calculator: composite of canon activated (JEV-like heuristic)
function calculateScore(player) {
  if (!player.canon_collected || player.canon_collected.length === 0) {
    return { composite: 0, doctrines_hit: [], distinct_voice: false, canon_worthy: false };
  }

  // Aggregate doctrines across collected canon
  const doctrines = new Set();
  let totalChars = 0;
  for (const c of player.canon_collected) {
    c.doctrines.forEach(d => doctrines.add(d));
    totalChars += (c.lore || "").length;
  }

  const doctrine_score = doctrines.size / DOCTRINES.length;
  const length_score = Math.min(1.0, totalChars / 1000);
  const distinct_voice = doctrines.size >= 3;

  const composite = 0.4 * doctrine_score + 0.3 * length_score + 0.3 * (distinct_voice ? 1 : 0);

  return {
    composite: Math.round(composite * 1000) / 1000,
    doctrines_hit: Array.from(doctrines),
    distinct_voice,
    canon_worthy: composite >= 0.5,
    n_pieces: player.canon_collected.length,
    total_chars: totalChars
  };
}

if (typeof module !== "undefined") {
  module.exports = { calculateScore };
}
