---
name: cost-of-use-section
description: Write the cost-of-use section of a combien-consomme.fr test — the "Coût d'usage" / "Sur un an" / annual-extrapolation section, plus replacement economics for old devices. Use when the cost section of a test needs work. Typically run as a sub-agent given only the path to the test file.
---

# Cost-of-use section

You write the section that turns the measured consumption into a cost the reader can relate to: per-use cost, annual cost for a realistic usage pattern, and — for old devices — whether replacement pays off.

The `liquid-filters` skill (all numeric formatting and calculation rules) and the `writing-style` skill (French typography, tone, intro sentences) both apply here — follow them.

## When run as a sub-agent

You are typically given just the path to a test file — a draft (`draft/{slug}/preview/tests/{slug}.md`) where this section is a placeholder or `TODO`, or a published test (`tests/{slug}.md`) whose cost section needs adding or revising.

1. Read the whole file. Pull the values you need **from the body that is already written** — total/per-use energy, durations, power figures, any preheating overhead, quantities (litres, items), and the device type.
2. Decide the usage pattern from the device type and any notes in the file (see below).
3. Write the section in place in the file and save it.
4. Return a short confirmation of what you wrote (one or two lines), plus any problems — see "Missing data" and "When to omit the section" below.

**Don't repeat what the profile sections already said.** The sections describing individual profiles often already give the per-use energy, durations, and key figures. Only introduce a number or framing here (per-use cost, per-unit count, etc.) if it adds something the reader hasn't already seen — typically the *cost* interpretation, the annual extrapolation, and the payback comparison. Don't restate a per-use figure that was just established two paragraphs earlier; build on it.

### Missing data — report, never invent

Use only numbers already in the body, or Liquid calculations derived from them. If you genuinely need a figure that isn't anywhere in the test (e.g. the device's purchase price for a payback comparison, or a usage frequency that was never stated), **do not invent or estimate it.** Write the section with whatever you legitimately have, and report the gap in your return message so the parent agent can supply it or decide to skip that part — e.g. "Wrote per-use cost and annual estimate. Could not add the purchase-price payback: no price given in the test."

### When to omit the section

In rare cases everything cost-relevant was already covered while describing the profiles (a trivial always-on device whose annual cost was stated inline, say), and a separate section would only repeat it. If so, **leave the section out** rather than padding — remove the empty placeholder and report that you omitted it and why in your return message.

## Section title

- Use **"Coût d'usage"** when the section covers more than just an annual figure (per-use cost, payback, etc.).
- "Sur un an" / "Consommation annuelle" is fine when it really is only the annual extrapolation.

## Be realistic about usage

Match the projection to how the device is actually used. Don't extrapolate "once a month for years" for something used twice in its life.

- **Regularly used device** — give an annual cost for a stated frequency, using `PerYear` (never `times: 365`):
  > Si l'on suppose que [device] est utilisé(e) [frequency], la consommation annuelle sera de {% raw %}{{ value | times: frequency | Wh€PerYear }}{% endraw %}.

  For weekly use, compute the annual energy explicitly: {% raw %}{{ value | times: 2 | times: 52 | Wh€ }}{% endraw %} (see `liquid-filters` rule 4).

- **Occasional-use device** (waffle maker, raclette, fondue…) — give the per-use cost and compare to purchase/ingredient cost rather than a fake annual figure:
  > Le coût électrique d'une utilisation, {% raw %}{{ value | Wh€ }}{% endraw %}, est faible comparé au coût [des ingrédients / de l'appareil lui-même].

  > Dans la réalité, ce type d'appareil est souvent acheté ou offert, sert quelques fois avec enthousiasme, puis finit oublié dans un placard.

## First-use overhead (preheating, warm-up)

When the first use carries a one-off cost (preheating) that later uses don't:

> Le coût électrique de [action] (préchauffage compris) est de {% raw %}{{ value | Wh€ }}{% endraw %}. Il faudrait [action] {% raw %}{{ value | countPer€: 1 }}{% endraw %} fois pour dépenser un euro d'électricité.

> Dans la réalité, si vous [action] d'affilée, le préchauffage n'est nécessaire qu'une seule fois. Le coût par [item] supplémentaire n'est alors que de {% raw %}{{ incremental | Wh€ }}{% endraw %}.

## Per-unit / per-cent framing

Add concrete per-unit context when a quantity was measured (litres of soup, number of items):

> Il faudrait [action] {% raw %}{{ value | divided_by: quantity | countPer€: 0.01 }}{% endraw %} litres pour dépenser un centime.

**When 1-centime counts come out too small to be interesting, switch to 1 euro:**
- ✅ "Il faudrait préparer {% raw %}{{ 24.6 | countPer€: 1 }}{% endraw %} cafés pour dépenser un euro d'électricité."
- ❌ "Il faudrait préparer {% raw %}{{ 24.6 | countPer€: 0.01 }}{% endraw %} cafés pour dépenser un centime." (result is 2 — uninteresting)

Always add the unit text manually after `countPer€` (it returns a formatted string).

## Comparison to purchase price

When the device's price is known:

> À ce rythme, il faudrait {% raw %}{{ value | times: frequency | PerYear | countPer€: price }}{% endraw %} ans pour dépenser l'équivalent du prix d'achat ([price] euros) en électricité.

## Replacement economics (old devices only)

Add a `### Faut-il le remplacer avant sa fin de vie naturelle ?` subsection when the device is old and a modern equivalent has been tested on the site (find the slug via the `find-related-tests` skill):

> Lors de notre test d'un {% raw %}{% test modern-slug description %}{% endraw %}, la consommation a été mesurée à {% raw %}{{ X | Wh }}{% endraw %}. C'est {% raw %}{{ X | percentLess: Y }}{% endraw %} de moins, soit une économie de {% raw %}{{ Y | minus: X | Wh€ }}{% endraw %} par cycle.

> Il faudrait donc {% raw %}{{ Y | minus: X | countPer€: price }}{% endraw %} cycles pour rentabiliser le remplacement.

Then weigh longevity, and usually conclude in favour of keeping the old one if it has lasted many years. Do **not** put the modern device's result in a way that spoils its own test — link, state the single figure you compare against, no more.

## What this section must NOT do

- No invented or estimated numbers — only measured values and explicit Liquid calculations.
- Don't reuse a preheating average to describe steady-state, or vice versa (match the statistic to the scenario).
- Don't write the tldr here — that is a separate skill that runs after this section is complete.
