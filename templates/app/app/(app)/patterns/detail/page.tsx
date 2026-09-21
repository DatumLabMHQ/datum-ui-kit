// The detail pattern, working: one thing, its numbers, its parameters. The two columns end on the
// same line because the aside takes the main column's height and its last card scrolls inside.
import Link from 'next/link';
import { ArrowClockwiseIcon, CalendarBlankIcon, ClockIcon, HashIcon, ShieldCheckIcon, UsersThreeIcon } from '@phosphor-icons/react/ssr';
import { PageBreadcrumb } from '@/components/page-breadcrumb';
import { CardRow } from '@/components/card-row';
import { DetailLayout } from '@/components/detail-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';

export const metadata = { title: 'Detail page' };

const FACTS: [React.ReactNode, string, string, string][] = [
  [<UsersThreeIcon key="1" />, 'Owner', 'Who the failures reach', 'Olusegun'],
  [<ClockIcon key="2" />, 'Cadence', 'Runs at fifteen past the hour', 'Hourly'],
  [<ShieldCheckIcon key="3" />, 'Environment', 'Where it writes', 'Production'],
  [<CalendarBlankIcon key="4" />, 'Created', 'By the platform scaffolder', '2026-09-04'],
  [<HashIcon key="5" />, 'Job id', 'Stable across runs', 'job_8f2a1c'],
  [<ArrowClockwiseIcon key="6" />, 'Retries', 'Before it gives up', '3'],
];
const RUNS = [['21 Sep 06:15', 'Succeeded', '7.4 min'], ['21 Sep 05:15', 'Succeeded', '7.1 min'], ['21 Sep 04:15', 'Failed', '0.4 min'], ['21 Sep 03:15', 'Succeeded', '7.6 min'], ['21 Sep 02:15', 'Succeeded', '7.2 min'], ['21 Sep 01:15', 'Succeeded', '6.9 min']];

export default function DetailPattern() {
  const stat = (label: string, value: string, sub: string) => (
    <Card className="@container/card"><CardHeader><CardDescription>{label}</CardDescription><CardTitle className="text-2xl font-medium tracking-tight tabular-nums">{value}</CardTitle><CardDescription>{sub}</CardDescription></CardHeader></Card>
  );
  return (
    <>
      <div className="flex flex-col gap-3 px-4 lg:px-6">
        <PageBreadcrumb items={[{ label: 'Jobs', href: '/patterns/list' }, { label: 'morpho hourly' }]} />
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-[1.75rem] font-medium leading-tight tracking-tight">morpho hourly</h1>
          <Badge variant="outline" className="text-(--green)"><span className="size-1.5 rounded-full bg-current" />Succeeded</Badge>
        </div>
        <p className="max-w-[72ch] text-sm text-muted-foreground">
          The last run took 7.4 minutes and wrote 1,284 rows. One run in the last twenty four hours failed, at 04:15, on a source that timed out and recovered by itself. A detail page reads like this sentence first, and shows the numbers underneath.
        </p>
      </div>
      <DetailLayout
        main={<>
          <div className="grid grid-cols-2 gap-4 @2xl/main:grid-cols-4">
            {stat('Last run', '7.4 min', 'against a 30 minute timeout')}
            {stat('Rows written', '1,284', 'into four tables')}
            {stat('Success rate', '95.8%', 'over the last 24 runs')}
            {stat('Next run', '07:15', 'in 38 minutes')}
          </div>
          <Card>
            <CardHeader><CardTitle>This run</CardTitle><CardDescription>Where the job is now. Progress when you know how far along it is, which is the case whenever the work has a count.</CardDescription></CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Progress value={62} className="gap-2"><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>
              <p className="text-sm text-muted-foreground">Reading 62 of 100 markets. Started two minutes ago.</p>
            </CardContent>
          </Card>
          <CardRow>
            <Card>
              <CardHeader><CardTitle>Recent runs</CardTitle><CardDescription>The last six, newest first. The card on the right holds more rows than this one and scrolls inside, so both end on the same line.</CardDescription></CardHeader>
              <CardContent className="px-2">
                <ItemGroup>
                  {RUNS.slice(0, 4).map(([when, status, took], i) => (
                    <div key={when}>
                      {i > 0 ? <ItemSeparator /> : null}
                      <Item size="sm"><ItemContent><ItemTitle className="font-mono text-xs">{when}</ItemTitle><ItemDescription>{took}</ItemDescription></ItemContent><Badge variant="outline" className={status === 'Failed' ? 'text-(--red)' : 'text-(--green)'}><span className="size-1.5 rounded-full bg-current" />{status}</Badge></Item>
                    </div>
                  ))}
                </ItemGroup>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Every run today</CardTitle><CardDescription>More rows than its neighbour, so this card scrolls inside the height the row was given.</CardDescription></CardHeader>
              <CardContent className="px-2">
                <ItemGroup>
                  {[...RUNS, ...RUNS].map(([when, status, took], i) => (
                    <div key={`${when}-${i}`}>
                      {i > 0 ? <ItemSeparator /> : null}
                      <Item size="sm"><ItemContent><ItemTitle className="font-mono text-xs">{when}</ItemTitle><ItemDescription>{took}</ItemDescription></ItemContent><Badge variant="outline" className={status === 'Failed' ? 'text-(--red)' : 'text-(--green)'}><span className="size-1.5 rounded-full bg-current" />{status}</Badge></Item>
                    </div>
                  ))}
                </ItemGroup>
              </CardContent>
            </Card>
          </CardRow>
        </>}
        aside={<>
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle><CardDescription>What a reader can do to this job from here.</CardDescription></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button size="sm"><ArrowClockwiseIcon />Run now</Button>
              <Button size="sm" variant="outline" nativeButton={false} render={<Link href="/patterns/form" />}>Edit</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Parameters</CardTitle><CardDescription>What the job was set up with. These change rarely, so a change is news.</CardDescription></CardHeader>
            <CardContent className="px-2">
              <ItemGroup>
                {FACTS.map(([icon, title, desc, value], i) => (
                  <div key={title}>
                    {i > 0 ? <ItemSeparator /> : null}
                    <Item size="sm"><ItemMedia variant="icon">{icon}</ItemMedia><ItemContent><ItemTitle>{title}</ItemTitle><ItemDescription>{desc}</ItemDescription></ItemContent><span className="ml-auto shrink-0 text-sm font-medium tabular-nums">{value}</span></Item>
                  </div>
                ))}
              </ItemGroup>
            </CardContent>
          </Card>
        </>}
      />
    </>
  );
}
