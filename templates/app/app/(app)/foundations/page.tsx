// Foundations: the tokens every component reads. Change these and the whole app changes; change a
// component's colour and you have started a second design system.
import { PageHeader } from '@/components/page-header';
import { Rule, Section, Swatch } from '@/components/rule';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = { title: 'Foundations' };

const SURFACES = [['--bg', 'Page ground'], ['--bg-2', 'Sunken and hover'], ['--surface', 'Card'], ['--surface-2', 'Raised'], ['--line', 'Hairline'], ['--fg', 'Text'], ['--fg-muted', 'Secondary text'], ['--fg-dim', 'Disabled']];
const BRAND = [['--sapphire-500', 'The brandmark blue', 'primary, active nav, focus ring'], ['--sapphire-50', 'Brand tint', 'accent backgrounds'], ['--navy-700', 'Navy', 'dark-mode ground'], ['--neutral-900', 'Ink', 'text in light mode']];
const STATES = [['--green', 'Good'], ['--yellow', 'Watch'], ['--red', 'Bad'], ['--brand-blue', 'Informational']];
const SERIES = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5', '--chart-6', '--chart-7', '--chart-8'];

export default function Foundations() {
  return (
    <>
      <PageHeader eyebrow="Foundations" question="What do the tokens mean, and when do I reach for each one?"
        answer={<>Every colour, face and radius in this app is a variable in <span className="font-mono text-xs">app/globals.css</span>, and the shadcn variables are mapped onto them. Use the Tailwind names in markup (<span className="font-mono text-xs">bg-card</span>, <span className="font-mono text-xs">text-muted-foreground</span>); reach for a raw token only when there is no shadcn name for it.</>} />

      <Section id="colour" title="Colour" lead="Surfaces and text carry the page; the brand blue marks what is active; the three state colours are for meaning, never decoration." />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
        <Rule title="Surfaces and text" use="the page ground, cards, hairlines and the three levels of text." not="conveying meaning: a grey card says nothing about whether the thing inside it is healthy.">
          <div className="grid grid-cols-2 gap-3">{SURFACES.map(([t, n]) => <Swatch key={t} token={t} name={n} />)}</div>
        </Rule>
        <Rule title="Brand" use="the primary action, the active nav item, the focus ring and the wordmark." not="ordinary text or borders. If everything is brand blue, nothing is.">
          <div className="grid grid-cols-2 gap-3">{BRAND.map(([t, n, note]) => <Swatch key={t} token={t} name={n} note={note} />)}</div>
        </Rule>
        <Rule title="State" use="a status that a reader must act on: a failed run, a value above a threshold, a warning that something is stale." not="categories. A chart of five products does not need red for one of them.">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">{STATES.map(([t, n]) => <Swatch key={t} token={t} name={n} />)}</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-(--green)"><span className="size-1.5 rounded-full bg-current" />Succeeded</Badge>
              <Badge variant="outline" className="text-(--yellow)"><span className="size-1.5 rounded-full bg-current" />Stale</Badge>
              <Badge variant="outline" className="text-(--red)"><span className="size-1.5 rounded-full bg-current" />Failed</Badge>
            </div>
          </div>
        </Rule>
        <Rule title="Series" use="one colour per category in a chart or a legend, taken in order so the same category keeps its colour across a project." not="anything that is not a series. These are the dashboard kit's chart colours and they follow the site's order.">
          <div className="flex flex-wrap gap-2">{SERIES.map((t, i) => (
            <div key={t} className="flex items-center gap-2 rounded-lg border px-2 py-1"><span className="size-3 rounded-sm" style={{ background: `var(${t})` }} /><span className="font-mono text-xs">{i + 1}</span></div>
          ))}</div>
        </Rule>
      </div>

      <Section id="type" title="Type" lead="Three faces, each with one job. A page has one display line; everything else is Geist." />
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader><CardTitle>The scale</CardTitle><CardDescription>Sizes are Tailwind&rsquo;s defaults. Weight carries hierarchy, not size alone: nothing on a Datum page is bold.</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div><div className="font-serif text-[1.75rem] font-medium leading-tight tracking-tight">The question this page answers</div><div className="mt-1 font-mono text-xs text-muted-foreground">font-serif text-[1.75rem] font-medium · Source Serif 4 · once per page, in PageHeader</div></div>
            <div><div className="font-serif text-xl font-medium tracking-tight">A section heading</div><div className="mt-1 font-mono text-xs text-muted-foreground">font-serif text-xl font-medium · the only other serif on a page</div></div>
            <div><div className="text-base font-medium">A card title</div><div className="mt-1 font-mono text-xs text-muted-foreground">CardTitle · Geist medium</div></div>
            <div><div className="text-sm">Body text, which is the size most of a page is set in, at a comfortable line length of about seventy characters.</div><div className="mt-1 font-mono text-xs text-muted-foreground">text-sm · Geist regular</div></div>
            <div><div className="text-sm text-muted-foreground">Secondary text: captions, help under a field, the line under a heading.</div><div className="mt-1 font-mono text-xs text-muted-foreground">text-sm text-muted-foreground</div></div>
            <div><div className="text-2xl font-medium tabular-nums tracking-tight">$1,284,301.55</div><div className="mt-1 font-mono text-xs text-muted-foreground">text-2xl font-medium tabular-nums · every number is tabular so columns line up</div></div>
            <div><div className="font-mono text-sm">0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</div><div className="mt-1 font-mono text-xs text-muted-foreground">font-mono · identifiers, hashes, code and anything read character by character</div></div>
          </CardContent>
        </Card>
      </div>

      <Section id="shape" title="Shape, depth and motion" lead="One radius, three shadows, and almost no animation. Movement is for something arriving or leaving, never for decoration." />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
        <Rule title="Radius and depth" use="cards, inputs and menus at the one radius; a shadow only where something floats above the page." not="a new radius per component, or a shadow on a card that is already on a bordered surface.">
          <div className="flex flex-wrap items-end gap-4">
            {[['--shadow-sm', 'sm'], ['--shadow-md', 'md'], ['--shadow-lg', 'lg']].map(([t, n]) => (
              <div key={t} className="flex flex-col items-center gap-2"><div className="size-16 rounded-xl border bg-card" style={{ boxShadow: `var(${t})` }} /><span className="font-mono text-xs text-muted-foreground">{n}</span></div>
            ))}
          </div>
        </Rule>
        <Rule title="Icons" use="Phosphor at the regular weight, at the size the component sets, always beside a word or with a tooltip." not="icon-only buttons with no label, two icon sets in one app, or an icon as decoration next to a heading.">
          <p className="text-sm text-muted-foreground">Client components import from <span className="font-mono text-xs">@phosphor-icons/react</span>; server components import the same names from <span className="font-mono text-xs">@phosphor-icons/react/ssr</span>. Getting that the wrong way round is the most common build error in this kit.</p>
        </Rule>
      </div>
    </>
  );
}
