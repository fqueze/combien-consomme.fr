---
name: write-test
description: Generate a new consumption test for combien-consomme.fr from a draft's generated template and profile data. Use when asked to generate or write a test for a draft (e.g. "Generate a test for draft/{slug}"), where a template at draft/{slug}/preview/tests/{slug}.md and profile data in draft/{slug}/preview/profile-data/ already exist. Orchestrates the whole process: analyse the data, plan, write the body, fill the standalone sections, verify, and build the preview.
---

# Writing a test

This is the orchestrator for turning a draft's measured data into a finished test. It runs in the main conversation and delegates self-contained sections to sub-agents. The detailed knowledge lives in the skills referenced below.

When a step says "Use the `X` skill", invoke the Skill tool and read it in full before doing that step — the rules that govern the step live there, not in this orchestrator. This applies even to the steps you run inline (analyse, plan, write the body), not just the delegated ones.

The template at `draft/{slug}/preview/tests/{slug}.md` already contains every profile range with its shortcode inserted. Your job is to organise, describe, analyse, and add the standard sections.

## Process

Track these steps (e.g. with TodoWrite): analyse data → plan → write body → fill sections → prepare for publishing → verify → build.

### 1. Analyse the data
Use the **`analyze-data`** skill: read the template, read each profile's stats file, view each screenshot *and* each device/label/manual photo via sub-agents, and produce the SEE/INFER notes per profile and per image. Remember a profile range is `start m duration` in **milliseconds**.

### 2. Plan and get approval
**This step is required — never plan from memory or skip straight to writing.** Read the **`plan-test-structure`** skill in full and follow it: it carries the structural rules the body must obey (the section arc, where each profile and image goes, and constraints like the intro block never containing an image). Decide the narrative, section order, and placement, then present the plan and **wait for the user's approval** before writing.

### 3. Write the body
Write everything **except** the four standalone sections (tldr, cost-of-use, autoconsommation, plusloin). That means: front matter, opening + `<!-- excerpt -->` + an empty tldr placeholder, Le matériel (intro + Méthode de mesure), and the Consommation body — manufacturer info, the profile overview, the per-profile **zoom/“En détail” descriptions**, and the standby/veille analysis. Leave clearly-marked empty placeholders for the four sections to be filled next.

The **`writing-style`**, **`liquid-filters`**, and **`find-related-tests`** skills apply throughout. Preserve any `draft:` description from the template as a `{% raw %}{% comment %}{% endraw %}` right after each profile/image tag.

Write all the text around the profiles — both the introductory sentence and the analysis after each profile — **inline, here in the main conversation**, drawing on the SEE/INFER notes the analyse-data sub-agents already produced. This text is tightly coupled to the body's narrative, so unlike the four standalone sections it is not handed off to a section sub-agent.

### 4. Fill the standalone sections (delegated, with ordering)
Save the file, then delegate each section to a **sub-agent given only the file path** — each reads the draft, fills its empty section in place, and reports back. The matching skills (`cost-of-use-section`, `autoconsommation-section`, `plusloin-section`, `write-tldr`) carry the rules; the sub-agents discover them.

**Order matters — there is a dependency chain:**
1. In parallel: **cost-of-use** and **plusloin** (independent of each other).
2. Then **autoconsommation** — it reuses the per-use cost figure the cost section established, so it must run after cost-of-use.
3. Then **tldr**, last of all — it summarises the finished body including the cost and autoconso sections.

If a section sub-agent reports missing data (e.g. no purchase price) or that it omitted the section (cost-of-use may be omitted if all cost was covered inline; autoconso may be omitted if irrelevant to the device), handle it: supply the value, or accept the omission. plusloin and tldr are always present.

### 5. Prepare for publishing
Fill the publishing-checklist comment at the top of the file: the device brand/model and 3–5 key findings (used for the `existing-tests.md` entry at publish time). Do this **before verifying**, because the verifier checks these fields. Don't change the front matter for production yourself — the publish step handles moving the file.

### 6. Verify
Use the **`verify-test`** skill as a sub-agent on the finished file. Fix every violation it reports, then re-run if needed.

### 7. Build the preview
Build only the preview page (fast) to confirm there are no errors:
```
ELEVENTY_PREVIEW_ONLY=draft/{slug}/preview npx @11ty/eleventy
```
Fix any Liquid/build errors, then present the finished test to the user.
