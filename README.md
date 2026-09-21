# datum-ui-kit

How we build interfaces at Datum Labs: shadcn/ui components on the Datum tokens, one shell, one set of
rules, and the checks that keep them true. One command starts a project.

```bash
bin/datum-ui new client-portal            # the app shell: sidebar, header, cmd+k search
bin/datum-ui new ytc-2027 --kind site     # the wide shell: top bar, no sidebar
bin/datum-ui sync client-portal           # copy the kit's files forward into a project
```

The template in `templates/app` is the live gallery. Run it and you get the standard on screen: the
foundations, every component with the rule for when to use it, and five page patterns you can copy.

```bash
cd templates/app && npm install && npm run dev
```

## What this is for, and what it is not

Use it for anything internal or client-facing that is not a data dashboard: consoles, admin tools,
forms, directories, microsites, event pages, client portals.

A page whose job is to answer a question with numbers from the Datum data platform belongs in
[`datum-databuild-kit`](https://github.com/DatumLabMHQ/datum-databuild-kit) instead. That kit is this
one plus charts, the platform client, the methodology page and the reconciliation rules. The two share
the same tokens, the same fonts and the same layout contract, so they look like one product.

## The five rules

1. **Build from shadcn, never beside it.** Every surface is a shadcn component or a thin wrapper. If
   something seems impossible, add the shadcn component for it rather than writing a bespoke one.
2. **Tokens only.** Colour, type, radius and spacing come from `app/globals.css`. A hex code in a
   component is a request to change the tokens instead.
3. **Phosphor icons only.** `components.json` sets the library, so the CLI writes the right imports.
   Client files import from `@phosphor-icons/react`, server files from `@phosphor-icons/react/ssr`.
4. **Four states or it is not done.** Loading, empty, error and full. Three of the four are files the
   framework already looks for.
5. **Alignment is a rule.** Sections keep the page rhythm, detail columns end on the same line, and
   cards that share a row end together. The smoke test measures all three.

## What is in the box

| | |
|---|---|
| The shell | Inset sidebar with collapsible sections, slim header, cmd+k palette, light and dark, and a second wide shell for pages people see before they sign in |
| Components | The shadcn set on Base UI (38 of them), already wearing the Datum tokens, plus a generic `DataTable`, a `CardRow` and a two-column `DetailLayout` |
| Patterns | List, detail, form, the four states, and a landing page, each a working page in the gallery |
| Checks | `npm run check` (typecheck, lint, build) and a smoke test that measures layout, both in CI on every push |

## The documents

- [`docs/UI.md`](docs/UI.md) is the standard: the look, the tokens, the layout contract, the copy
  rules, accessibility and the checks. Read it before the first page.
- [`docs/SHADCN.md`](docs/SHADCN.md) is how we use shadcn in practice: the configuration, adding a
  component, the Base UI differences, and the mistakes that have cost us a day each.

## Keeping projects in step

Files the kit owns (the shell, the components, the tokens, the tests, the configs) are listed as
`KIT_FILES` in `bin/datum-ui`. Change one here and run `bin/datum-ui sync <project>` to copy it
forward; it never touches a project's own pages or its `site.config.ts`. Everything else in a project
belongs to that project.
