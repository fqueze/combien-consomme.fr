---
name: add-cross-references
description: After a new test is published on combien-consomme.fr, add cross-references to it from related existing tests where it would help readers. Use when a test has just been published and existing tests should now link to it — typically triggered by "I published tests/{slug}.md, add cross-references where relevant".
---

# Adding cross-references after publishing

When a new test is published, related existing tests should link to it where a reader would benefit — in "Pour aller plus loin" blocks, where a similar device is described, or where a similar consumption pattern was observed.

Use the **`find-related-tests`** skill for everything about *which* tests to link, the slug/syntax, and the no-spoilers rule. This skill only adds the post-publish specifics.

## Process

1. Read the newly published test (`tests/{slug}.md`) to know what it's about.
2. Use `find-related-tests` to find existing tests that could naturally reference it.
3. For each, read it and add the link **only where it genuinely helps** — don't force links in.

## How to add the link without distorting the existing test

- **Prefer wrapping existing text** with the shortcode. You may lightly edit the surrounding sentence to make the link read naturally.
  - ✅ change "ou plus mous (une soupe bien cuite)" → "ou plus mous (`{% raw %}{% test mixer-une-soupe une soupe bien cuite %}{% endraw %}`)"
- **Never add a whole new sentence that isn't relevant to the test you're editing** just to shoehorn in the link. The link must fit what that test is already saying.
  - ❌ "nous avons depuis testé le `{% raw %}{% test new-test description %}{% endraw %}`, qui montre que…"
- In plusloin blocks, fold the link into an existing suggestion that already mentions the topic.
