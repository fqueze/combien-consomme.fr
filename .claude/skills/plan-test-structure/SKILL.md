---
name: plan-test-structure
description: Plan the narrative structure of a combien-consomme.fr test before writing it — which sections, in what order, where each profile and image goes, and the progression logic — then get the user's approval. Use after analyzing the profile data and before writing the test body.
---

# Planning the test structure

The generated template already contains every profile range; your job at this stage is to decide how to organise and tell the story, then **get the user's approval before writing**.

This builds on the `analyze-data` output. The `find-related-tests` skill helps choose cross-references for the plan.

## The standard arc

- **Title** — indefinite article: "un" / "une" + descriptive name. **Starts with a lower-case letter** (it is read after "Combien consomme…" on the site): `une bouilloire électrique`, `la cuisson d'artichauts à la cocotte-minute`. Capitalise only proper nouns within it.
- **Opening paragraph** — 1–2 sentences ending with an engaging consumption question (not the generic "À quoi ressemble sa consommation ?"), then `<!-- excerpt -->`, then an empty tldr placeholder (filled last).
- **## Le matériel** — opens with an `{% raw %}{% intro %}{% endraw %}` block (main image, device description, context, optional personal story / acknowledgement). **Leave a blank line after the `{% raw %}{% intro … %}{% endraw %}` tag** before the prose — without it, markdown on the first line (a `[texte](url)` link, etc.) renders raw. The **intro block must never contain `{% raw %}{% image %}{% endraw %}` tags** and must not describe the test protocol. The Le matériel *section* may, however, contain several images outside the intro block — if it does, or if it grows long, move the **### Méthode de mesure** subsection out of the intro and into Consommation (see below). Méthode de mesure always links the measurement post for whichever device actually took the measurements — the Shelly Plus PlugS post for a plug, the Shelly Pro EM-50 post for a panel-mounted measurement. If the draft data tells you which was used, follow it; otherwise infer from the device's current draw (a plug handles roughly < 12 A; higher-current devices are measured at the electrical panel).
- **## Consommation**
  - *Informations fournies par le fabricant* (étiquette, manuel) if available. **End this subsection with a sentence announcing that we'll now test to verify** (e.g. the measured consumption against the label).
  - If Méthode de mesure was moved out of the intro, it goes here — **after** *Informations fournies par le fabricant*, so it sits right before the actual test begins.
  - Profiles organised logically: **overview first, then zoom into phases, then analysis** (progressive detail).
  - Standby / veille analysis.
  - Cost-of-use / annual section (incl. replacement economics for old devices).
  - Autoconsommation photovoltaïque (unless irrelevant to the device).
- **plusloin block** — always.

The cost-of-use (which also covers replacement economics), autoconsommation, plusloin and tldr sections each have their own skill and are written after the body; the plan just reserves their place.

## Image and profile placement

The test is a story told with text and images together. In the plan, decide where **each** image and profile appears and the one-sentence fact that introduces it. Place device-feature photos near where that feature is described; put the usage protocol in the test section, not the intro. **When you have both a photo and a profile for the same thing, the photo goes first** — show what you're doing, then the consumption profile of doing it.

## Present the plan and wait for approval

Show the user a plan in this shape, then **wait for explicit approval** before writing:

```
PLAN DU TEST - [Device]
=======================

DONNÉES DISPONIBLES:
- X profils (Y ranges), Z images, key statistics

STRUCTURE NARRATIVE:
[every section/subsection, where each image and profile goes with its intro fact, progression logic]

CHOIX NARRATIFS:
[progression order, median vs average choices, image placement logic, cross-reference strategy]

CALCULS (filtres exacts):
[the Liquid expressions you intend to use]

Continuer avec ce plan ? (y/n)
```
