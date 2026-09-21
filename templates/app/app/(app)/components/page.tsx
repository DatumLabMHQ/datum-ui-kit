// The component chooser: every component we have, live, with the rule for when it is the right one.
// Sections group them by the job they do, because that is how you pick one.
import { PageHeader } from '@/components/page-header';
import { Rule, Section } from '@/components/rule';
import { CardRow } from '@/components/card-row';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WarningIcon, HashIcon, ClockIcon, ShieldCheckIcon } from '@phosphor-icons/react/ssr';
import { ButtonsDemo, DestructiveDemo, MenuDemo, ToggleDemo } from '@/components/demos/actions';
import { ChoiceDemo, TextFieldsDemo } from '@/components/demos/forms';
import { DialogDemo, PopoverDemo, SheetDemo, TooltipDemo } from '@/components/demos/overlays';
import { ProgressDemo, ToastDemo } from '@/components/demos/feedback';
import { AccordionDemo, PaginationDemo, TabsDemo } from '@/components/demos/navigation';

export const metadata = { title: 'Components' };

export default function Components() {
  return (
    <>
      <PageHeader eyebrow="Components" question="Which component does this job?"
        answer={<>Every component below comes from shadcn and already wears the Datum tokens. Add one you do not see with <span className="font-mono text-xs">npx shadcn@latest add &lt;name&gt;</span>; it lands themed, with Phosphor icons, because <span className="font-mono text-xs">components.json</span> says so.</>} />

      <Section id="actions" title="Actions" lead="One primary action per view. Everything else is outline, ghost or a menu." />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
        <Rule title="Button" use="the thing the reader came to do, and the one or two things next to it." not="navigation that is really a link, or five buttons in a row competing to be pressed.">
          <ButtonsDemo />
        </Rule>
        <Rule title="Dropdown menu" use="the actions of one row or one object, gathered behind one trigger." not="navigation between pages, or a list of options for a field, which is a Select.">
          <MenuDemo />
        </Rule>
        <Rule title="Toggle group" use="switching a view between two to four states that are visible at once, such as a range." not="anything that saves a value, which is a form control, or more than four options, which is a Select.">
          <ToggleDemo />
        </Rule>
        <Rule title="Alert dialog" use="an action that cannot be undone, where the dialog states the consequence and the button says the verb." not="ordinary confirmation. If it can be undone, do it and offer Undo in a toast instead.">
          <DestructiveDemo />
        </Rule>
      </div>

      <Section id="forms" title="Form controls" lead="A label above, the control, help under it, the error under that. Field handles the layout so every form in every Datum app looks the same." />
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <Rule title="Text inputs" use="anything typed: a name, an email, a search, a note." not="a value with a fixed set of options, and never a placeholder where a label belongs.">
          <TextFieldsDemo />
        </Rule>
        <Rule title="Choices" use="picking from options: a select for a list, radios for three or four seen at once, a checkbox for a value you save, a switch for a setting that takes effect now." not="mixing them. A switch that needs a save button is a checkbox wearing the wrong clothes.">
          <ChoiceDemo />
        </Rule>
      </div>

      <Section id="data" title="Data display" lead="Cards hold one idea each; tables hold rows; item lists hold facts about one thing." />
      <div className="flex flex-col gap-4 px-4 lg:px-6">
        <CardRow>
          <Rule title="Card" use="one idea, with a title, a one-line description of what it shows, and the thing itself." not="a container for a whole page, or a card with no description, which makes the reader guess what they are looking at.">
            <Card className="bg-muted/30">
              <CardHeader><CardTitle>Runs today</CardTitle><CardDescription>Every scheduled run since midnight UTC, including the ones that failed.</CardDescription></CardHeader>
              <CardContent className="text-2xl font-medium tabular-nums tracking-tight">128</CardContent>
            </Card>
          </Rule>
          <Rule title="Item list" use="the facts about one thing: parameters, metadata, a short ranked list. Each row is an icon, a label, a description and a value." not="tabular data with more than two values per row, which is a Table.">
            <ItemGroup>
              {[[<ShieldCheckIcon key="i" />, 'Owner', 'Who gets the alert', 'Olusegun'], [<ClockIcon key="i" />, 'Cadence', 'How often it runs', 'Hourly'], [<HashIcon key="i" />, 'Job id', 'Stable across runs', 'job_8f2a1c']].map(([icon, title, desc, value], i) => (
                <div key={String(title)}>
                  {i > 0 ? <ItemSeparator /> : null}
                  <Item size="sm"><ItemMedia variant="icon">{icon as React.ReactNode}</ItemMedia><ItemContent><ItemTitle>{title as string}</ItemTitle><ItemDescription>{desc as string}</ItemDescription></ItemContent><span className="ml-auto shrink-0 text-sm font-medium tabular-nums">{value as string}</span></Item>
                </div>
              ))}
            </ItemGroup>
          </Rule>
        </CardRow>
        <CardRow>
          <Rule title="Table" use="rows a reader compares, sorts or scans. The kit's DataTable adds sorting, a filter, a column menu and paging." not="two or three facts about one thing, which is an item list.">
            <Table>
              <TableHeader className="bg-muted"><TableRow><TableHead>Job</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Minutes</TableHead></TableRow></TableHeader>
              <TableBody>
                {[['morpho hourly', 'Succeeded', '7.4'], ['rwa legacy sync', 'Succeeded', '2.1'], ['centrifuge', 'Failed', '0.4']].map(([n, s, m]) => (
                  <TableRow key={n}><TableCell className="font-medium">{n}</TableCell><TableCell><Badge variant="outline" className={s === 'Failed' ? 'text-(--red)' : 'text-(--green)'}><span className="size-1.5 rounded-full bg-current" />{s}</Badge></TableCell><TableCell className="text-right tabular-nums">{m}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </Rule>
          <Rule title="Badge, avatar, skeleton" use="a badge for a status or a count; an avatar for a person or a thing with a logo; a skeleton in the shape of what is loading." not="a badge as a label on everything, or a spinner where a skeleton would show the shape of what is coming.">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge>
                <Badge variant="outline" className="text-(--green)"><span className="size-1.5 rounded-full bg-current" />Live</Badge>
              </div>
              <div className="flex items-center gap-2">
                {['OA', 'JO', 'AB'].map((i) => <Avatar key={i} className="size-8"><AvatarFallback className="text-xs">{i}</AvatarFallback></Avatar>)}
              </div>
              <div className="flex flex-col gap-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/5" /></div>
            </div>
          </Rule>
        </CardRow>
      </div>

      <Section id="navigation" title="Navigation" lead="Moving within a page. Moving between pages is the sidebar, and it comes from site.config.ts." />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
        <Rule title="Tabs" use="one subject seen three ways, where the reader stays in place." not="separate subjects, which are pages, or a wizard, which is steps.">
          <TabsDemo />
        </Rule>
        <Rule title="Accordion" use="detail most readers can skip: a long definition, an advanced option, a methodology note." not="the point of the page, and never six in a row where a table would say it at a glance.">
          <AccordionDemo />
        </Rule>
        <Rule title="Pagination" use="pages of rows when the reader needs a sense of how many there are." not="a list that is short enough to scroll, or an infinite feed.">
          <PaginationDemo />
        </Rule>
        <Rule title="Breadcrumb" use="saying where a detail page sits, when it has a parent list." not="a page one click from the sidebar, which needs no trail.">
          <p className="text-sm text-muted-foreground">Use <span className="font-mono text-xs">PageBreadcrumb</span> from the kit and pass a list of crumbs; it wraps shadcn&rsquo;s Breadcrumb so a server page can render one. The detail pattern shows it in place.</p>
        </Rule>
      </div>

      <Section id="overlays" title="Overlays" lead="The smallest surface that can hold the job. Anything a reader might want to link to is a page, not an overlay." />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
        <Rule title="Dialog" use="a short focused task that interrupts on purpose: rename, invite, confirm with input." not="a form with more than about five fields, which deserves a page.">
          <DialogDemo />
        </Rule>
        <Rule title="Sheet" use="a side task with several controls where the page behind should stay visible: filters, a detail peek." not="the main content of the app, and not on a phone where it covers everything anyway.">
          <SheetDemo />
        </Rule>
        <Rule title="Popover" use="a sentence or two of explanation, or two or three controls, anchored to what they belong to." not="anything with a heading and paragraphs, which is a dialog or a page.">
          <PopoverDemo />
        </Rule>
        <Rule title="Tooltip" use="the label an icon-only control would have had, on hover and on focus." not="information the reader needs, because a tooltip is invisible on a touch screen.">
          <TooltipDemo />
        </Rule>
      </div>

      <Section id="feedback" title="Feedback" lead="What the app says back. Say it where the reader is looking, and say what happens next." />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-2">
        <Rule title="Toast" use="the result of something the reader just did, with an Undo where one is possible." not="errors that need a decision, or anything the reader must not miss: a toast disappears.">
          <ToastDemo />
        </Rule>
        <Rule title="Alert" use="a condition that persists and changes how the page should be read: sample data, a stale source, a permission problem." not="a one-off result, which is a toast.">
          <Alert>
            <WarningIcon />
            <AlertTitle>This app is showing sample data</AlertTitle>
            <AlertDescription>No API key is set, so every number here is generated. Nothing on this screen is a live figure.</AlertDescription>
          </Alert>
        </Rule>
        <Rule title="Progress and spinner" use="progress when you know how far along it is, a spinner when you do not and it is short." not="either one where a skeleton would show the shape of what is coming.">
          <ProgressDemo />
        </Rule>
        <Rule title="Empty" use="a list with nothing in it yet, a filter that matched nothing, or a feature not set up: say which, and offer the next step." not="an empty div, or the word 'No data', which tells the reader nothing about what to do.">
          <p className="text-sm text-muted-foreground">The Empty block is on the states pattern page, in all four states of a real list.</p>
        </Rule>
      </div>
    </>
  );
}
