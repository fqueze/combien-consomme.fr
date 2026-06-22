---
name: liquid-filters
description: Compute and format energy, power, cost, duration and percentage values with the site's Liquid filters when writing or editing a test on combien-consomme.fr, and verify those calculations are correct. Use whenever a numeric value (W, Wh, €, %, a duration, an annual/monthly extrapolation, a per-unit count) appears in a test, or when checking that such values are written correctly.
---

# Liquid filters for consumption values

Every measured or computed value shown in a test goes through a Liquid filter so it is formatted consistently (French number formatting, units, the current electricity price). Never write a formatted number as plain text when a filter exists for it.

## Filter reference

All examples use {% raw %}{{ ... }}{% endraw %} in the actual test; the table omits the braces for readability.

| Quantity | Filter | Example | Renders roughly |
|---|---|---|---|
| Power | `W` | `1234 \| W` | 1234 W |
| Energy | `Wh` | `567 \| Wh` | 567 Wh |
| Energy + cost | `Wh€` | `916 \| Wh€` | 916 Wh (0,21 €) |
| Cost | `€` | `89 \| €` | 89 € |
| Duration | `s` | `12381 \| s` | 3h26 |
| Percentage | `percent: total` | `123 \| percent: 456` | 27 % |
| % more (1st larger) | `percentMore: other` | `1040 \| percentMore: 736` | 41 % de plus |
| % less (1st smaller) | `percentLess: other` | `736 \| percentLess: 1040` | 29 % de moins |
| Per-unit count | `countPer€: price` | `0.149 \| countPer€: 0.01` | 65 (needs a manual unit after) |
| Annual cost, continuous W | `W€PerYear` | `12.3 \| W€PerYear` | 24,69 € (cost of 12,3 W running 24/7 for a year) |
| Monthly cost, continuous W | `W€PerMonth` | `5 \| W€PerMonth` | 0,84 € (cost of 5 W running 24/7 for a month) |
| Annual cost from daily Wh | `Wh€PerYear` | `652 \| Wh€PerYear` | 47,77 € (cost of 652 Wh/day over a year) |
| Monthly cost from daily Wh | `Wh€PerMonth` | `652 \| Wh€PerMonth` | 3,93 € (cost of 652 Wh/day over a month) |
| Daily→yearly energy | `PerYear` | `652 \| PerYear` | 237980 (652 Wh/day as a yearly energy, ×365) |
| Daily→monthly energy | `PerMonth` | `652 \| PerMonth` | 19560 (652 Wh/day as a monthly energy) |

Math filters used to prepare a value before formatting: `times:`, `divided_by:`, `plus:`, `minus:`.

## The rules (these are also the auto-fail items the verifier checks)

1. **Formatting filters must be LAST.** No math after `W`, `Wh`, `Wh€`, `€`, `percent`, `percentMore`, `percentLess`, `countPer€`, or any `*PerYear`/`*PerMonth` filter — they return a formatted string, not a number.
   - ❌ `100 | Wh€ | times: 2` · `100 | percent: 1000 | times: 2` · `100 | countPer€: 1 | divided_by: 4`
   - ✅ `100 | times: 2 | Wh€` · `100 | times: 2 | percent: 2000` · `100 | divided_by: 4 | countPer€: 1`

2. **Math is strictly left-to-right, no operator priority, no parentheses.** `a | times: b | plus: c | times: d` = ((a × b) + c) × d.
   - ✅ `1040 | times: 2 | plus: 218 | times: 52` = (1040×2 + 218) × 52

   **When a calculation genuinely needs grouping that left-to-right order can't express, name the intermediate result with `{% raw %}{% assign %}{% endraw %}`** and reuse the variable. This is the supported way to get "parentheses": compute each grouped sub-expression into its own variable, then combine the variables. Put the `assign` lines together (e.g. just under the front matter, or right before the prose that uses them).
   {% raw %}
   ```liquid
   {% assign heures_ouverture_an = heures_par_jour | times: jours_an %}
   {% assign heures_fermeture_an = 365 | times: 24 | minus: heures_ouverture_an %}
   {% assign veille_fermeture = 0.38 | times: heures_fermeture_an %}
   ```
   {% endraw %}
   The variables then appear in prose like any value, and you can still apply a final formatting filter at the point of use:
   {% raw %}
   ```liquid
   la consommation annuelle est d'environ {{ conso_ouverture_an | plus: veille_fermeture | Wh€ }}.
   ```
   {% endraw %}
   - An assigned variable holds an **unformatted number**, so you may keep doing math on it and apply the formatting filter last (rule 1 still holds).
   - Use this only when left-to-right ordering really can't express the calculation — for simple chains, prefer the inline form, which keeps the number visible next to the prose.

3. **No `times: 365`** — use a `PerYear` filter instead.
   - ❌ `110 | times: 365 | Wh€`  ✅ `110 | Wh€PerYear` (for daily consumption)

4. **`Wh€PerYear` / `Wh€PerMonth` expect DAILY consumption** — they multiply by 365 / ~30 internally. For weekly usage, compute the annual energy yourself and use `Wh€`.
   - ❌ `1040 | Wh€PerYear` when 1040 Wh is a weekly figure
   - ✅ `1040 | times: 2 | times: 52 | Wh€` (2 uses/week × 52 weeks)

5. **Make weekly/repeated calculations explicit.** Prefer `… | times: 2 | times: 52 | …` over `… | times: 104 | …` so the meaning is readable.

6. **A profile range's duration is in MILLISECONDS** — convert before the `s` filter.
   - ❌ `9370138 | s`  ✅ `9370138 | divided_by: 1000 | s`

7. **No scientific notation** — the parser rejects it. `2060 | W`, never `2.06e+3 | W`.

8. **Units that aren't filters are plain text** — e.g. amperes: write `10 A`, there is no `A` filter. There is no `hours` filter either — use `s` (`19548 | s` → "5h26") or write plain text like `3h26`.

9. **`countPer€` returns a formatted string and needs a manual unit after it.**
   - ✅ `0.149 | countPer€: 0.01 } lavages` · `4.34 | times: 52 | countPer€: 1 } ans`
   - Do all conversions BEFORE formatting: `5.03 | divided_by: 4 | countPer€: 0.01` (soupes→litres first), never after.

## Choosing the right percentage filter

Match the filter to the sentence:
- "A consomme X, soit {% raw %}{{ X | percentMore: Y }}{% endraw %} de plus que B" — when X > Y.
- "B consomme Z, soit {% raw %}{{ Z | percentLess: W }}{% endraw %} de moins" — when Z < W.
- Plain share of a total: {% raw %}{{ part | percent: total }}{% endraw %}.
