---
name: writing-style
description: The house writing style and conventions for combien-consomme.fr tests — tone, how to introduce profiles and images, choosing median vs average, French typography, and link format. Use whenever writing or editing the prose of a test.
---

# Writing style

The house voice for consumption tests. Apply this to any prose written in a test, whether a full new test or an edit to an existing one.

## French typography

- **Put a regular space before `:` `;` `!` `?`** — the Eleventy build converts it to a non-breaking space automatically.
  - `La consommation est stable :` · `Quelle est la consommation ?`
- Direct citations go in French guillemets **and** italics: `« *texte cité* »`. (Blockquotes with `>` are already formatted — no italics needed.)
- **Avoid the spaced em-dash `—` as a mid-sentence break or aside in prose.** It reads as an AI tell. Use a comma, a colon, or parentheses instead — whichever the sentence calls for in French. (`la pression monte, mais aucune vapeur ne sort` ; `elle ne consomme presque plus rien, juste de quoi…`.) The dash is fine inside a quoted label or a profile name.

## Tone

- **First person, conversational.** Use "je", "on", "nous".
- **Curious and explanatory:** "On observe…", "Cela s'explique car…", "On remarque…".
- **Honest about limits:** "Je ne sais pas exactement…", "Peut-être…", "On peut supposer que…".
- **je vs nous:** Use "nous" when the test genuinely involved someone else — because the device belongs to or was lent by someone ("Merci à … : c'est sa machine, et c'est lui qui a préparé les cafés"), or because it's something used with another person (a baby-bottle warmer both parents use). When "nous" describes the actions ("nous avons préparé un café"), still switch to "je" for personal explanations and interpretations ("dont je n'ai pas l'explication", "j'imagine que"). If the test was done solo, "je" / "on" throughout.

**Match the tone to the device.** Obsolete, kitsch or amusing items invite humour; modern or professional equipment wants a serious, technical register. Decide this early — it colours the whole test.

## Introducing profiles and images

Every profile and every image needs an **introductory sentence carrying a real fact**, ending with a colon before the shortcode. Avoid empty "Voici…" announcements.

- ✅ "Pendant les 2 heures d'attente avant le démarrage du cycle, la consommation est stable autour de {% raw %}{{ 3.7 | W }}{% endraw %} :"
- ✅ "La phase de lavage avec chauffage dure {% raw %}{{ 6128 | s }}{% endraw %} et consomme {% raw %}{{ 916 | Wh€ }}{% endraw %} :"
- ❌ "Voici le profil de consommation :" · "Voici la phase de lavage :"

**Don't mention a specific value before showing the profile that contains it.** Show the profile first, then discuss what you see in it. (An overview must not quote "autour de 915 W" when 915 W only appears in a later zoom.)

For **equipment/device photos**, a brief sentence that flows with the narrative: "Voici les indications techniques inscrites dessus :", or a sentence that connects the image to the broader story. Never drop an image in with no surrounding text.

## Describing power values

- **Median vs average:**
  - Use the **median** for a phase with a roughly steady power, where brief dips or spikes shouldn't skew the figure.
  - Use the **average** when the device cycles on and off over the period you're describing (a freezer, an electronic yogurt maker, a thermostat-regulated heater): the median would land on either the "on" or the "off" level and misrepresent the real consumption. Also use the average for idle/standby power that is below the Shelly plug's measurement precision — the average over a long window recovers a meaningful figure where any single sample can't.
  - Match the statistic to the scenario: don't describe standby with a preheating average, or a cycling device with its median.
- **Peak phrasing:** "une forte consommation allant jusqu'à {% raw %}{{ 1060 | W }}{% endraw %}" for a single peak ; reserve "des pics" for genuinely repeated peaks.
- **Comparing to the label's nominal power:** the label never says whether its figure is a maximum or an average, so compare it at **the moment our measured power is closest to the nominal value** — usually the highest-consumption phase: "cette forte consommation qui atteint {% raw %}{{ 1060 | W }}{% endraw %}, proche de la puissance nominale de {% raw %}{{ 1100 | W }}{% endraw %}".

## Durations: precise vs approximate

When a profile has 0 W samples at the start/end, use approximate language; use a precise {% raw %}{{ … | s }}{% endraw %} only when the samples are meaningful throughout.
- ✅ "dure environ 40 secondes", "un peu plus de 2 minutes"
- ❌ "dure 41s" when the profile includes trailing 0 W samples

## Lists

French punctuation in lists: semicolon after each item, period on the last.
```
On observe trois phases distinctes :
1. Le préchauffage initial avec une consommation élevée ;
2. Une courte phase d'attente avec une consommation très faible ;
3. La préparation du café avec deux niveaux de puissance.
```
Don't re-introduce each item ("Le manuel indique que…") when the list is already introduced ("Le manuel précise deux points :").

## External / Wikipedia links

Use French guillemets in the title attribute:
```markdown
[FreePlug](https://fr.wikipedia.org/wiki/FreePlug "Page « FreePlug » sur Wikipédia")
[broyeur WC](https://fr.wiktionary.org/wiki/sanibroyeur "« broyeur WC » sur le Wiktionnaire")
```
Use these to define technical terms or give context.

## Common phrasings (current style)

{% raw %}
- "On observe un pic de consommation au démarrage"
- "La consommation se stabilise à {{ X | W }}"
- "La consommation en veille représente {{ X | percent: Y }} du total"
- "Il faudrait [X opérations] pour dépenser un centime / un euro"
{% endraw %}
