# Guide to Writing High-Quality Tests

This document contains detailed notes on the writing style, structure, and conventions used in existing tests. Use this as a reference when generating new tests from draft data.

## Overview

Tests on combien-consomme.fr follow a consistent structure but vary greatly in depth and complexity based on the device being tested. Key principles:

1. **Conversational and personal** - First-person narrative with honesty about limitations
2. **Data-driven but accessible** - Present measurements with context and explanation
3. **Progressive detail** - Start with overview, zoom into interesting phases
4. **Practical conclusions** - Connect measurements to real costs and decisions
5. **Acknowledge uncertainty** - Be honest about what you don't know
6. **Rich sensory details** - Describe what you see, hear, and observe

The best tests combine technical precision with storytelling, making power consumption data interesting and relatable.

## Recent Trends (2024-2025 Tests)

The most recent tests emphasize several important patterns:

### Standby Consumption Analysis
Many recent tests highlight when standby power exceeds usage power:
- **scanner-de-documents-scansnap**: 14min wait before sleep consumes 577x more than one scan
- **nettoyeur-ultrasons**: "La veille peut dépasser consommation utilisation - débrancher!"
- **motorisation-porte-de-garage**: Standby 101€/an >> usage 0.60€/an for daily use
- Pattern: Calculate standby as percentage of total, recommend unplugging for infrequent use

### Replacement Economics
Detailed financial analysis of replacing old vs keeping functional:
- **seche-linge-a-evacuation**: "Faut-il le remplacer avant sa fin de vie naturelle?"
- Calculate years to amortize: "Il faudrait X à Y ans pour rentabiliser"
- Consider longevity: "Sauf si le vieux modèle tient depuis près de 40 ans... pas sûr que les modèles récents aient une telle longévité"
- Conclusion often: Keep old if still working, economics don't favor replacement

### Device Comparisons
Explicit comparisons with {% raw %}`{% test %}`{% endraw %} links:
- **seche-linge-a-evacuation** vs {% raw %}`{% test seche-linge-a-pompe-a-chaleur pompe à chaleur %}`{% endraw %}
- **yaourtiere-seb-multi-delices** vs {% raw %}`{% test yaourtiere Classic %}`{% endraw %}
- **ventilateur-carrefour-home** vs {% raw %}`{% test ventilateur-de-table-rowenta Rowenta %}`{% endraw %}
- Show percentage differences: {% raw %}`{{ 789 | percentLess: 1732.56 }}`{% endraw %}

### Vintage Appliance Patterns
Many recent tests feature vintage devices (années 70-90):
- **moulinette-s**, **robot-rapetout**, **ouvre-boites-electrique**, **couteau-electrique**
- Emphasis on longevity, nostalgia, multi-generational use
- Measured power often exceeds label: {% raw %}"La puissance mesurée est 2 à 3 fois supérieure à la puissance de {{ 25 | W }} indiquée"{% endraw %}
- Simple mechanics, no electronics: "Zéro au repos - pas d'électronique"

### Autoconsommation Photovoltaïque
Recent tests systematically include solar panel compatibility:
- **Dedicated subsection**: "Conseils pour l'autoconsommation photovoltaïque"
- Analyze power peaks vs typical solar production (2500-3000W)
- **yaourtiere-seb-multi-delices**: Explain why intermittent high peaks are problematic vs constant low power
- Suggest timing: "démarrer en milieu de matinée" or "jour bien ensoleillé"
- **Low-power devices** (< 40W): "peut facilement fonctionner en journée sur une installation solaire, même petite" or "bien adapté à une utilisation en journée via une installation solaire"

### Manufacturer Documentation Pattern
Recent tests (2024-2025) systematically present manufacturer information BEFORE measurements:
- **Section**: "Informations fournies par le fabricant"
- **Subsection H4 "Étiquette"**: Photo and description of device label with power rating
- **Subsection H4 "Manuel"**: Relevant quotes from manual (especially energy-saving advice)
- **Pattern**: Present manufacturer claims first, then verify with measurements
- **Examples**: imprimante-laserjet-pro, lecteur-dvd-thomson-thd300, machine-apnee-sommeil

### Comparing Manufacturer Specs to Measurements
Tests often compare measured values to manufacturer specifications:
- **Label verification**: "La puissance mesurée est légèrement supérieure/inférieure à celle indiquée"
- **Explaining discrepancies**: Voltage differences, age of device, lack of maintenance
- **imprimante-laserjet-pro**: Tests if manufacturer claims (570W printing, 2.4W standby) match reality
- **lecteur-dvd-thomson-thd300**: {% raw %}"toutes les puissances mesurées sont inférieures à la puissance de {{ 10 | W }} indiquée par le constructeur"{% endraw %}
- **ouvre-boites-electrique**: "peut-être par un manque de l'entretien de l'appareil qui a plusieurs dizaines d'années"

## Document Structure

### Front Matter (Required)
```yaml
---
layout: test-layout.njk
title: [descriptive title starting with "un" or "une"]
img: [main image filename]
date: [YYYY-MM-DD format]
tags: ['test']
---
```

### Main Sections
1. **Opening paragraph** - Brief introduction ending with `<!-- excerpt -->`
2. **tldr block** - REQUIRED summary of key findings (only oldest tests lack this)
3. **Le matériel** - Equipment description section
4. **Consommation** - Consumption measurements section
5. **plusloin block** - REQUIRED suggestions for further investigations (only oldest tests lack this)

## Writing Style

### Language and Tone
- **First person, conversational**: Use "je", "on", "nous" naturally
- **Explanatory and curious**: Explain observations, express surprise, acknowledge unknowns
- **Technical but accessible**: Use precise technical terms but explain phenomena
- **Honest about limitations**: "Je ne connais pas l'explication de ce phénomène"

### Title Convention
- Start with indefinite article: "un aspirateur d'atelier", NOT "l'aspirateur d'atelier"
- Be descriptive but concise
- Use lowercase except for brand names

### Opening Paragraph
- Brief (1-2 sentences)
- End with a question: "À quoi ressemble sa consommation ?" or multiple related questions
- Always followed by `<!-- excerpt -->`
- **Must be followed by a {% raw %}`{% tldr %}`{% endraw %} block** (required in all new tests)

## Le matériel Section

### Structure
{% raw %}
```markdown
## Le matériel
{% intro "image.jpg" "Image caption with brand and model" %}
[Main description paragraph]

[Optional context/comparisons]

[Optional cross-references to other tests]

### Méthode de mesure

[Measurement setup description]

[Data collection details]
{% endintro %}
```
{% endraw %}

### Key Elements
- **Image and caption**: Full brand name and model in the intro tag
- **Context**: Explain where/how the device is used
- **Comparisons**: Reference related tests using {% raw %}`{% test slug description %}`{% endraw %}
- **Measurement method**: Always describe the measurement equipment used and data collection frequency
  - **Shelly Plus PlugS** for standard devices (< 12A)
  - **Shelly Pro EM-50** for high-current devices (> 12A, installed in electrical panel)

### Cross-references
- Use {% raw %}`{% test slug description %}`{% endraw %} for internal links
- Use {% raw %}`{% post slug description %}`{% endraw %} for blog posts
- Example: {% raw %}`{% test congelateur un congélateur coffre %}`{% endraw %}

## Consommation Section

### Subsection Structure
- Use H3 headings (###) for different test scenarios
- Present tests in logical order (basic → complex, or chronological)

### Profile Blocks
{% raw %}
```markdown
{% profile "filename.json.gz" '{"name": "Description", "range": "timestamp"}' %}
```
{% endraw %}

### Observations Format
- Lead with what you observe: "On observe...", "On remarque..."
- Cite specific values with formatting: {% raw %}`{{ 1789 | W }}`{% endraw %}
- Explain unexpected results
- Connect observations to expectations: "Je m'attendais à ce que... mais en réalité..."

### Value References
{% raw %}
- **Maximum consumption**: `{{ value | W }}. C'est la consommation maximale.`
- **Median consumption**: `{{ value | W }} (c'est la consommation médiane)`
- **Minimum consumption**: "consommation minimale mesurée à {{ value | W }}"
{% endraw %}

### Image References
{% raw %}
```markdown
{% image "./images/filename.jpg" "Description" "512w" 512 %}
```
{% endraw %}

## plusloin Block (REQUIRED)

**All new tests must end with this block.** Only the oldest tests lack this.

Suggest 3-5 realistic follow-up investigations that would provide deeper understanding:

{% raw %}
```markdown
{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de [device], on pourrait :
- [potential investigation 1] ;
- [potential investigation 2] ;
- [potential investigation 3].
{% endplusloin %}
```
{% endraw %}

**What to suggest:**
- **Tests you wanted to do but couldn't** due to lack of profile data (e.g., different temperature settings, programs not tested)
- Test different settings/modes not covered
- Measure at different ambient temperatures/seasons
- Compare with different models or technologies
- Use more precise measurement equipment for edge cases
- Test impact of maintenance (clean filters, descaling)
- Measure specific components separately
- Test different usage patterns or intensities

**Important:** You cannot make up measurements, but you CAN suggest tests that would be valuable to conduct in the future.

**Examples from recent tests:**
- "tester les différents programmes, avec différentes durées"
- "comparer avec d'autres modèles de [device type]"
- "mesurer la consommation en veille avec un appareil plus précis pour les faibles puissances"
- "évaluer l'influence de la longueur du conduit d'évacuation"

## Technical Patterns

### Describing Power Consumption
- Start values: "pic de consommation au démarrage"
- Stable values: "la consommation se stabilise à"
- Changes: "la puissance diminue d'abord à... pendant X secondes"
- Transitions: "avant de devenir nulle"
- Decreasing over time: "la puissance consommée diminue au cours du temps" (for motors that slow or materials that soften)

### Motor Warm-up Effects
Several tests document how electric motors consume less as they warm up:
- **ventilateur-de-table-rowenta**: Power decreases from 30.4W to 28.8W over 3 hours
- **ouvre-boites-electrique**: Power drops from 79.8W to 60.1W over 1 minute of continuous use
- **Pattern**: "Cette légère décroissance est probablement due à l'échauffement du moteur"
- **Method**: Sample 5-minute periods at hourly intervals to show progression
- **Stabilization**: "Une fois que le moteur a atteint une température stable, la puissance n'évolue plus"

### Testing At Different Speeds/Settings
For devices with multiple speed settings:
- **Test each speed separately** with 2-5 minute profiles
- **Compare power increase**: {% raw %}"{{ 30 | percentMore: 19 }} de plus"{% endraw %} when going from speed 1 to 2
- **Comment on utility**: "On se demande ce qui a poussé les concepteurs à mettre 3 vitesses si proches"
- **Compare noise levels**: "Le bruit émis augmente aussi, ce qui est à prendre en compte"
- **Examples**: ventilateur-carrefour-home (3 speeds), ventilateur-de-table-rowenta (2 speeds)

### Material Resistance Changes
For food prep devices, describe how resistance changes:
- **mixer-houmous**: "À chaque fois, nous observons un petit pic au redémarrage... puis une décroissance"
- "À mesure que le mixage avance, la résistance... est plus faible, et la consommation diminue"
- "C'est une indication que... c'est prêt ! Bon appétit."
- Power consumption decreases as food becomes softer/smoother

### Oscillation/Movement Features
Test if mechanical features affect consumption:
- **ventilateur-carrefour-home**: {% raw %}"L'activation de l'oscillation a très peu d'effet... inférieure à {{ 1 | W }}, et n'est pas visible sur le graphique"{% endraw %}
- **ventilateur-de-table-rowenta**: "J'ai réalisé des enregistrements avec l'oscillation... mais n'ai pas constaté de différence visible"
- Pattern: Test and report even when no difference, acknowledge null results
- Explain: Mechanical oscillation uses negligible power compared to motor

### Proportional Consumption Patterns
For resistive heating devices:
- **raclette-a-deux**: "la forme de l'enregistrement... est presque un rectangle"
- "la consommation électrique est donc directement proportionnelle au temps pendant lequel l'appareil... reste allumé"
- Pattern applies to: Pure resistive heaters, simple motors without speed control
- Consequence: "Utiliser les deux poêlons simultanément... améliore l'efficacité énergétique"
- Same power for 1 or 2 items = better efficiency when using all capacity

### Comparing to Specifications
- Reference label/specifications when available
- Express surprise when measured values differ: "Cette valeur est étonnamment élevée, pour un aspirateur dont la puissance indiquée sur l'étiquette est de..."

### Explaining Phenomena
- When understood: Explain clearly
- When expected: "On s'y attendait, tous les moteurs électriques font ça"
- When unexpected: "Je m'attendais à... mais en réalité..."
- When unknown: "Je ne connais pas l'explication de ce phénomène"

## Data-Driven Content

### From Draft Data
You will receive:
- **Profile ranges**: Timestamps with names for different test scenarios
- **Statistics for each profile**: Energy used, average/median/max power, profile duration
- **Profile screenshots**: Visual graphs of power consumption over time
- **Images**: Including label photos showing specifications
- **Descriptions**: Context about the device and how it's used

### What to Generate
- Natural prose that presents the profile ranges in a logical narrative
- Observations about consumption patterns visible in the profile screenshots
- Descriptions of what you "see" in the graphs (spikes, plateaus, cycles, transitions)
- **Calculations using ONLY measured values from profiles** - never make up or estimate numbers
- Comparisons between different usage scenarios
- References to relevant images at appropriate points

## Special Blocks and Filters

### tldr Block (REQUIRED)
**All new tests must include this block** after the opening paragraph. Only the oldest tests lack this.

**IMPORTANT: Write this block LAST, after completing all test sections.**
- **All numerical values MUST come from profile statistics** - never make up or estimate numbers
- Use EXACT SAME values and filter calculations from the test body
- Reference only numbers presented in detail during the test
- Don't introduce new calculations not explained in the content

Summarize key findings with calculations:
- Total consumption and annual cost (from "Sur un an" section)
- Standby consumption (from "En veille" section, if significant)
- Cost per use or per operation
- Practical recommendations
- Replacement economics conclusions (from "Faut-il le remplacer" section, if old device)

{% raw %}
```markdown
{% tldr %}
- [Key finding with calculation using Liquid filters]
- [Another key finding]
- [Comparison or practical conclusion]
{% endtldr %}
```
{% endraw %}

**Examples:**
{% raw %}
- "Utilisé environ 2 fois par semaine, ce sèche-linge consommera {{ 1732.56 | times: 100 | Wh€ }} par an."
- "Il faudrait {{ 0.149 | countPer€: 0.01 }} lavages... pour dépenser 1 centime"
{% endraw %}

### Liquid Filters for Values
The site uses custom Liquid filters for presenting values:

{% raw %}
**Basic formatting:**
- `{{ value | W }}` - Format as watts
- `{{ value | V }}` - Format as volts
- `{{ value | € }}` - Format as euros
- `{{ value | Wh }}` - Format as watt-hours
- `{{ value | Wh€ }}` - Format Wh with cost estimate
- `{{ value | s }}` - Format as seconds (with appropriate time unit)

**Cost extrapolation for continuous power (W filters):**
Use these for standby/idle consumption that runs 24/7:
- `{{ value | W€PerDay }}` - Daily cost for continuous wattage (e.g., {{ 5 | W€PerDay }} for 5W standby)
- `{{ value | W€PerMonth }}` - Monthly cost for continuous wattage
- `{{ value | W€PerYear }}` - Annual cost for continuous wattage (e.g., "{{ 12.3 | W€PerYear }} par an")

**Cost extrapolation for energy per occurrence (Wh filters):**
Use these for one-time consumption multiplied by DAILY usage frequency:
- `{{ value | Wh€PerMonth }}` - Monthly cost for daily usage (e.g., "{{ 500 | times: 30 | Wh€PerMonth }}" for 30 uses per day)
- `{{ value | Wh€PerYear }}` - Annual cost for daily usage (e.g., "{{ 1732 | times: 100 | Wh€PerYear }}" for 100 uses per day)

**Calculations:**
- `{{ value | times: 24 }}` - Multiply (e.g., hourly to daily)
- `{{ value | divided_by: 0.505 }}` - Division
- `{{ value | plus: 28.8 }}` - Addition
- `{{ value | minus: 0.0181 }}` - Subtraction
- `{{ value | round }}` - Round to integer
- `{{ value | percent: total }}` - Calculate percentage
- `{{ value | countPer€: 0.01 }}` - How many uses per cent
- `{{ value | countPer€: 35.99 }}` - How many years/uses to equal cost

**Chaining filters:**
```liquid
{{ 0.435 | times: 24 | percent: 14.9 }}
{{ 0.435 | times: 24 | divided_by: 0.505 | round }}
{{ 0.0211 | minus: 0.0181 | Wh€ }}
{{ 6.65 | times: 8 | times: 365.2425 | countPer€: 35.99 }}
```
{% endraw %}

### External References
Wikipedia/Wiktionary links with French guillemets (« ») in title attribute:
- Format: `[text](url "Page « Title » sur Wikipédia")`
- Examples:
  - `[FreePlug](https://fr.wikipedia.org/wiki/FreePlug "Page « FreePlug » sur Wikipédia")`
  - `[Moulinex](https://fr.wikipedia.org/wiki/Moulinex "« Moulinex » sur Wikipédia")`
  - `[broyeur WC](https://fr.wiktionary.org/wiki/sanibroyeur "« broyeur WC » sur le Wiktionnaire")`
- Used to define technical terms or concepts

## Advanced Content Patterns

### Multiple Operating Modes
When a device has different modes/programs:
- Use H4 headings (####) for each mode
- Explain user controls before showing profiles
- Compare consumption between modes
- Example: "Programme « petite goutte »" vs "Programme « grosse goutte »"

### Standby/Idle Consumption
**Always address standby consumption** - but depth depends on the device:

**For devices with standby consumption** (electronics, soft-power switches):
- Dedicated subsection "En attente" or "En veille"
- Calculate daily cost: {% raw %}`{{ value | W€PerDay }}`{% endraw %}
- Compare to active usage: "Pour que cette consommation en attente soit inférieure..."
- Express as percentage of total

**For old appliances with mechanical switches** (no standby):
- Simply mention that the device has no standby consumption when switched off mechanically
- No need for a dedicated section if there's no measurable standby power

### Annual Extrapolation
For devices with daily patterns:
- Subsection "Sur un an" or "Sur une année"
- Define typical daily usage pattern
- Calculate total daily consumption with breakdown
- Extrapolate: {% raw %}`{{ dailyValue | Wh€PerYear }}`{% endraw %}
- Compare to device cost or other context

### Practical Cost Context
Express energy costs in relatable ways:
- "Il faudrait tirer X chasses d'eau pour dépenser un centime"
- Use {% raw %}`{{ value | countPer€: 0.01 }}`{% endraw %} filter
- Compare to device purchase price
- "C'est négligeable comparé à..."

**Recent emphasis on ingredient costs:**
- Compare electricity to consumable costs: "le poisson coutera beaucoup plus cher que l'électricité" (moulinette-s)
- "Le coût du lait... C'est beaucoup plus !" (yaourtiere-seb-multi-delices)
- Shows electricity is negligible for food preparation devices

### Detailed Operational Descriptions
When describing what happens during operation:
- Describe what you hear/observe
- Link observations to consumption patterns
- Express uncertainty: "Je ne sais pas exactement à quoi correspond..."
- Speculate reasonably: "Peut-être y a-t-il une électrovanne..."
- "J'imagine qu'il y a..."

### Comparing to Rated Power
Common pattern:
- Reference label specifications
- Note when measured values differ
- "ce qui reste loin de la puissance de X indiquée sur l'étiquette"
- Show label image with {% raw %}`{% image %}`{% endraw %}
- Handle conflicts: "Trois valeurs différentes ! Mesurons pour vérifier"

### Extended Cost Comparisons
Various ways to contextualize costs:
- **Years to equal purchase price**: {% raw %}`{{ consumption | countPer€: purchasePrice }}` ans{% endraw %}
- **Comparison to consumables**: "les consommables... coûteront beaucoup plus cher que l'électricité"
- **Lifetime comparison**: "Ce four ayant 30 ans, il est possible que son coût de fonctionnement... approche maintenant de son prix d'achat neuf"
- **Used vs new**: "Mais un tout petit peu plus que ce que j'ai payé le chauffe-biberon d'occasion"

### Personal Context and Storytelling
Add personal touches:
- Device history: "initialement acheté neuf pour ma grand-mère, j'en ai hérité..."
- Realistic usage: "j'ai demandé à une personne de mon entourage..."
- Emotional reactions: "Honnêtement, ces 30 secondes m'ont déjà paru très longues"
- Caution: "je n'ai pas osé l'essayer, ça risquerait de sentir le brûlé !"

### Multiple Test Scenarios
Present diverse real-world scenarios:
- **Basic usage**: "Une sonnerie dans la journée"
- **Detailed examination**: "Zoom sur une sonnerie"
- **Multiple iterations**: "10 sonneries"
- **Extreme cases**: "Un maximum de bruit"
- **Prohibited usage**: "Appui continu" (testing manufacturer warnings)
- **Realistic patterns**: "Sonneries insistantes"

### Explaining Test Methodology
Sometimes explain non-standard measurement setups:
- Modified installation: "un câble avec une prise électrique standard a été branché sur les bornes"
- Shared circuits: "Le seul autre appareil alimenté par cette ligne électrique est le réfrigérateur"
- Measurement artifacts: "La transmission des données se faisant par wifi, la cadence d'enregistrement peut avoir quelques irrégularités"
- Photos of test setup: "Voici une photo du montage de test"

### Technical Details
When device has interesting internals:
- Describe visible components: "on peut observer à l'intérieur : au centre, un petit marteau..."
- Explain operation: "Une petite quantité d'eau est chauffée jusqu'à ébullition..."
- Link observations to measurements: "on voit ici la puissance médiane mesurée à... Cela s'explique car..."

### Measurement Precision Caveats
Acknowledge measurement limitations:
- "cette différence est tellement faible qu'elle est probablement due aux incertitudes expérimentales"
- "Cela donne l'impression que la précision de l'appareil de mesure est insuffisante"
- Suggest improvements in plusloin: "mesurer précisément... en utilisant un wattmètre ayant un plus fort taux d'échantillonnage"

**Recent pattern for very low power:**
{% raw %}
- Explain alternating 0 and low values: "Les alternances entre des mesures de consommation à {{ 0 | W }} et des mesures à une valeur non nulle... sont probablement dues à la limite de précision de l'appareil de mesure"
- Still give average: "On peut cependant relever la puissance moyenne : {{ 0.214 | W }}"
{% endraw %}
- Suggest better measurement in plusloin: "mesurer la consommation en veille avec un appareil plus précis pour les faibles puissances"

### Behavioral Cycles
For devices with cyclical patterns:
- Describe cycle duration: "Chaque cycle dure 30 secondes"
- Explain alternating states: "le four alterne... entre deux modes de fonctionnement"
- Compare expected vs measured: "On s'attendrait à... mais la puissance moyenne mesurée est de..."
- Explain efficiency implications: "a donc une efficacité énergétique inférieure"

### Special Sections
Beyond the basic structure:
- **"Données du fabricant"** or **"Informations fournies par le fabricant"**: Review manufacturer specifications before testing
  - Subsections: "Étiquette" and "Manuel" (recent pattern)
  - Quote manufacturer documentation in blockquotes
- **"Conseils pour l'autoconsommation photovoltaïque"**: Practical advice for solar panel users (systematic in recent tests)
- **"Faut-il le remplacer avant sa fin de vie naturelle?"**: Financial analysis of replacement vs keeping old device (recent pattern)
- **Multiple H4 scenarios**: Extensive testing variations

### Recent Section Patterns

**"Informations fournies par le fabricant"** (recent tests):
- H4 "Étiquette": Photo and description of label specifications
- H4 "Manuel": Quotes from user manual, especially energy-saving advice
- Example: seche-linge-a-evacuation has full "Conseils en matière d'économie d'énergie" section

**Replacement Analysis Sections** (recent addition):
- Calculate payback period for replacing old device
- Consider both cheapest and equivalent-brand options
- Factor in longevity differences: "Sauf si le vieux modèle se met à coûter cher en réparations, le remplacement pourrait n'être jamais amorti"
- Often conclude keeping old device makes sense

### Manufacturer Documentation
Reference official sources:
- Link to PDFs: `[guide de démarrage rapide](URL)`
- Quote specifications in blockquotes: `> - Sonnerie 2 tons...`
- Test manufacturer warnings: Quote instruction, then test it anyway (with caution)

## Complex Tests and Analysis Patterns

### Progressive Zooming
For complex multi-phase operations:
1. **Overview first**: Show entire cycle/day
2. **Identify interesting phases**: "une phase de quelques minutes a une consommation beaucoup plus élevée"
3. **Zoom progressively**: Start with full cycle, then zoom into specific phases
4. **Name phases**: "Phase de chauffage à 40°C", "Essorage", "Rinçage"
5. **Compare phases**: Calculate percentage of total consumption

Example pattern:
```markdown
### Sur une lessive complète
[Full cycle profile]

#### En détail
Regardons cette phase de chauffage de plus près :
[Zoomed profile]

Regardons maintenant ce qu'il se passe avant...
[Another phase]
```

### Identifying Patterns
Describe what you see:
- "On peut observer qu'il y a 2 phases de chauffe, indiquant qu'il y a eu un prélavage"
- "Je pense reconnaître ici la phase d'essorage"
- "De nombreuses formes semblent assez caractéristiques"
- "On peut retrouver cette forme dans les profils analysés précédemment"
- "On reconnaît bien la forme du profil de l'essorage"

### Memory and Limitations
Be honest about what you remember:
- "Je ne me souviens plus exactement du programme utilisé"
- "Je ne me souviens plus exactement si c'était..."
- Acknowledge what would help: "Si je connaissais mieux le cycle de lavage (ou si j'avais un enregistrement vidéo)"

### Comparative Testing
Present multiple variations:
- **Temperature variations**: 30°C vs 40°C vs 60°C
- **Time variations**: 8h vs 10h vs 12h
- **Program variations**: "Quotidien", "15' Express", "Rinçage et essorage"
- Calculate and compare: {% raw %}`{{ value | percentLess: baseline }}`, `{{ value | percentMore: baseline }}`{% endraw %}

### Mathematical Verification
Check if results make sense:
- "On s'attendrait à... soit environ X, mais la puissance moyenne mesurée est de Y"
{% raw %}
- "{{ 119 | times: 1.5 | Wh }}. Cela confirme que la consommation est proportionnelle au temps"
- Show expected calculation with code notation: "({{ 1400 | divided_by: 30 | times: 13 | W }} — `1400 / 30 * 13`)"
{% endraw %}

### Device Behavior Analysis
Describe operational patterns:
- **Cyclical behavior**: "le four alterne... entre deux modes de fonctionnement. Soit il chauffe... soit il ne chauffe pas du tout"
- **Acceleration phases**: "le tambour qui entre en rotation, accélère, puis maintient sa rotation..."
- **Slow changes**: "monte tout doucement pendant 1 heure 15..."
- **Explanations**: "L'évolution du taux d'humidité... explique probablement ces variations"

### Duration Discrepancies
Common pattern with appliances:
- Note predicted duration: "La durée prévue du cycle est d'une heure et trois minutes"
- Note actual duration: "la durée totale du cycle... a été d'1h15"
- Calculate difference: "soit 10 minutes de plus que le temps qui était prévu"
- Explain when possible: "Ceci s'explique car le sèche-linge utilise une sonde d'humidité"

### Very Low Consumption Handling
For barely measurable consumption:
- "La puissance consommée est trop faible pour être mesurée de façon fiable"
- "l'enregistrement indique donc une alternance entre des valeurs à 0 et des valeurs à..."
- "C'est trop faible pour convertir le coût... en euros ou même en centimes d'euros"
- Use countPer€ for perspective: "il faudrait la laisser branchée X jours pour dépenser 1 centime"

### Financial Analysis Sections
Beyond energy costs:
- **Separate "Rentabilité" section** for economic analysis
- Compare energy cost to material costs: "le litre de lait... C'est beaucoup plus que le coût de l'électricité !"
- Note calculation assumptions: "les calculs... ont été faits en divisant par 7... mais... il pourrait aussi être pertinent de diviser par 6"
- Format prices: {% raw %}`{{ 1.13 | € }}`{% endraw %}

### Cost Comparison Patterns
Multiple approaches to contextualizing electricity costs:

{% raw %}
**1. Cost per item/operation:**
- "{{ 0.19 | countPer€: 0.01 }} boîtes" to spend 1 cent
- "{{ 254 | divided_by: 20 | Wh€ }} consommés en moyenne par tranche de fromage"
- "Il faudrait {{ 11.4 | countPer€: 1 }} fois regarder un DVD acheté d'occasion à 1€"

**2. Device purchase price amortization:**
- "{{ 254 | countPer€: 20 }} soirées raclette... pour dépenser autant en électricité"
- "Il faudrait {{ 11.4 | divided_by: 2 | times: 24 | times: 30 | countPer€: 35 }} mois d'utilisation en continu"
{% endraw %}
- "il est peu probable d'ouvrir assez de boîtes... pour que le coût en électricité... dépasse l'euro symbolique que j'ai investi"

**3. Ingredient/content cost comparison:**
- "Le DVD a été acheté d'occasion pour 1 euro symbolique" vs electricity cost
- "Evidemment, le budget fromage sera très supérieur au budget électricité"
- Often conclude: "C'est négligeable comparé à [purchase/ingredient price]"

**4. Electricity vs total lifecycle cost:**
{% raw %}
- lecteur-dvd: If bought for 35€, would need {{ X }} months continuous use for electricity to exceed purchase
{% endraw %}
- ouvre-boites: "le coût de fonctionnement est une erreur d'arrondi comparé au prix d'achat"

### Testing Edge Cases and Unusual Scenarios
Recent tests include creative testing scenarios:
- **imprimante-laserjet-pro**: "Réveil sans impression" - unexpected wake from standby
- **lecteur-dvd-thomson-thd300**: "En pause" during movie - baby woke up for bottle
- **raclette-a-deux**: Cooking bacon on top while cheese melts below
- **ventilateur-carrefour-home**: "Avec une serviette devant le ventilateur" - blocking airflow
- **Pattern**: Test real-world usage, interruptions, and unconventional but practical uses

### Shutdown/Startup Cost Analysis
Calculate when it's worth turning off:
{% raw %}
- **imprimante-laserjet-pro**: Shutdown cycle {{ 0.986 | Wh }} vs 5-minute ready wait {{ 1.26 | Wh }}
- "Le redémarrage complet... C'est moins que la consommation pendant les 5 minutes que l'imprimante attend"
- "Cela correspond aussi à la consommation de l'imprimante restant en veille pendant {{ X }} minutes"
{% endraw %}
- Conclusion: Better to shut down if done printing

### Energy Efficiency Context
Acknowledge technology improvements:
- "D'après l'étiquette énergétique... c'est un modèle ayant une très bonne efficacité énergétique"
- "Eh oui, comme on l'a acheté neuf, on a pris ce qui nous paraissait le mieux !"
- "C'est probablement grâce à la pompe à chaleur. Un sèche-linge d'une technologie plus ancienne consommerait beaucoup plus"
- Compare with older tech in plusloin

### Usage Pattern Descriptions
Describe realistic usage:
- "la plupart du temps on ne se casse pas trop la tête"
- "on ne se casse pas trop la tête. On sort le linge... on met le coton... et le synthétique va sécher naturellement"
- "Notre [appareil] tourne donc presque toujours sur le programme X"

### Medical/Health Devices
Special considerations for medical equipment:
- **machine-apnee-sommeil**: Extensive nightly testing (4 nights), variability analysis
- **Document breath patterns**: "On observe des oscillations correspondant aux inspirations"
- **Identify apnea events**: "un plateau pendant quelques secondes, correspondant à une apnée"
- **Explain pressure adjustments**: "un pic suivi... la pression envoyée par la machine augmente"
- **Analyze mysterious cycles**: "J'imagine que... est due à un logiciel qui mériterait d'être un peu optimisé"
- **Very wide consumption ranges**: From 9.37W to 19.0W average depending on night
- **Discuss clinical data correlation**: Suggest using device's memory card data in plusloin

### Network Activity Observations
Speculate about network-related consumption patterns:
- **imprimante-laserjet-pro**: "j'ai l'impression que les moments où l'imprimante... consommait plus correspondent aux moments où j'étais actif sur mon ordinateur"
- "Il y avait peut-être plus d'activité sur le réseau"
- "il est possible que des paquets aient été échangés par un protocole d'auto découverte"
- **machine-apnee-sommeil**: Modem wakeups every 2-3 seconds vs 10 seconds
- Pattern: Connect consumption variations to network activity when device is networked

### Comments in Code
Use Liquid comments **right after profile/image tags** for:
1. **Preserving original descriptions from draft data**
2. **Documenting alternate profiles not used in final test**

{% raw %}
```liquid
{% profile "filename.json.gz" '{"name": "Description", "range": "..."}' %}
{% comment %}Original description from draft: [description provided in draft data]{% endcomment %}

{% image "./images/filename.jpg" "Description" "512w" 512 %}
{% comment %}Original description from draft: [description provided in draft data]{% endcomment %}

{% comment %}
Alternate profile not used:
{% profile "yaourts-10h.json.gz" '{"name": "Alternative view", "range": "..."}' %}
{% endcomment %}
```
{% endraw %}

**Keep draft descriptions as comments** - They provide useful context and documentation of the original data.

### Filter Usage Patterns
More sophisticated calculations:
{% raw %}
- `{{ 119 | divided_by: 7 | Wh€ }}` - per-item costs
- `{{ value | percentLess: baseline }}` - reduction comparisons
- `{{ value | percentMore: baseline }}` - increase comparisons
- `{{ 1.13 | divided_by: 7 | € }}` - divide prices
- `{{ 7.24 | countHPer€: 0.01 }}` - hours per cent
{% endraw %}

### Liquid Variables
Use {% raw %}`{% assign %}`{% endraw %} for complex calculations in tldr:
{% raw %}
```liquid
{% assign server_power = 17.1 | times: 24 %}
{% assign player_active_power = 8.3 | times: 4 %}
{% assign total_power = server_power | plus: player_active_power %}
- {{ total_power | Wh€PerYear }} consommés par an...
```
{% endraw %}

## Specialized Test Patterns

### Multi-Component Devices
For systems with multiple parts (Freebox Server + Player):
- **Test each component separately**: "Freebox Server", "Freebox Player", "FreePlug", "Boîtier fibre"
- **Measure isolat impact**: Power adapters, optical network units, power line adapters
- **Calculate combined scenarios**: Different usage patterns
- **Use thermal imaging**: "L'utilisation d'une caméra thermique confirme cette impression"
- **Explain interdependencies**: "La prise connectée perturbant la liaison par courant porteur"

### Always-On Devices
Special considerations for 24/7 devices:
- Compare to subscription costs: "Le coût en électricité... correspond environ à un mois du forfait d'abonnement"
- "Dit autrement, la Freebox se fait payer un treizième mois en électricité !"
- Discuss shutdown feasibility: "il ne sera pas envisageable de l'éteindre" vs "éteindre la box... pourrait être un bon choix"
- Calculate breakeven points

### Repeated Tests with Variations
Present multiple runs with differences:
- **First test**: Baseline or unusual conditions
- **Second test with changes**: "avec un filtre propre"
- **Compare results**: "La consommation totale... n'est que 41,3% de ce qu'elle était"
- **Express uncertainty about causes**: "Je ne saurai pas... si cette grosse différence est causée par... Probablement un peu des deux"

### Detailed Phase Decomposition
When a test has multiple distinct phases:
```markdown
On observe plusieurs étapes, au cours desquelles la consommation :
- [phase 1 with timing and observation]
- [phase 2 with timing and observation]
- [phase 3 with timing and observation]
```

### Measurement Challenges
Acknowledge and explain workarounds:
- "Cela n'a pas été aussi simple que prévu, car..."
- Explain modified setup: "j'ai déplacé celui-ci près du Server et ai relié les deux par un câble réseau"
- Mention limitations introduced: "si le CPL n'est pas utilisé"

### Non-Obvious Insights
Look beyond the obvious:
- Component isolation: Testing individual parts to understand total
- Hidden costs: Power adapters consuming power even idle
- Unexpected behaviors: "le voyant vert... se mettait à clignoter... et ce changement avait un impact visible"
- Thermal observations: Link heat to consumption

### Wikipedia Links
Use for technical terms and context with French guillemets in title:
- `[Freebox Mini 4K](https://fr.wikipedia.org/wiki/Freebox#... "Page « Freebox Mini 4K » sur Wikipédia")`
- `[liaison par courant porteur](https://fr.wikipedia.org/wiki/Courants_porteurs_en_ligne "Page « Courants porteurs en ligne » sur Wikipédia")`
- `[proxy](https://fr.wikipedia.org/wiki/Proxy_(variable) "Page « Proxy » sur Wikipédia")`

### Complex Annual Calculations
When multiple usage scenarios combine:
{% raw %}
```markdown
Si l'on suppose une utilisation typique... avec le boîtier Server qui reste tout le temps allumé, connecté à la fibre, et la télévision qui est utilisée 4h par jour... on consommera :
- {{ X | W }} 24h/24 pour..., soit {{ X | W€PerYear }} par an ;
- {{ Y | W }} 4 heures par jour pour..., soit {{ Y | times: 4 | Wh€PerYear }} par an.

Soit un total de...
```
{% endraw %}

### Range Estimates
When results vary significantly:
- "La consommation... sera comprise entre X et Y"
- "une fourchette de... à... par jour"
- Explain what causes variation
- "Il est donc très possible que..."

### Testing Physical Changes
Document modifications during testing:
- "J'ai donc nettoyé le filtre et les capteurs"
- Show impact: Compare before/after
- Be uncertain when appropriate: "Je ne saurai pas... si... ou si..."

### Observed Phenomena Descriptions
Rich sensory descriptions:
- What you hear: "on entend l'aspirateur de la base qui fonctionne de plus en plus fort"
- What you see: "le voyant vert... s'est mis à clignoter lentement"
- What you feel: "on constate rapidement que le Server est plus chaud"
- What lights do: "un témoin orange s'allumé sur la façade"

### Speculation with Reasoning
Express thoughts transparently:
- "On peut supposer que..."
- "Je pense que la durée de cette phase dépend de..."
- "C'est probablement le temps utilisé par..."
- "On peut donc se douter que..."
- "J'imagine qu'il pourrait s'agir de..."

## Key Takeaways for Generating Tests

When generating a new test from draft data:

### What You'll Receive
- **Profile ranges**: Named timestamps identifying different test scenarios
- **Statistics for each profile**: Energy used (Wh), average/median/max power (W), profile duration
- **Profile screenshots**: Visual graphs showing power consumption over time for each profile range
- **Images**: Device photos, labels, control panels, test setups
- **Descriptions**: Context about device usage and purpose
- **Measurements**: Power readings for different scenarios

**Using profile screenshots:**
- Observe visual patterns: spikes, plateaus, cycles, gradual changes
- Identify distinct operational phases and transitions
- Describe what you "see" in the graphs using phrases like "On observe...", "On remarque..."
- Note unexpected patterns or measurement artifacts
- Use the visual information to write authentic, observational descriptions

### What You Need to Generate
- **Narrative structure**: Transform data into a logical story
- **Progressive detail**: Overview → zoom → analysis → conclusions
- **Observations**: Describe patterns you "see" in the profiles
- **Calculations**: Use Liquid filters to compute costs, percentages, comparisons
  - **CRITICAL: Use ONLY measured values from profile statistics**
  - **Never make up, estimate, or invent numbers**
- **Context**: Connect to real-world usage, costs, decisions
- **Honest tone**: Include uncertainty, surprises, limitations

### Critical Elements (Updated for 2024-2025 Style)
1. **Opening question** - End with interrogative about consumption
2. **tldr block** - REQUIRED: Key findings with calculations (write LAST, use exact values from test body)
3. **Intro block** - Full device description with image
4. **Measurement method** - ALWAYS explain measurement equipment with link to measurement article
   - Shelly Plus PlugS for standard devices (link with {% raw %}`{% post %}`{% endraw %})
   - Shelly Pro EM-50 for high-current devices (describe electrical panel setup)
5. **Informations fournies par le fabricant** - Étiquette + Manuel subsections when relevant
6. **Progressive profiles** - Start broad, zoom to details
7. **Value formatting** - Use {% raw %}`{{ value | filter }}`{% endraw %} consistently
8. **Standby analysis** - Calculate annual cost, compare to usage, recommend unplugging if significant
9. **Practical conclusions** - Annual costs, comparison to device price, ingredient costs for food prep
10. **Replacement economics** - For old devices: calculate payback period, consider longevity
11. **Autoconsommation photovoltaïque** - Dedicated subsection analyzing solar compatibility
12. **Device comparisons** - Link to similar tests with {% raw %}`{% test slug description %}`{% endraw %}
13. **Personal touches** - Usage patterns, observations, reactions, device history
14. **plusloin block** - REQUIRED: Suggest 3-5 follow-up investigations (only oldest tests lack this)

### Common Patterns to Follow
- **Power startup**: "On observe un pic de consommation au démarrage"
- **Stable operation**: "La consommation se stabilise à..."
- **Cycles**: "le four alterne... entre deux modes"
- **Phases**: Name and analyze each distinct phase
- **Cost context**: "Il faudrait... X fois pour dépenser un centime"
- **Device comparison**: Link to related tests with {% raw %}`{% test %}`{% endraw %}
- **Uncertainty**: "Je ne sais pas exactement..." when unsure
- **Speculation**: "On peut supposer que..." with reasoning

**Recent additions (2024-2025):**
- **Standby >> usage**: "La consommation en veille... est très supérieure à la consommation liée à l'utilisation"
{% raw %}
- **Percentage of total**: "La consommation en veille représente {{ X | percent: Y }}"
{% endraw %}
- **Replacement question**: "Faut-il le remplacer avant sa fin de vie naturelle?"
{% raw %}
- **Payback calculation**: "Il faudrait {{ X | countPer€: Y }} cycles pour rentabiliser le remplacement"
{% endraw %}
- **Longevity factor**: "Sauf si le vieux modèle tient depuis près de X ans..."
- **Solar timing**: "On pourra maximiser l'autoconsommation en démarrant... en milieu de matinée"
- **Ingredient cost comparison**: "Le lait coûte beaucoup plus que l'électricité"
- **Measurement artifact explanation**: "sont probablement dues à la limite de précision de l'appareil"

### Tone Guidelines
- **Use "je"** for personal experiences and actions
- **Use "on"** for general observations and expectations
- **Be curious**: "Cette valeur est étonnamment élevée..."
- **Be honest**: "Je ne me souviens plus exactement..."
- **Be practical**: Connect to real usage and costs
- **Be precise**: Quote specific measured values
- **Be accessible**: Explain technical concepts

### Avoid
- Generic descriptions without specific values
- All profiles shown without context or analysis
- Pure technical data without narrative
- Overly certain statements about uncertain things
- Skipping the progression from overview to detail
- Forgetting to calculate annual costs
- Missing the practical "so what?" conclusions

**Recent tests also avoid:**
- Ignoring standby consumption (always address it - full analysis for electronics, brief mention for mechanical switches)
- Missing replacement economics for old devices
- Skipping autoconsommation photovoltaïque section
- Not comparing to similar devices when relevant tests exist
- Forgetting ingredient/consumable cost comparison for food prep devices

## Quality Checklist

Before completing a generated test, verify:

**Structure:**
- [ ] Front matter complete with all required fields
- [ ] Title uses indefinite article ("un"/"une")
- [ ] Opening ends with question + `<!-- excerpt -->`
- [ ] **tldr block present (REQUIRED for all new tests)**
- [ ] Le matériel section has intro block with image
- [ ] Méthode de mesure subsection present

**Content:**
- [ ] All profile ranges referenced with context
- [ ] Values cited with proper formatting and filters
- [ ] Multiple modes/scenarios presented logically
- [ ] Standby consumption analyzed if applicable
- [ ] Annual extrapolation if relevant
- [ ] Practical cost comparisons included
- [ ] Comparison to device purchase price if relevant

**Style:**
- [ ] Conversational, first-person tone maintained
- [ ] Cross-references use proper syntax ({% raw %}`{% test %}`{% endraw %}, {% raw %}`{% post %}`{% endraw %})
- [ ] Unexplained phenomena acknowledged honestly
- [ ] Speculation marked as such ("j'imagine", "peut-être")
- [ ] Images referenced with proper syntax
- [ ] External links for technical terms when helpful
- [ ] Progressive detail: overview → zoom → analysis
- [ ] Observations describe what's visible in profiles
- [ ] **plusloin block at end (REQUIRED for all new tests)**

**Accuracy:**
- [ ] Profile ranges match available data
- [ ] Calculations use correct Liquid filters
- [ ] Values are internally consistent
- [ ] Technical descriptions are plausible
- [ ] Cross-references point to existing tests

**Build verification:**
- [ ] Run `yarn build` to verify the test is free of Eleventy errors
- [ ] Check that all Liquid syntax is valid
- [ ] Ensure all referenced tests/images exist
