---
name: plusloin-section
description: Write the "Pour aller plus loin" block of a combien-consomme.fr test — 3 to 5 realistic follow-up investigations. Use when the plusloin block of a test needs work. Every test has this block. Typically run as a sub-agent given only the path to the test file.
---

# "Pour aller plus loin" block

Every test ends with a `{% raw %}{% plusloin %}{% endraw %}` block suggesting follow-up investigations — including measurements you'd have liked to do but lacked data for. This block is always present.

The `writing-style` skill (typography, tone, list punctuation) and, for any link, the `find-related-tests` skill apply here.

## When run as a sub-agent

You are typically given just the path to a test file. Read the whole file so your suggestions match what was and wasn't measured, write the block in place, save, and return a short confirmation plus any problems.

## Format

{% raw %}
```markdown
{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de [device], on pourrait :
- [investigation 1] ;
- [investigation 2] ;
- [investigation 3].
{% endplusloin %}
```
{% endraw %}

3 to 5 items, semicolons between, period on the last (see `writing-style`).

## What to suggest

- **Tests you planned but couldn't run** for lack of profile data (other temperatures, programs, modes).
- Different settings/modes not covered; different ambient temperature or season.
- Comparison with other models or technologies.
- More precise equipment for low-power edge cases (e.g. measuring standby below the plug's precision).
- Impact of maintenance (clean filters, descaling) or of a specific component measured separately.
- Different usage patterns or intensities.

## Be specific

Vague suggestions are weak. Spell out what would actually be measured and why.
- ❌ "évaluer l'impact de faire plusieurs gaufres d'affilée vs avec des pauses" (unclear — unplugged during pauses?)
- ✅ "évaluer l'impact du temps pendant lequel le gaufrier reste ouvert entre deux gaufres (perte de chaleur dans la pièce, surconsommation pour revenir à température)"

You cannot make up measurements, but you can freely suggest future tests. Where a suggestion naturally references another published article, link it with `{% raw %}{% test … %}{% endraw %}` (see `find-related-tests`) — without revealing its results.
