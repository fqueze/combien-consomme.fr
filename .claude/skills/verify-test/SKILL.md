---
name: verify-test
description: Review a finished or edited combien-consomme.fr test against the mandatory quality checklist and report violations. Use as the final review step after writing a test, or after editing an existing test. Best run as a sub-agent given only the path to the test file; it reports violations for the writer to fix, it does not rewrite the test.
---

# Verifying a test

You are a reviewer. Read the test file completely, check every item below, and report each violation in the exact format:

```
Line X: [exact quote from file] → [specific fix]
```

If there are none, return exactly: `No violations found.`

Each item is mandatory — if violated, report it. Don't second-guess yourself; if a check fails, report it. Don't rewrite the test — the writer fixes the violations you report.

## Liquid filters

(The `liquid-filters` skill has the full rules; these are the auto-fail checks.)
- **No `times: 365`** — must be a `PerYear` filter (or explicit `times: N | times: 52` for weekly).
- **Formatting filter must be last** — no math after `W`/`Wh`/`Wh€`/`€`/`percent*`/`countPer€`/`*PerYear`/`*PerMonth`.
- **No scientific notation** (`2060 | W`, not `2.06e+3 | W`).
- **`Wh€PerYear`/`Wh€PerMonth` expect a DAILY figure** — flag a weekly/total value fed straight to them.
- **Profile range duration converted from ms** — `… | divided_by: 1000 | s`, never raw ms into `s`.

## tldr
- If the body has an annual cost, the tldr must contain it; if the tldr has an annual cost, it's the first line.
- Every tldr number appears in the body first; no invented/estimated numbers.
- Major findings (>50 % differences, surprising results) are in the tldr.

## Intro block
- **No `{% raw %}{% image %}{% endraw %}` between `{% raw %}{% intro %}{% endraw %}` and `{% raw %}{% endintro %}{% endraw %}`** — check every line in that range; images belong in body sections (in the Le matériel section outside the intro block, or in Consommation).
- No test-protocol description in the intro ("Pour ce test, nous avons…" belongs in the test section).
- The intro block itself contains only: device description/context, optional story, optional acknowledgement. The **Méthode de mesure** subsection (with the measurement-article link) may live in the intro when it's short, or have been moved into the Consommation section — either is fine; just check it exists exactly once and links the measurement article.

## Images
- Every image has text immediately before or after referencing what's in it.
- No two `{% raw %}{% image %}{% endraw %}` tags in a row without substantive prose between them.

## Text formatting
- Direct citations in « » use italics: `« *…* »` (blockquotes with `>` exempt).
- No redundant per-item re-introductions in a list already introduced.
- Space before `:` `;` `!` `?`.

## Structure
- No lone H4 (a single `####` under a `###` should be promoted/removed).
- Each profile/image has a substantive introductory sentence carrying a real fact (not "Voici le profil :"). It's fine for that intro to state a value the profile itself shows.
- A value isn't quoted in an earlier profile (e.g. an overview) when it only appears in a later, more detailed profile (a zoom); show that profile first, then discuss the value.
- No value duplicated needlessly both before and after the same profile.

## Durations
- Approximate language when a profile has trailing/leading 0 W samples ("un peu plus de 3 minutes"), not false precision ("3min13s").

## Numbers
- Every number in prose comes from profile statistics or an explicit Liquid calculation — never invented or unexplained (except verbatim manufacturer label/manual quotes).

## Content
- **The test answers the question the opening paragraph asked.** If the intro poses a consumption question, the body and tldr must actually answer it; flag it if they don't.
- **The measured power is compared to the label's nominal power.** If the device has a nominal power on its label, the test should compare it to what we measured (at the moment the two are closest — see `writing-style`). Flag a missing comparison.
- Cross-references cite only verified facts of the linked test, and reveal no results (no spoilers).
- Tone matches the device (humour for kitsch/obsolete; serious for modern/professional).
- Publishing-checklist comment: device brand/model filled in; the 3–5 key findings accurate and matching the test.
