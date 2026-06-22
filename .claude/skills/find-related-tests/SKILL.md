---
name: find-related-tests
description: Find the right slug to cross-reference another article on combien-consomme.fr, and link to it correctly. Use whenever a test needs a {% test %} or {% post %} link to a related test or guide — while writing a new test, adding cross-references after publishing, or editing an existing one.
---

# Finding related tests and posts to link

To link to another article, **consult the two index files — don't grep, ls, or script your way through the `tests/` directory.** They exist precisely so you can find a slug and judge relevance from one read.

- **`draft/existing-tests.md`** — every published *test* (device measurements). Linked with `{% raw %}{% test slug description %}{% endraw %}`.
- **`draft/existing-posts.md`** — every published *post / guide* (e.g. the measurement-method articles). Linked with `{% raw %}{% post slug description %}{% endraw %}`.

## How the index files are structured

Each entry is an `### slug` heading followed by **Title**, the device/subject, and 3–5 **key findings**:

```
### machine-a-laver-miele
**Title:** Une machine à laver Miele
**Device:** Lave-linge Miele …
**Key findings:**
- …
```

To find candidates: read the file, scan the slugs and titles for the same device family or a related consumption pattern, then read the key findings to confirm the link is actually relevant.

## Picking a slug

- **The slug is the `###` heading, used verbatim** — never invent or guess one. If a device you'd like to link to isn't in the index, it hasn't been published; don't link it.
- The measurement-method link in every test's *Méthode de mesure* comes from `existing-posts.md`: `{% raw %}{% post mesurer-la-consommation-avec-shelly-plus-plug-s … %}{% endraw %}` for standard devices, or the Shelly EM post for high-current ones.

## Syntax

{% raw %}
```markdown
{% test slug description libre %}
{% post slug description libre %}
```
{% endraw %}
The description is free text shown to the reader; the slug must match the index exactly.

## No spoilers in cross-references

A cross-reference is a link, not a result. **Never reveal the linked article's findings** in the linking text — let the reader discover them by following the link.
- ❌ "`{% raw %}{% test new-test description %}{% endraw %}`, qui consomme 54 % de moins"
- ✅ "`{% raw %}{% test new-test description %}{% endraw %}`"

(The one exception is a deliberate quantified comparison in a replacement-economics or autoconso section, where a single compared figure is the point — see those skills.)
