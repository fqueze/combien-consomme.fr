---
name: write-tldr
description: Write the tldr summary block of a combien-consomme.fr test — the 3 to 4 key findings shown at the top. Use when the tldr of a test needs work. Every test has this block, and it is written LAST, after all other sections (including cost-of-use and autoconsommation) are complete. Typically run as a sub-agent given only the path to the test file.
---

# tldr block

The tldr is a short bulleted summary of the test's key findings, placed near the top (after `<!-- excerpt -->`). It is written **last**, because it must summarise the finished body — including the cost-of-use and autoconsommation sections, which it may draw on.

The `liquid-filters` and `writing-style` skills apply here. Every test has a tldr — it is never omitted.

## When run as a sub-agent

You are given the path to a test file in which all other sections are already complete. Read the whole file, fill in the tldr in place using the **exact same values and Liquid calculations already used in the body**, save, and return a short confirmation plus any problems.

## Hard rules (the verifier checks these)

- **Every number in the tldr must already appear in the body.** Never introduce a calculation or figure only in the tldr. Use the same filter expressions the body uses.
- **No invented or estimated numbers** — only measured values and explicit Liquid calculations.
- **If the body gives an annual cost, the tldr must include it, as the first bullet.** Conversely, if the tldr has an annual cost, it goes first.
- Major findings (a surprising result, e.g. measured power 61 % below the label) belong in the tldr.

## Content and order

- **First bullet:** for a device with a realistic recurring usage pattern, lead with the **annual cost** for that scenario (immediate practical context). For occasional-use devices with no regular pattern, lead with the **per-use cost** instead.
- Then 2–3 more bullets: per-use consumption, a key energy-saving insight, a comparison or practical conclusion (incl. replacement economics if relevant).
- **Keep it short — 3 to 4 bullets.** Each bullet is a single complete sentence ending with a period, not a paragraph with multiple clauses.

## Avoid redundant cost phrasing

Use either `Wh€` (which already shows energy *and* cost) **or** an "soit moins d'un centime" gloss — never both.
- ❌ "consomme {% raw %}{{ 24.6 | Wh€ }}{% endraw %}, soit moins d'un centime" (redundant)
- ✅ "consomme {% raw %}{{ 24.6 | Wh€ }}{% endraw %}"
- ✅ "consomme {% raw %}{{ 24.6 | Wh }}{% endraw %}, soit moins d'un centime"

## Format

{% raw %}
```markdown
{% tldr %}
- [Annual cost for typical usage OR per-use cost].
- [Key finding with calculation].
- [Another key finding].
- [Comparison or practical conclusion].
{% endtldr %}
```
{% endraw %}

Examples:
{% raw %}
- "En mixant une soupe par semaine pendant un an, la consommation annuelle sera de {{ 5.03 | times: 52 | Wh€ }}."
- "Il faudrait {{ 0.149 | countPer€: 0.01 }} lavages pour dépenser 1 centime."
- "La consommation en veille encourage à débrancher l'appareil lorsqu'il est inutilisé."
{% endraw %}
