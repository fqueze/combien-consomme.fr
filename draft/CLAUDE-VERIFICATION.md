# Test Verification Checklist

This file is for the verification agent only. When verifying a test, check every item systematically.

## How to Use This Checklist

1. Read the test file completely
2. Check each item below sequentially
3. **Each item in this checklist is MANDATORY** - if violated, it must be reported
4. Return violations in this format: `Line X: [exact quote] → [specific fix]`
5. If no violations found: return "No violations found"
6. **Do not second-guess yourself** - if a checklist item is violated, report it

---

## CRITICAL VIOLATIONS (Auto-fail)

### Liquid Filters

- [ ] **No `times: 365`** - Must use `PerYear` filter instead
  - ❌ `{{ 110 | times: 365 | Wh€ }}`
  - ✅ `{{ 110 | Wh€PerYear }}` (for daily consumption)
  - ✅ `{{ 110 | times: 52 | Wh€ }}` (for weekly consumption, 52 weeks)

- [ ] **Formatting filters must be LAST** - No math operations after Wh€, percent, countPer€, etc.
  - ❌ `{{ 100 | Wh€ | times: 2 }}`
  - ❌ `{{ 100 | percent: 1000 | times: 2 }}`
  - ❌ `{{ 100 | countPer€: 1 | divided_by: 4 }}`
  - ✅ `{{ 100 | times: 2 | Wh€ }}`
  - ✅ `{{ 100 | times: 2 | percent: 2000 }}`
  - ✅ `{{ 100 | divided_by: 4 | countPer€: 1 }}`

- [ ] **No scientific notation**
  - ❌ `{{ 2.06e+3 | W }}`
  - ✅ `{{ 2060 | W }}`

- [ ] **Wh€PerYear expects DAILY consumption** - It multiplies by 365 internally
  - ❌ `{{ 1040 | Wh€PerYear }}` when 1040Wh is weekly (treats as daily)
  - ✅ `{{ 1040 | times: 2 | times: 52 | Wh€ }}` (2 uses/week × 52 weeks, then cost)

- [ ] **Profile range timestamps must be converted from milliseconds**
  - ❌ `{{ 9370138 | s }}` (treats milliseconds as seconds)
  - ✅ `{{ 9370138 | divided_by: 1000 | s }}` (converts ms → seconds → human format)

### TLDR Structure

- [ ] **IF article body mentions annual cost, THEN tldr must contain it**
  - Check for `Wh€PerYear` or annual extrapolations in article body
  - If found, verify it's in tldr

- [ ] **IF tldr contains annual cost, THEN it's the first line**
  - ❌ First line about per-use cost, second line about annual cost
  - ✅ First line about annual cost, subsequent lines about per-use

- [ ] **All tldr numbers must appear in article body first**
  - Never introduce calculations or numbers only in tldr
  - Every value must be explained/presented in main content

- [ ] **No invented or estimated numbers in tldr**
  - Only use measured values from profile statistics
  - Example of violation: "600 mL au lieu d'1 L pour 3 tasses" when only 1L was tested

### Intro Block Structure

- [ ] **NO `{% image %}` tags inside `{% intro %}...{% endintro %}`**
  - **VERIFICATION METHOD**:
    1. Find the line number with `{% intro %}`
    2. Find the line number with `{% endintro %}`
    3. Search for `{% image %}` on EVERY line between these two markers
    4. Report violation if ANY `{% image %}` tag found in this range
  - Images belong in body sections where they're relevant
  - Intro should only describe the device and measurement method
  - ❌ VIOLATION example:
    ```
    {% intro "image.jpg" "description" %}
    Some text describing the device...
    {% image "./images/photo.jpg" "..." "500w" 500 %}  ← INSIDE intro block = VIOLATION
    More text about the device...
    {% endintro %}
    ```
  - ✅ CORRECT: All `{% image %}` tags must appear AFTER `{% endintro %}`

- [ ] **NO test protocol description in intro**
  - ❌ "Pour ce test, nous avons laissé préchauffer puis préparé un café"
  - ✅ Save protocol description for the test section itself
  - Intro describes what the device IS, not what you DID

- [ ] **Intro contains only:**
  - Device description and context
  - Personal story or acquisition context (optional)
  - Acknowledgments if someone contributed (optional)
  - Measurement method subsection with link to measurement article

### Images

- [ ] **Every image must have text immediately before OR after mentioning what's in it**
  - ❌ Image tag with no surrounding text referencing it
  - ❌ Multiple images in a row without text between them
  - ✅ "Voici les indications techniques inscrites dessous :" [image] [continue text]
  - ✅ [description] [image] "À la fin, la carafe contient 1L :" [image]

- [ ] **No multiple `{% image %}` tags without text between them**
  - Search pattern: `{% image %}.*\n.*{% image %}` without substantial prose between

- [ ] **Images placed in body sections, not intro block**
  - Already covered above, but double-check

### Text Formatting

- [ ] **Direct citations in French guillemets « » must use italics**
  - ✅ `« *texte cité* »`
  - ❌ `« texte cité »` (without asterisks)
  - Note: Blockquotes using `>` syntax don't need italics (already formatted)

- [ ] **No redundant introductions in lists**
  - ❌ "Le manuel précise deux points : \n- Le manuel indique que..."
  - ✅ "Le manuel précise deux points : \n- « *citation* » \n- L'extinction automatique..."

- [ ] **French punctuation spacing**
  - Space before `:` `;` `!` `?`
  - Example: `La consommation est stable :`

### Structure

- [ ] **No lone H4 heading**
  - If there's only one `####` under a `###`, remove the `####` level
  - Example violation: "### Informations fournies\n#### Étiquette" with no other H4

- [ ] **Consumption values placed AFTER profiles, not before**
  - ❌ "Le test consomme 110 Wh :" [profile]
  - ✅ "Le test complet a duré un peu plus de 3 minutes :" [profile] "...consommé {{ 110 | Wh€ }}"

- [ ] **No duplicate values in same section**
  - Don't mention the same consumption value twice (before and after profile)

### Duration Descriptions

- [ ] **Use approximate language when profile has trailing 0W samples**
  - ✅ "un peu plus de 3 minutes" (when last samples are 0W)
  - ✅ "environ 40 secondes" (when profile includes 0W at edges)
  - ❌ "a duré 3min13s" (too precise when includes 0W samples)
  - Note: Use `{{ duration | divided_by: 1000 | s }}` only for meaningful durations

### Content Accuracy

- [ ] **Major observations (>50% difference, key findings) must be in tldr**
  - Example: If measured power is 61% less than label, this should be in tldr
  - Check for surprising results that aren't highlighted in tldr

- [ ] **Cross-references cite only verified facts from those tests**
  - ❌ Claiming test X shows something when it doesn't
  - Check that {% test slug description %} links are accurate

- [ ] **Tone appropriate for device context**
  - Obsolete/kitsch items: humor is appropriate
  - Professional/modern equipment: serious technical tone
  - Check if tone matches device type

### Profile and Image Introductions

- [ ] **Each profile/image has substantive introductory sentence**
  - ❌ "Voici le profil de consommation :"
  - ❌ "Voici la phase de lavage :"
  - ✅ "La phase de lavage dure {{ 6128 | s }} et consomme {{ 916 | Wh€ }} :"
  - ✅ "Pendant les 2 heures d'attente, la consommation est stable autour de {{ 3.7 | W }} :"

- [ ] **Don't mention specific values BEFORE showing the profile that contains them**
  - ❌ Overview section says "autour de 915W" when that value only appears in a later zoom profile
  - ✅ Show the profile first, THEN discuss the specific values you see in it

### Numbers and Calculations

- [ ] **All numbers in prose must come from either:**
  - Profile statistics (energy, power, duration from .md files)
  - Liquid filter calculations explicitly shown (e.g., "{{ 110 | times: 2 | Wh€PerYear }}")
  - Never invented, estimated, or appearing without source

- [ ] **Raw numbers (without Liquid filters) must be explained**
  - ❌ "La consommation sera de 80 kWh par an" (where does 80 come from?)
  - ✅ "La consommation sera de {{ 110 | times: 2 | Wh€PerYear }}" (calculation explicit)
  - Exception: Quoting manufacturer labels or manuals verbatim

### Publishing Checklist Comment

- [ ] **Device brand and model filled in**
  - Check the comment at top of file: `**Device:** TODO: Brand and model`
  - Must be replaced with actual device info

- [ ] **Key findings are accurate and from the test**
  - Check 3-5 bullet points in publishing checklist
  - Verify each finding matches what's in the test
  - Verify numbers are correct (not invented or miscalculated)
  - Common error: stating wrong percentages, durations, or costs

---

## Return Format

Report violations using this exact format:

```
Line X: [exact quote from file] → [specific fix needed]
```

Examples:
```
Line 35: {{ 110 | times: 365 | Wh€ }} → Use {{ 110 | Wh€PerYear }} instead
Line 47: {% image "./images/foo.jpg" %} inside {% intro %} block → Move image to body section
Line 89: « Temps de marche 2 mn. » → Add italics: « *Temps de marche 2 mn.* »
```

If no violations found, return only:
```
No violations found.
```
