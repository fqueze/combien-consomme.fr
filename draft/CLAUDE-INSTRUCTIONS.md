# Instructions for Claude: Generating New Test Pages

When the user asks you to generate a new test page from draft data, follow these instructions carefully.

## Step 1: Gather Information

Before writing anything, you need:

1. **Read the generated template** (`draft/{slug}/preview/tests/{slug}.md`)
   - The template contains all profile ranges with their shortcodes already inserted
   - **IMPORTANT: Profile ranges are in MILLISECONDS** (e.g., "170260m35998415" means from 170260ms to 35998415ms)
   - Review the profile data directory (`draft/{slug}/preview/profile-data/`) for statistics and screenshots
   - Each profile has: energy used, average/median/max power, duration (in hours/minutes), and a visual screenshot
   - **Duration in statistics files is already converted** to human-readable format (e.g., "9h59min")
   - Check available images in `draft/{slug}/preview/images/`
   - **Read notes from draft** (if present in template as a comment)
   - Replace all TODO items with actual content

2. **Review profile data in detail**
   - Open each profile screenshot (`.png` files in `profile-data/`)
   - Read the statistics file for each profile (`.txt` files)
   - Understand the consumption patterns visually
   - Note interesting features: spikes, plateaus, cycles

3. **Review existing similar tests** (use `draft/existing-tests.md`)
   - Find related tests for cross-references
   - Check if there are comparison opportunities
   - Note similar devices to understand patterns

4. **Check README.md patterns**
   - Review the "Recent Trends (2024-2025 Tests)" section
   - Ensure you follow current writing style

## Step 2: Plan the Test Structure

**The template already contains all the profiles - your job is to organize and describe them.**

Review the template structure:

- **Title**: Start with "un" or "une" + descriptive name
- **Opening paragraph**: 1-2 sentences ending with consumption question
- **tldr block**: REQUIRED - Key findings with calculations (NOTE: write this LAST, after completing all test sections)
- **Le matériel section**:
  - Intro block with main image
  - Device description and context
  - Méthode de mesure subsection (ALWAYS include link to measurement article)
    - Shelly Plus PlugS for standard devices (< 12A)
    - Shelly Pro EM-50 for high-current devices (> 12A)
- **Consommation section**:
  - "Informations fournies par le fabricant" (if relevant)
    - H4 Étiquette
    - H4 Manuel (if manufacturer docs available)
  - Main test with **available** profile ranges organized logically
  - Progressive zooming (overview → detail → analysis)
  - Standby/veille analysis (calculate annual cost)
  - "Sur un an" or "Consommation annuelle"
  - "Faut-il le remplacer..." (if old device)
  - "Conseils pour l'autoconsommation photovoltaïque"
- **plusloin block**: REQUIRED - Suggest further investigations (including tests you'd have liked to do but lacked data for)

## Step 3: Write the Content

**IMPORTANT WRITING ORDER:**
1. Write front matter, opening paragraph, and `<!-- excerpt -->`
2. Write Le matériel section (intro + méthode de mesure)
3. Write Consommation section with all profiles and analyses
4. Write plusloin block
5. **Write tldr block LAST** - go back and insert it after `<!-- excerpt -->`

### Front Matter
```yaml
---
layout: test-layout.njk
title: un/une [device name]
img: [main-image.jpg]
date: [YYYY-MM-DD]
tags: ['test']
---
```

### Opening Paragraph
- 1-2 sentences introducing the device
- End with a question about consumption: "À quoi ressemble sa consommation ?" or similar
- **IMPORTANT: No links in the opening paragraph** - it appears in excerpts/listings
- Follow with `<!-- excerpt -->`
- **Add an empty tldr block** - you'll fill it at the end

### tldr Block (REQUIRED - Write This LAST)
**Write this block AFTER completing all other sections.**

**CRITICAL: Use EXACT SAME values and filter calculations from the test body.**
- **All numerical values MUST come from profile statistics** (energy used, average/median/max power, duration)
- **Never make up or estimate numbers** - use only measured values from profiles
- Reference only values that are presented in detail during the test
- Copy the exact same Liquid filter expressions: {% raw %}`{{ 1732.56 | times: 100 | Wh€ }}`{% endraw %}
- Don't introduce new calculations that aren't explained in the test content
- Summarize key findings from "Sur un an", "En veille", "Faut-il le remplacer" sections

**What to include:**
- Total consumption and annual cost (from "Sur un an" section)
- Standby consumption findings (from "En veille" section, if significant)
- Cost comparisons (per-use, annual, vs purchase price)
- Replacement economics conclusions (from "Faut-il le remplacer" section, if old device)
- Practical usage recommendations

**Format:**
{% raw %}
```markdown
{% tldr %}
- [Key finding with calculation using Liquid filters].
- [Another key finding].
- [Comparison or practical conclusion].
{% endtldr %}
```
{% endraw %}

**Important:** End each bullet point with a period (`.`) - these are complete sentences.

**Examples from recent tests:**
{% raw %}
- "Utilisé environ 2 fois par semaine, ce sèche-linge consommera {{ 1732.56 | times: 100 | Wh€ }} par an."
- "Il faudrait {{ 0.149 | countPer€: 0.01 }} lavages... pour dépenser 1 centime"
- "La consommation en veille... encourage à débrancher l'appareil lorsqu'il est inutilisé."

**CRITICAL: Converting profile range timestamps to durations:**
- Profile ranges are in MILLISECONDS (e.g., "170260m9370138" = from 170260ms to 9370138ms)
- To display as duration, use: `{{ 9370138 | divided_by: 1000 | s }}` (converts ms → seconds → human format)
- For range durations: `{{ 12385581 | minus: 9540397 | divided_by: 1000 | s }}`
- ❌ WRONG: `{{ 9370138 | s }}` (treats milliseconds as seconds)
- ✅ CORRECT: `{{ 9370138 | divided_by: 1000 | s }}` (2h36min)
{% endraw %}

### Le matériel Section

{% raw %}
```markdown
## Le matériel
{% intro "image.jpg" "Full device name with brand and model" %}

[Description paragraph: what it is, what it does, context of use]

[Optional: personal story, where it came from, why you're testing it]

[Optional: {% test other-slug description %} cross-references]

### Méthode de mesure

**IMPORTANT: Always include a `{% post %}` link to the measurement article.**

[Device name] est branché(e) sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}
```
{% endraw %}

**IMPORTANT: The intro block must start with an empty line** after the opening tag.

**For high-current devices (>12A):**
Describe the Shelly Pro EM-50 setup in tableau électrique as shown in seche-linge-a-evacuation.
Explain that the device is connected via the electrical panel rather than a plug.

### Consommation Section

#### Start with manufacturer information (recent pattern):
{% raw %}
```markdown
## Consommation

### Informations fournies par le fabricant

#### Étiquette
[Photo and description of label]

L'étiquette indique une puissance de {{ X | W }}.

#### Manuel
[Quote relevant parts, especially energy-saving advice]

**IMPORTANT: Put manual quotes in italics** when they are direct citations:
- Use `« *quote from manual* »` format for inline citations
- For blockquotes (using `>` syntax), the content is already formatted as citation
- Example: `Le manuel indique que « *l'affichage de l'heure s'assombrit au bout de 10 minutes* » pour économiser l'énergie.`
```
{% endraw %}

#### Present profiles logically:

**IMPORTANT: Profile ranges are in MILLISECONDS** - To use them as durations, you MUST convert: `{{ timestamp | divided_by: 1000 | s }}`

**IMPORTANT: Preserve original descriptions from draft data as Liquid comments** right after each profile/image tag for documentation.

**Profile and Image Introductions:**

Each profile or image should have an **introductory sentence** that:
- Sets up what the reader will see
- Uses actual content from the analysis (duration, consumption, key finding)
- Ends with a colon before the profile/image shortcode
- **AVOID generic "Voici" phrases** - adapt the first sentence of your description instead

Examples:
- ✅ GOOD: `Pendant les 2 heures d'attente avant le démarrage du cycle, la consommation est stable autour de {{ 3.7 | W }} :`
- ✅ GOOD: `La phase de lavage avec chauffage dure {{ 6128 | s }} et consomme {{ 916 | Wh€ }}, soit {{ 916 | percent: 1040 }} de la consommation totale du cycle :`
- ✅ GOOD: `La charge complète dure {{ 9370138 | divided_by: 1000 | s }} et consomme {{ 4.34 | Wh€ }} :` (converting ms to seconds)
- ❌ BAD: `La charge dure {{ 9370138 | s }} :` (using milliseconds directly - will show wrong duration)
- ❌ BAD: `Voici la phase de lavage avec chauffage :`
- ❌ BAD: `Voici le profil de consommation :`

The intro sentence should contain a meaningful fact, not just announce what's coming.

1. **Overview profile first** - Full cycle or typical day
{% raw %}
```markdown
### [Test name]

[Introductory sentence with key fact ending with colon:]

{% profile "filename.json.gz" '{"name": "Description", "range": "timestamp"}' %}
{% comment %}draft: [description from draft data, if present]{% endcomment %}

[Continue with detailed observations about the overall pattern - describe what you SEE in the profile screenshot]
[Use observational language: "On observe...", "On remarque...", "La consommation se stabilise à..."]
[Quote key values from profile statistics with filters: {{ value | W }}, {{ total | Wh€ }}]
[IMPORTANT: Use only measured values from profiles - never make up numbers]
[Describe visual patterns: spikes, plateaus, cycles, gradual changes]
```
{% endraw %}

2. **Zoom into interesting phases**
{% raw %}
```markdown
### En détail

#### [Phase name]

[Introductory sentence with key fact ending with colon:]

{% profile "filename.json.gz" '{"name": "Phase description", "range": "timestamp"}' %}
{% comment %}draft: [description from draft data, if present]{% endcomment %}

[Continue with detailed observations based on the profile screenshot]
[Describe specific features you see: startup spikes, stable operation, shutdown]
[Explain what's happening: "On observe...", "On peut supposer que..."]
[Connect visual patterns to device behavior]
```
{% endraw %}

**Heading Hierarchy:**
- Keep heading levels reasonable - avoid excessive nesting
- Typical structure:
  - `##` Main sections (Le matériel, Consommation)
  - `###` Major subsections (Informations fournies, En détail, Sur un an)
  - `####` Sub-subsections (Étiquette, Manuel, Phase names)
  - `#####` Only for rare additional breakdown within phases
- If you find yourself at `######`, reconsider your organization

3. **Reference images when relevant**
{% raw %}
```markdown
[Introductory sentence if the image needs context:]

{% image "./images/filename.jpg" "Description" "512w" 512 %}
{% comment %}draft: [description from draft data, if present]{% endcomment %}
```
{% endraw %}

**Content Organization Around Images:**

**CRITICAL: The test must tell a story that integrates ALL provided images naturally.**

- **Never place images in the intro block** - they belong in the body text where they're relevant
- Images must contribute to the narrative, not just be inserted randomly
- Think of the test as a story you're telling with text and images working together
- Position images exactly where they illustrate what you're describing
- Use two spaces at the end of a line before an image tag to add a line break when needed for better visual flow

**Specific guidelines:**
- Describe device features (display, controls, programs) **near their photos**
- Don't mention the display in the intro if the display photo appears later
- Place test plan or usage protocol explanation near the images that show the steps
- Position images after the sentence that mentions them
- Example: If you say "the Coton 40° program is most efficient", place the program selection image right after that sentence
- If you have a series of images showing steps (like a cooking process), structure the text to walk through each step with its image

#### Standby/Veille Analysis

**Always address standby consumption** - but the level of detail depends on the device:

**For devices with standby consumption** (electronics, soft-power switches):
{% raw %}
```markdown
### [En veille / En attente / Au repos]

{% profile "filename.json.gz" '{"name": "Veille description", "range": "timestamp"}' %}

[Describe standby power]

Si [device] reste branché(e) tout le temps, [il/elle] consommera {{ value | W€PerYear }} par an.

[If significant compared to usage:]
La consommation en veille représente {{ standby | percent: total }} de la consommation totale [when used X times per day/week]. [Débrancher recommendation if relevant]
```
{% endraw %}

**For old appliances with mechanical switches** (no standby power):
Simply mention in a single line that the device has no standby consumption when switched off mechanically.

#### Annual Extrapolation / Cost Analysis

**Be realistic about actual usage patterns.** Don't make unrealistic projections like "once per month for years."

{% raw %}
```markdown
### Sur un an / Coût d'usage

[For regularly used devices:]
Si l'on suppose que [device] est utilisé(e) [frequency], la consommation annuelle sera de {{ value | Wh€PerYear }} par an.

[For occasional-use devices (waffle makers, raclette, etc.):]
Le coût électrique d'une utilisation de {{ value | Wh€ }} est dérisoire comparé au coût [des ingrédients / de l'usage].

Dans la réalité, ce type d'appareil est souvent acheté ou offert, sert quelques fois avec enthousiasme, puis finit oublié dans un placard. [Compare to purchase price rather than unrealistic annual projections]

[Always compare to device purchase price if known - more meaningful than annual cost for occasional-use items]
```
{% endraw %}

**Important considerations:**
- Recognize real usage patterns (e.g., appliances forgotten in cupboards)
- Compare electricity cost to purchase price using `{{ energy | countPer€: price }} utilisations`
- For professional use, mention it would require a more robust model
- Focus on per-use cost rather than unrealistic annual projections for occasional-use items

#### Replacement Economics (for old devices)

{% raw %}
```markdown
### Faut-il le remplacer avant sa fin de vie naturelle ?

[Compare to modern equivalent]
Lors de notre test d'un {% test modern-equivalent-slug description %}, la consommation... a été mesurée à {{ X | Wh }}. C'est {{ X | percentLess: Y }} de moins, soit une économie de {{ Y | minus: X | Wh€ }} par cycle.

[Calculate payback period]
Le modèle [modern] le moins cher... coûte environ {{ price | € }}. Il faudrait donc {{ Y | minus: X | countPer€: price }} cycles pour rentabiliser le remplacement.

[Consider longevity]
Si [old device] tient depuis près de X ans... pas sûr que les modèles récents aient une telle longévité.

[Conclude - often: keep the old one]
On va donc conseiller à [user] de faire durer son vieux tromblon encore quelques années !
```
{% endraw %}

#### Autoconsommation Photovoltaïque (systematic in recent tests)

**Standard residential installation in France: 3 kWc** (not 2.5 kW)

{% raw %}
```markdown
### Conseils pour l'autoconsommation photovoltaïque

[Analyze power profile vs solar production]
La puissance de {{ power | W }} du [device] [reste compatible avec / est relativement élevée pour] une installation photovoltaïque domestique standard. Une installation en toiture standard de 3 kWc produira suffisamment en milieu de journée ensoleillée [, même en hiver,] pour alimenter [device].

La [forte puissance / puissance alternante / consommation étalée] de [device] [rend difficile / permet / facilite] son alimentation par des panneaux photovoltaïques.

[Suggest timing]
Pour maximiser l'autoconsommation, plusieurs options :
- [timing option 1] ;
- [timing option 2] ;
- [timing option 3].

[Compare to alternatives if relevant]
Une {% test alternative-slug description %} sera plus facile à alimenter avec la production photovoltaïque.

[Put economic perspective]
Cela dit, avec un coût électrique de {{ value | Wh€ }}, l'enjeu économique reste [très faible / modéré].
```
{% endraw %}

### plusloin Block (REQUIRED)

**Always end the test with this block** - suggest 3-5 realistic follow-up investigations.

**Format:**
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
- **Tests you planned but couldn't do** due to lack of profile data (e.g., different temperature settings, programs, or modes)
- Test different settings/modes not covered
- Measure at different ambient temperatures/seasons
- Compare with different models or technologies
- Measure with more precise equipment for edge cases
- Test impact of maintenance (clean filters, descaling, etc.)
- Measure specific components separately
- Test different usage patterns or intensities

**Be specific and clear in suggestions:**
- ❌ BAD: "évaluer l'impact de faire plusieurs gaufres d'affilée sans pause vs avec des pauses longues" (unclear: is device unplugged during pauses?)
- ✅ GOOD: "évaluer l'impact du temps pendant lequel le gaufrier reste ouvert entre deux gaufres (perte de chaleur dans la pièce, surconsommation pour revenir à température)"

**Important:** You cannot make up measurements, but you CAN suggest tests that would be valuable to conduct in the future.

**Examples from recent tests:**
- "tester les différents programmes, avec différentes durées"
- "comparer la consommation lors de l'utilisation de lait à température ambiante ou de lait sorti du frigo"
- "mesurer la consommation en veille avec un appareil plus précis pour les faibles puissances"
- "évaluer l'influence de la longueur du conduit d'évacuation"
- "comparer avec d'autres modèles de [device type]"

## Step 4: Language and Style

### Tone
- **First person conversational**: Use "je", "on", "nous"
- **Curious and explanatory**: "On observe...", "Cela s'explique car..."
- **Honest about limitations**: "Je ne sais pas exactement...", "Peut-être..."
- **Speculative when appropriate**: "On peut supposer que...", "J'imagine que..."

### Using Averages and Statistics Carefully

**Be cautious when using average power values** - ensure they represent the actual usage scenario you're describing.

**Examples:**
- ❌ WRONG: "le gaufrier continuera à maintenir sa température, consommant 772 W en moyenne" (772W is the average during continuous preheating, not during normal temperature maintenance with thermostat cycles)
- ✅ CORRECT: "le gaufrier continuera à maintenir sa température, consommant plus de 500 W en moyenne" (543W is the overall average including cycles, but rounding to "plus de 500 W" is clearer)

**Key principle:** Match the statistic to the context. Don't use preheating averages to describe standby consumption, or vice versa.

### Value References
Always use Liquid filters:

{% raw %}
**Basic formatting:**
- Power: `{{ 1234 | W }}`
- Energy: `{{ 567 | Wh }}`
- Cost: `{{ 89 | € }}`
- Percentage: `{{ 123 | percent: 456 }}` (123 as a percentage of 456)
  - **IMPORTANT:** `percent`, `percentMore`, and `percentLess` return formatted strings - you CANNOT apply more math operations after them
  - ❌ WRONG: `{{ 100 | percent: 1000 | times: 2 }}` (can't multiply a string)
  - ✅ CORRECT: `{{ 100 | times: 2 | percent: 2000 }}` (do all math first, then format)
- Percentage comparison: Choose the right filter based on the comparison:
  - `{{ 1040 | percentMore: 736 }}` → "41% de plus" (when first value is LARGER)
  - `{{ 736 | percentLess: 1040 }}` → "29% de moins" (when first value is SMALLER)
  - Match your phrasing: "Device A consomme X, soit {{ X | percentMore: Y }} de plus que Device B"
- Per-unit calculations: `{{ 0.5 | countPer€: 0.01 }}` returns a FORMATTED STRING (e.g., "50")
  - **IMPORTANT:** This returns a formatted string - you CANNOT apply more math operations after it
  - **IMPORTANT:** Always add the unit manually after this filter
  - ❌ WRONG: `{{ 4.34 | countPer€: 1 | times: 52 }}` (can't multiply a string)
  - ✅ CORRECT: `{{ 4.34 | times: 52 | countPer€: 1 }} ans` (do all math first, then format and add unit)
  - Example: `{{ 0.149 | countPer€: 0.01 }} lavages` → "65 lavages"
- Duration: `{{ 12381 | s }}` (converts seconds to human-readable format)

**Cost extrapolation - choose the right filter:**
- For **continuous power** (standby/idle): Use W filters
  - `{{ 12.3 | W€PerYear }}` - Annual cost for 12.3W running 24/7
  - `{{ 5 | W€PerMonth }}` - Monthly cost for 5W running 24/7
- For **energy per occurrence**: Use Wh filters with frequency multiplication (PER DAY)
  - `{{ 1732 | times: 100 | Wh€PerYear }}` - Annual cost for 100 uses per day of 1732Wh each
  - `{{ 500 | times: 30 | Wh€PerMonth }}` - Monthly cost for 30 uses per day of 500Wh each

**CRITICAL Liquid Filter Rules:**

1. **NO scientific notation** - Liquid parser doesn't support it
   - ❌ WRONG: `{{ 1.04e+3 | Wh€ }}`
   - ✅ CORRECT: `{{ 1040 | Wh€ }}`

2. **Math operations are sequential (left to right), NO operator priority**
   - Operations are processed in order: `a | times: b | plus: c | times: d` = ((a × b) + c) × d
   - ❌ WRONG: `{{ 1040 | times: 2 | times: 52 | plus: 218 | times: 52 }}` = (1040 × 2 × 52 + 218) × 52
   - ✅ CORRECT: `{{ 1040 | times: 2 | plus: 218 | times: 52 }}` = (1040 × 2 + 218) × 52
   - Think carefully about the order - there are no parentheses in Liquid, operations execute strictly left-to-right

3. **Wh€PerYear expects DAILY consumption** - it multiplies by 365 internally
   - ❌ WRONG: `{{ 1040 | Wh€PerYear }}` (treats 1040Wh as daily usage)
   - ✅ CORRECT for weekly usage: Calculate total annual energy first, then use `Wh€`
   - Example: For 2 uses per week: `{{ 1040 | times: 2 | times: 52 | Wh€ }}`

4. **Make weekly calculations explicit** for clarity
   - ❌ LESS CLEAR: `{{ 1040 | times: 104 | Wh€ }}` (what does 104 mean?)
   - ✅ MORE CLEAR: `{{ 1040 | times: 2 | times: 52 | Wh€ }}` (2 uses/week × 52 weeks)

5. **Units are NOT filters** - write them as plain text
   - ❌ WRONG: `{{ 10 | A }}` (A for amperes is not a filter)
   - ✅ CORRECT: `10 A`

6. **Use s filter for durations** from profile statistics
   - ❌ WRONG: `{{ 5.43 | hours }}` (hours filter doesn't exist)
   - ✅ CORRECT: `{{ 19548 | s }}` (converts seconds to "5h26")
   - ✅ ALSO OK: `3h26` (plain text if not doing calculations)
{% endraw %}

### French Typography

**IMPORTANT: Add regular spaces before punctuation marks**
- Add a normal space before `:` `;` `!` `?`
- The Eleventy build scripts automatically convert them to non-breaking spaces
- Example: `La consommation est stable :` (note the space before colon)
- Example: `Quelle est la consommation ?` (note the space before question mark)

### Common Phrases (2024-2025 style)
{% raw %}
- "On observe un pic de consommation au démarrage"
- "La consommation se stabilise à {{ X | W }}"
- "Il faudrait [X operations] pour dépenser un centime"
- "C'est négligeable comparé à [purchase price / ingredient cost]"
- "La consommation en veille représente {{ X | percent: Y }} du total"
- "Sauf si le vieux modèle tient depuis près de X ans..."
- "On pourra maximiser l'autoconsommation en démarrant..."
{% endraw %}

### Cross-References
Use the slug exactly as listed in `draft/existing-tests.md`:
{% raw %}
```markdown
{% test slug description %}
{% post slug description %}
```
{% endraw %}

### Images
{% raw %}
```markdown
{% image "./images/filename.jpg" "Alt text description" "512w" 512 %}
```
{% endraw %}

### Wikipedia/External Links
Use French guillemets (« ») in title attribute for Wikipedia/Wiktionary links:
```markdown
[text](url "Page « Title » sur Wikipédia")
```

**Examples:**
- `[FreePlug](https://fr.wikipedia.org/wiki/FreePlug "Page « FreePlug » sur Wikipédia")`
- `[Moulinex](https://fr.wikipedia.org/wiki/Moulinex "« Moulinex » sur Wikipédia")`
- `[broyeur WC](https://fr.wiktionary.org/wiki/sanibroyeur "« broyeur WC » sur le Wiktionnaire")`

Use these to define technical terms or provide context.

## Step 5: Prepare for Publishing

When the test is complete, fill in the publishing checklist comment at the top of the file:

1. The front matter changes (layout, tags, remove isDraft/basePath)
2. The `existing-tests.md` entry with:
   - Slug (already filled in)
   - Title (already filled in)
   - Device brand and model
   - 3-5 key findings from your analysis

This information will be needed when the test is moved from preview to production.

## Step 6: Quality Checks

Before submitting, verify:

**REQUIRED elements (every test must have these):**
- [ ] Title uses indefinite article ("un"/"une")
- [ ] Opening ends with question + `<!-- excerpt -->`
- [ ] **tldr block with key findings and calculations**
- [ ] **Méthode de mesure with link to measurement article** ({% raw %}`{% post %}`{% endraw %})
- [ ] All profile ranges from draft data are used
- [ ] Values use proper Liquid filters
- [ ] Standby consumption addressed (full analysis for electronics, brief mention for mechanical switches)
- [ ] Annual usage extrapolation included
- [ ] Autoconsommation photovoltaïque section present
- [ ] **plusloin block with 3-5 realistic suggestions**

**Content quality:**
- [ ] Cross-references to similar tests (check existing-tests.md)
- [ ] For old devices: replacement economics analysis
- [ ] For food prep: ingredient cost comparison
- [ ] Images referenced correctly
- [ ] Conversational first-person tone maintained
- [ ] Progressive detail (overview → zoom → analysis)
- [ ] Uncertainty acknowledged where appropriate

**Build verification:**
- [ ] Check that all Liquid syntax is valid
- [ ] Ensure all referenced tests/images exist
- [ ] After making changes, rebuild the preview with: `ELEVENTY_PREVIEW_ONLY=draft/{slug}/preview npx @11ty/eleventy`

**Publishing preparation:**
- [ ] Fill in the Device brand/model in the publishing checklist comment
- [ ] Write 3-5 key findings for the existing-tests.md entry
- [ ] Verify the front matter changes are documented

**Note:** The `ELEVENTY_PREVIEW_ONLY` environment variable makes Eleventy build only the preview page (~0.6s) instead of the entire site. This allows you to quickly verify your changes work without errors.

## Important Notes

### DON'T:
- **Skip tldr or plusloin blocks** (both are REQUIRED)
- **Make up, estimate, or invent numerical values** - use only measured values from profiles
- Use generic descriptions without specific measured values
- Forget to address standby consumption (full analysis or brief mention as appropriate)
- Forget annual cost calculations
- Miss autoconsommation photovoltaïque section
- Write without checking existing-tests.md for comparisons
- Use overly certain language for uncertain observations
- Skip the progression from overview to detail

### DO:
- **Always include tldr and plusloin blocks** (REQUIRED)
- **Write tldr block LAST** using exact same values/filters from test body
- **Use ONLY measured values from profile statistics** for all calculations
- Quote specific measured values from profiles
- Calculate percentages and comparisons based on real data
- Link to related tests when relevant
- Acknowledge measurement limitations
- Express surprise or uncertainty naturally
- Compare electricity cost to ingredient/purchase costs
- Analyze replacement economics for old devices
- Consider longevity when recommending replacement
- Describe sensory observations (sound, heat, lights)
- Use personal context and storytelling
- Include autoconsommation photovoltaïque section
- Address standby consumption appropriately (thorough analysis for electronics, brief mention for mechanical switches)

## Example Workflow

1. User says: "Generate a test for draft/machine-a-laver-miele"
2. You read: `draft/machine-a-laver-miele/preview/tests/machine-a-laver-miele.md` (the generated template)
3. You check: Profile data in `draft/machine-a-laver-miele/preview/profile-data/` (screenshots and statistics)
4. You review: `draft/existing-tests.md` for washing machine related tests
5. You note: Similar tests exist (machine-a-laver, seche-linge-*), template has 3 profile ranges already inserted
6. You plan: How to describe each profile, what to name each section, what analyses to add
7. You replace: All TODO items in the template with actual content
8. You write: Standby analysis, annual cost, autoconsommation section, plusloin block
9. **You write tldr block LAST**: Go back and insert after `<!-- excerpt -->` using exact values from the test
10. You verify: All checklist items completed

## Questions to Ask Yourself

Before finalizing:
- **Have I written the tldr block LAST using exact values from the test?** (REQUIRED)
- **Does the tldr only reference numbers that appear in the test body?** (REQUIRED)
- **Have I included the plusloin block with 3-5 suggestions?** (REQUIRED)
- Have I addressed standby consumption appropriately (full analysis or brief mention)?
- Have I included the autoconsommation photovoltaïque section?
- Have I cross-referenced similar devices?
- For old devices: Have I discussed replacement economics?
- For food prep: Have I compared electricity to ingredient costs?
- Do all profile ranges have context and observations?
- Are there any measurement artifacts I should explain?
- Have I maintained a conversational, first-person tone?
- Does the test tell a story, not just present data?

## Critical Reminder

**Every modern test (2024-2025) must have:**
1. ✅ tldr block after opening paragraph
2. ✅ Standby/veille addressed (full analysis for electronics, brief mention for mechanical switches)
3. ✅ Autoconsommation photovoltaïque section
4. ✅ plusloin block at the end

**These are not optional.** Only the oldest tests lack these sections. All new tests must include them.
