// Start here: what this app is, the rules that hold across every Datum interface, and where to go next.
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, XIcon } from '@phosphor-icons/react/ssr';
import { site } from '@/site.config';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';

export const metadata = { title: 'Start here' };

const RULES: { title: string; body: string }[] = [
  { title: 'Build from shadcn, never beside it', body: 'Every surface is a shadcn component or a small wrapper around one. If something looks impossible with the components we have, add the shadcn component for it rather than writing a bespoke one.' },
  { title: 'Tokens only, never a hardcoded value', body: 'Colour, type, radius and spacing come from app/globals.css. A pull request with a hex code or a magic pixel value in a component is a pull request to change the tokens instead.' },
  { title: 'Phosphor icons only', body: 'components.json sets the icon library, so the shadcn CLI writes Phosphor imports for you. Client files import from @phosphor-icons/react, server files from @phosphor-icons/react/ssr. Never add a second icon set.' },
  { title: 'Every screen has four states', body: 'Loading, empty, error and full. Build all four or the first real user finds the ones you skipped. The kit ships a skeleton, an Empty block and an error boundary so there is no excuse.' },
  { title: 'Alignment is a rule, not a preference', body: 'Sections keep the layout rhythm, columns end on the same line, and cards that share a row end together. The smoke test measures all three, so a layout that drifts fails the build.' },
];

export default function StartHere() {
  return (
    <>
      <PageHeader eyebrow="Datum UI kit" question="How do we build an interface at Datum Labs?"
        answer={<>{site.description} Everything here is shadcn/ui on the Datum tokens: the same components, the same rules and the same checks on every internal project, so any of us can open any of them and know where things are.</>} />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Start a project</CardTitle><CardDescription>One command from the kit repository, then edit one file.</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-3 font-mono text-xs leading-relaxed"><code>bin/datum-ui new client-portal{'\n'}cd ~/client-portal && npm install{'\n'}npm run dev</code></pre>
            <p className="text-sm text-muted-foreground">Then edit <span className="font-mono text-xs">site.config.ts</span>: the name, the navigation, the links. Add pages under <span className="font-mono text-xs">app/(app)/</span>.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>What is in the box</CardTitle><CardDescription>Everything a Datum interface needs before it has a single feature.</CardDescription></CardHeader>
          <CardContent className="px-2">
            <ItemGroup>
              {[
                ['The shell', 'Inset sidebar with collapsible sections, a slim header, cmd+k search, light and dark.'],
                ['Thirty-eight components', 'The shadcn set on Base UI, already wearing the Datum tokens.'],
                ['Four page patterns', 'List, detail, form and the four states, each a working page to copy.'],
                ['The checks', 'Typecheck, lint, build and a smoke test that measures layout, in CI on every push.'],
              ].map(([t, d], i) => (
                <div key={t}>
                  {i > 0 ? <ItemSeparator /> : null}
                  <Item size="sm"><ItemMedia variant="icon"><CheckIcon /></ItemMedia><ItemContent><ItemTitle>{t}</ItemTitle><ItemDescription>{d}</ItemDescription></ItemContent></Item>
                </div>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>What this is not for</CardTitle><CardDescription>One boundary, so two kits never drift into one another.</CardDescription></CardHeader>
          <CardContent className="px-2">
            <ItemGroup>
              <Item size="sm"><ItemMedia variant="icon"><XIcon /></ItemMedia><ItemContent><ItemTitle>Data dashboards</ItemTitle><ItemDescription>A page whose job is to answer a question with numbers from the platform belongs in datum-databuild-kit, which adds charts, tables of markets, the methodology page and the platform client on top of these same tokens.</ItemDescription></ItemContent></Item>
              <ItemSeparator />
              <Item size="sm"><ItemMedia variant="icon"><XIcon /></ItemMedia><ItemContent><ItemTitle>A second component library</ItemTitle><ItemDescription>No Material, no Chakra, no hand-rolled design system, and no second icon set. If you need something we do not have, add it from shadcn.</ItemDescription></ItemContent></Item>
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader><CardTitle>The five rules</CardTitle><CardDescription>They are short because they are absolute. Everything else in this app is an illustration of one of them.</CardDescription></CardHeader>
          <CardContent className="grid grid-cols-1 gap-x-8 gap-y-5 @2xl/card:grid-cols-2 @5xl/card:grid-cols-3">
            {RULES.map((r, i) => (
              <div key={r.title} className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2"><span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span><h3 className="font-medium">{r.title}</h3></div>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap gap-2 px-4 lg:px-6">
        <Button nativeButton={false} render={<Link href="/foundations" />}>Foundations<ArrowRightIcon /></Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/components" />}>Components</Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/patterns" />}>Patterns</Button>
      </div>
    </>
  );
}
