# The Datum interface standard

One standard for every internal and client-facing interface that is not a data dashboard. It is
shadcn/ui on Base UI, Tailwind v4, Next.js App Router, and the Datum design tokens. The template in
`templates/app` is the reference: run it and the standard is on screen, live, with the rules beside
each component.

The rule that produced it: build from shadcn, never beside it. The shell is shadcn's sidebar block,
the pages are its recipes, and everything Datum-specific is either a token in `globals.css` or a small
component that wraps a shadcn one. There is no custom CSS class system and there must not be one.

## 1. The look

The same faces and palette as datumlab.xyz, so an internal tool and the website are one brand. Geist
for text and numbers, with tabular figures and medium weight for anything large, never bold. Source
Serif 4 for the one display line on a page, and for section headings. Geist Mono for identifiers,
hashes and code. Sentence case everywhere. Colour is reserved for meaning rather than decoration.
Rounded white cards on the Platinum ground (`#F5F7FA`, a cool blue-tinted grey, never a warm neutral);
dark mode is the brand navy, not a grey. This is the only aesthetic.

Icons are Phosphor only, at the regular weight. `components.json` sets `iconLibrary: phosphor`, so
`npx shadcn add` writes Phosphor imports into every component it adds. Client components import from
`@phosphor-icons/react`; server components import the same names from `@phosphor-icons/react/ssr`.
Never add a second icon set.

## 2. Tokens (`app/globals.css`)

The stylesheet is tokens only. First the Datum names, then every shadcn variable mapped onto them, so
the components wear the Datum look with no per-component styling.

| Group | Tokens |
|---|---|
| Surfaces and text | `--bg`, `--bg-2`, `--surface`, `--surface-2`, `--fg`, `--fg-muted`, `--fg-dim`, `--line`, `--line-strong`, `--hover` |
| Brand ramps, the same in both themes | `--sapphire-50` to `--sapphire-900` (500 is the brandmark blue), `--navy-500/700/900`, `--neutral-0` to `--neutral-950` |
| Brand mark | `--brand-blue`: the primary, the active nav item, the focus ring and the wordmark accent |
| State, each with a `-soft` background | `--green` good, `--yellow` watch, `--red` bad |
| Series | `--chart-1` to `--chart-8`, taken in order so a category keeps its colour across a project |
| Shape and depth | `--radius` (12px), `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Fonts | `--font-sans` (Geist), `--font-serif` (Source Serif 4), `--font-mono` (Geist Mono), loaded with `next/font` |

In markup use the Tailwind names: `bg-card`, `text-muted-foreground`, `border-border`. A Datum token
with no shadcn name is reached as `text-(--brand-blue)` or `bg-(--green)/10`.

**A sub-brand overrides tokens, never components.** Setnel is the precedent: a different action colour
and a denser scale, but the same components underneath. Fork `globals.css`, keep everything else.

## 3. Page anatomy

Every app page renders into `app/(app)/layout.tsx`, which is the sidebar frame. A page is a column of
sections; the layout owns the gap between them, so a page never wraps its children in a bare `div`.

1. `PageHeader`: an eyebrow, the question the page answers as an `h1` in the serif face, and one line
   that answers it. The question comes first because a reader who stops there has still learnt
   something.
2. The content: cards, a table, a form. Cards that share a row go in a `CardRow`.
3. A detail page uses `DetailLayout`: the content on the left, the facts on the right, a draggable
   divider between them on wide screens and stacked on phones.

The second shell, `app/(site)/layout.tsx`, is for anything a reader sees before they sign in: a top
bar, a wide column, generous sections, no sidebar. Same tokens, same components.

## 4. The layout contract

Three rules, all measured by the smoke test, all learnt the hard way:

- **Sections keep the rhythm.** 16px apart at the tightest, 24px from medium up. Anything that wraps
  `{children}` in the frame must carry the page column, or every section on every page closes up.
- **Detail columns end on the same line.** The aside takes the main column's height and its last child
  grows and scrolls inside, so the two columns finish level whatever the facts list holds. The aside's
  last child must be a card: a button below the facts breaks it.
- **Cards that share a row end together.** `CardRow` gives the row the first card's height and lets
  the others scroll inside. A bare grid stretches the short card to the tall one instead.

## 5. Copy

The words are part of the interface.

- Sentence case for every heading, label and button. No em dashes anywhere.
- A card without a description makes the reader guess what they are looking at. Every card that holds
  a table or a chart carries one line saying what it shows and what to notice.
- Buttons say the verb: "Save job", not "Submit". Destructive dialogs say the consequence.
- Numbers go through a formatter in `lib/format.ts` and are always tabular. A missing value reads
  `n/a`, never a blank cell or a zero.
- Empty and error states say what happened and what the reader can do next. "No data" says neither.

## 6. States

Every screen has four, and three of them are files Next.js already looks for: `loading.tsx` beside the
page (skeletons in the shape of the page, not a spinner), `error.tsx` (plain words, a reference, a
retry, never a stack trace) and `not-found.tsx`. The fourth, the empty state, is the `Empty` block
inside the card where the rows would have been. The patterns page shows all four of one card.

## 7. Accessibility

The components carry most of it; these are the parts a page can still get wrong.

- Every input has a real `<label>` through `Field`, not a placeholder standing in for one.
- An icon-only control has a tooltip and an `aria-label`. A tooltip alone is invisible on a phone.
- A row that is clickable has a real link in its first cell, so a keyboard and a middle click work.
- Colour never carries the whole meaning: a status is a colour and a word.
- The lint config turns the jsx-a11y rules on. Do not silence them in a page; fix the markup.

## 8. Kit files versus project files

Kit files, changed here and copied forward, never forked inside a project: the shells, the shell
components, `components/ui/*`, `lib/format.ts`, `lib/nav.ts`, `lib/utils.ts`, the tests, the configs.
The full list is `KIT_FILES` in `bin/datum-ui`. Project files: `site.config.ts`, everything under
`app/` that is a page of yours, and any component you write for your own data.

`bin/datum-ui sync <project>` copies the kit files forward and lists what changed. It never puts back
a shell a project deleted on purpose.

## 9. Continuous checks

`npm run check` runs typecheck, lint and build. `npm run test:smoke` runs the layout smoke test
against a dev server, and CI runs both on every push. The smoke test reads the sidebar rather than a
list of routes, so a project that adds a page gets it covered for free. What it asserts: every page
returns 200 with an `h1` and no console errors, no number leaks a `NaN` or an `undefined`, the three
layout rules above, a caption on every table card, the form shows errors only after a submit, dark
mode is the navy ground, and nothing scrolls sideways on a phone.

When someone spots a layout fault by eye, the fix goes into the kit and a line goes into this test, so
the next project cannot repeat it.

## 10. Checklist before a screen is shared

- The heading is a question, and the line under it answers it.
- Every card has a description; every number goes through a formatter.
- All four states exist and the shape of the page does not move between them.
- The keyboard reaches everything; the icon-only controls have labels.
- `npm run check` and the smoke test pass.
- It reads at 375px wide, in dark mode, with no sideways scroll.
