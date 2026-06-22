---
name: autoconsommation-section
description: Write the "Conseils pour l'autoconsommation photovoltaïque" section of a combien-consomme.fr test — how well the device's power profile fits home solar production, and when to run it. Use when this section of a test needs work. Typically run as a sub-agent given only the path to the test file. Depends on the cost section being written first.
---

# Autoconsommation photovoltaïque section

This section analyses how well the device's power profile matches what a home solar installation can produce, and advises when to run it. It usually closes by putting the economic stakes in perspective.

The `liquid-filters`, `writing-style`, and `find-related-tests` skills all apply here.

## When run as a sub-agent

You are given the path to a test file. **The cost-of-use section must already be written**, because this section's closing line reuses the per-use cost figure it established. Read the whole file, pull the device's power figures (from the profile sections) and the per-use cost (from the cost section), write this section in place, save, and return a short confirmation plus any problems.

If the cost figure you need isn't yet in the file, say so in your return message rather than inventing one.

## When to omit

Omit this section only when photovoltaic self-consumption is **irrelevant to the device** — e.g. a device that is never run during daylight, or whose power is so trivial the question doesn't arise. Omitting because the topic is "already covered elsewhere" is not a reason; it isn't covered elsewhere. If you omit, remove the placeholder and report why in your return message.

## Reference facts

- A **standard French rooftop installation is 3 kWc** (not 2.5).
- A **plug-and-play kit** ("panneau à brancher", e.g. ~300 W nominal) is much smaller, and only offsets low-consumption devices around midday on a sunny day. Mention it **only when it's relevant** — i.e. when the device's draw is small enough that such a kit could plausibly cover it (then note it works only in good midday sun). If the device clearly draws too much for a plug-and-play kit, don't bring it up at all; just talk about the rooftop installation.
- Frame the advice around the device's power: a low, steady draw is easy to cover; a high or strongly alternating draw is harder.

## Structure

{% raw %}
```markdown
### Conseils pour l'autoconsommation photovoltaïque

La puissance de {{ power | W }} du [device] [reste compatible avec / est relativement élevée pour] une installation photovoltaïque domestique standard. Une installation en toiture standard de 3 kWc produira suffisamment en milieu de journée ensoleillée[, même en hiver,] pour alimenter [device].

Pour maximiser l'autoconsommation, plusieurs options :
- [timing option 1] ;
- [timing option 2] ;
- éviter de lancer [device] en même temps qu'un gros consommateur comme {% test machine-a-laver un lave-linge %} ou {% test seche-linge-a-pompe-a-chaleur un sèche-linge %}, pour ne pas dépasser la capacité de production solaire.

Cela dit, avec un coût électrique de {{ value | Wh€ }}, l'enjeu économique reste [très faible / modéré]. L'intérêt est surtout environnemental : utiliser directement l'énergie solaire.
```
{% endraw %}

## Avoid redundant or contradictory phrasing

- ❌ "si vous avez des panneaux solaires" — this section is *about* solar panels.
- ❌ "votre café du matin" when morning solar production is poor — prefer a neutral "votre pause café".
- Be specific but non-overlapping about timing: "au déjeuner" (noon) is fine; don't pair "en milieu de journée" with "pause déjeuner" as they say the same thing.
- If a related device is easier to power on solar, you may note it with a `{% raw %}{% test … %}{% endraw %}` link (see `find-related-tests`), without revealing its results.
