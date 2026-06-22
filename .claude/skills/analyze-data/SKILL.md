---
name: analyze-data
description: Read and interpret the measured data of a combien-consomme.fr test before writing about it — the per-profile statistics and consumption-curve screenshots, plus the other photos (device, label, manual) in a draft. Use when starting a test, or when re-examining the data to add detail. Covers viewing screenshots and photos safely, separating what you SEE from what you INFER, and the profile range format.
---

# Analyzing the data

Before writing anything, understand the material: for each profile you have a statistics file (energy, average/median/max power, duration) and a screenshot of the consumption curve; you also usually have other photos (the device, its label, its manual). Turn all of this into facts and notes before writing.

## View images through a sub-agent

**Never read the `.png`/`.jpg` images directly in the main conversation** — profile screenshots *and* device photos alike. Multiple images accumulating in context triggers "image exceeds the dimension limit" errors. **Use the Agent tool to view each image** and return a text description.

For a **profile screenshot**, the description should cover: visual patterns (plateaus, spikes, gradual changes), the timing of phases if visible, and any 0 W periods at the start or end.

## Output format

For each profile:

```
=== PROFIL: [name] ===
STATS (from the stats file):
- Durée: [duration]
- Énergie: [energy] Wh
- Puissance: médiane [X] W, moyenne [Y] W, max [Z] W

IMAGE — ce que je VOIS:
- [visual patterns: plateaus, spikes, gradual changes]
- [timing of phases if visible]
- [any 0 W periods at start/end]

INFÉRENCE:
- [what you conclude from combining stats + image]
- [whether the duration includes 0 W samples → use "environ" phrasing]
- [key characteristics for the narrative]

Usage prévu: [which section, why]
```

For each non-profile photo (device, label, manual…), viewed the same way:
```
=== IMAGE: [filename] ===
Contenu: [what it shows]
Usage prévu: [which section, context sentence]
```

**Keep what you SEE separate from what you INFER.** If the visual description is wrong, the user can correct it immediately — that only works if the two are not conflated.

## The profile data you're reading

- Statistics files give energy, average/median/max power, and a duration **already converted** to human-readable form (e.g. "9h59min"). Choose median vs average per the `writing-style` skill.
- Note features for the narrative: startup spikes, stable plateaus, cycles, gradual changes, where the device sits at 0 W.

## Profile range format

A range string in the template is `start m duration`, both in **milliseconds**, where the start part is optional:
- `337445m1911097` = starts at 337445 ms, lasts 1911097 ms (≈ 31 min 51 s).
- a leading `m` with no start (start defaults to 0) = a window from the beginning.

To show the range's duration as text, take the second number and convert ms → seconds: {% raw %}{{ 1911097 | divided_by: 1000 | s }}{% endraw %} (see the `liquid-filters` skill).

## Durations and 0 W edges

If a profile starts or ends with 0 W samples, its raw duration overstates the active time — describe it approximately ("environ 40 secondes", "un peu plus de 2 minutes") rather than to the second.
