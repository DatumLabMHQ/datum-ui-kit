# Using shadcn at Datum

shadcn is not a dependency, it is a folder of components in your repository. You own them, you can read
them, and you can change them. That freedom is why we use it, and why it needs rules: a component that
drifts in one project makes every other project a little less familiar.

## The configuration

`components.json` is what makes a new component land already Datum. Do not change it in a project.

```json
{
  "style": "base-nova",        // Base UI under the hood, not Radix
  "tailwind": { "css": "app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "phosphor",   // so the CLI writes Phosphor imports
  "rsc": true, "tsx": true
}
```

Because `cssVariables` is on and `globals.css` maps every shadcn variable onto a Datum token, a
component added tomorrow wears the brand without being touched.

## Adding a component

```bash
npx shadcn@latest add popover
```

It lands in `components/ui/`, imports Phosphor icons, and reads the tokens. Then:

- **Do not edit it to restyle it.** If it looks wrong, the token is wrong. Fix `globals.css`.
- **Do edit it to fix a real defect**, and leave a comment saying why, then `bin/datum-ui sync` it into
  the kit so every project gets the fix.
- **Wrap rather than fork.** `CardRow`, `DetailLayout`, `PageHeader` and `DataTable` are all thin
  wrappers that encode a rule. That is the pattern to follow when a component needs house behaviour.

Never add a second component library, a second icon set, or a CSS framework beside Tailwind.

## Base UI is not Radix

`base-nova` sits on Base UI, so recipes copied from the wider shadcn ecosystem often need a small
translation.

- Composition uses `render` rather than `asChild`:
  `<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>`.
- Open state lives on data attributes: the Collapsible root gets `data-open`, its trigger gets
  `data-panel-open`. Tailwind selectors read `group-data-[open]/collapsible:rotate-90`.
- Some props do not exist. Base UI's Dialog has no `dismissible`; to make one mandatory, control `open`
  and ignore the close request in `onOpenChange`.
- Several components keep React context, so a server page cannot render them directly. The kit wraps
  the two that bite most often: `PageBreadcrumb` for Breadcrumb, and any `Item` list inside a client
  component. The symptom is a build error about `createContext` in a server component.
- `Progress` is composed: `<Progress value={62}><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>`.
- Form layout is `Field`, not the react-hook-form `Form` wrapper: `Field`, `FieldLabel`,
  `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`.

## The mistakes that cost us a day each

**Server and client icons.** `@phosphor-icons/react` in a client file, `@phosphor-icons/react/ssr` in a
server file. The wrong one fails at build time with a message about the module having no valid export.

**A function cannot cross the server boundary.** Passing `format={usd}` from a server page to a client
chart or table throws at render. Pass a unit name the client resolves, which is why `DataTable` takes
`numeric` and `labels` rather than formatters.

**`satisfies` narrows a config literal.** `nav: [...] satisfies NavEntry[]` compiles in the kit, where
one entry has children, and fails in a project where none does. Declare the array with its type:
`const NAV: NavEntry[] = [...]`.

**Wrapping `{children}` eats the layout gap.** The frame gives the page column its `gap`. Anything that
wraps the page (a gate, a provider with a `div`) has to carry the same column classes or every section
on every page closes up. The smoke test now measures this.

**The aside's last child must be a card.** The detail layout grows the aside's last child to the
column's height. A button below the facts card means the button grows and the columns end ragged.

**Spreading a DOM collection fails a strict typecheck.** In tests and in the browser use
`Array.from(el.querySelectorAll(...))`, not the spread, or the project's TypeScript target rejects it.

**TanStack Table v9 needs its features declared.** The kit's `DataTable` lists them once; text search
happens on the rows before the table sees them, which keeps the table generic. A `filterFn` that is not
registered silently does nothing.

**`next build` while `next dev` is running clobbers `.next`.** Stop the dev server before building, or
build in a copy.

**`npx shadcn add` skips files that exist.** Pass `--overwrite` when you mean to replace one, and read
the diff afterwards: it may have been a file you had changed on purpose.

**ESLint plugins register once.** `next/typescript` already brings in jsx-a11y. Registering it again in
the flat config throws at lint time; set rules only.

## Where things live

| Want to | Go to |
|---|---|
| Pick a component | the gallery, `/components`, or `templates/app/components/ui` |
| Pick a page shape | the gallery, `/patterns` |
| Change a colour or a face | `app/globals.css` only |
| Change the nav or the name | `site.config.ts` only |
| Add a rule everyone must follow | `docs/UI.md`, and a line in `tests/smoke.spec.ts` |
