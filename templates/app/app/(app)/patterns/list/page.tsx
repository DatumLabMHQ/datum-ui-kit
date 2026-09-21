// The list pattern, working. Rows are made here; in a real app they come from a loader in lib/.
import { PageHeader } from '@/components/page-header';
import { JobsTable, type Job } from '@/components/demos/jobs-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = { title: 'List page' };

const NAMES = ['morpho hourly', 'rwa legacy sync', 'centrifuge tokens', 'aave reserves', 'sui liquidations', 'defillama ref', 'positions sample', 'nightly tiering', 'health gate', 'docs build', 'vault snapshot', 'curator registry'];
const rows: Job[] = NAMES.map((name, i) => ({
  id: `job_${(i + 11).toString(16).padStart(4, '0')}`,
  name,
  owner: ['Olusegun', 'Joel', 'Abdel'][i % 3],
  env: i % 4 === 0 ? 'preview' : 'production',
  status: i === 2 ? 'failed' : i === 5 ? 'running' : 'ok',
  lastRun: `2026-09-${String(21 - (i % 9)).padStart(2, '0')} ${String(6 + (i % 12)).padStart(2, '0')}:15`,
  minutes: +(0.4 + (i % 7) * 1.3).toFixed(1),
}));

export default function ListPattern() {
  return (
    <>
      <PageHeader eyebrow="Pattern" question="Which jobs are failing, and who owns them?"
        answer={<>A list page leads with the question the list answers, not with the word &ldquo;Jobs&rdquo;. {rows.filter((r) => r.status === 'failed').length} of {rows.length} jobs failed on their last run. The reader can sort, filter, hide columns and open any row.</>} />
      <JobsTable rows={rows} />
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader><CardTitle>What makes this a list page</CardTitle><CardDescription>Four things, and they are the same on every list in every Datum app.</CardDescription></CardHeader>
          <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm leading-relaxed text-muted-foreground @2xl/card:grid-cols-2">
            <p><b className="font-medium text-foreground">The heading is a question</b> and the line under it answers it with the number that matters, so a reader who stops there has still learnt something.</p>
            <p><b className="font-medium text-foreground">The table carries a caption</b> that says what the rows are and what to notice. A table without one makes the reader work it out.</p>
            <p><b className="font-medium text-foreground">The whole row opens the thing</b> and the first cell is a real link, so a keyboard and a middle click both work.</p>
            <p><b className="font-medium text-foreground">Filtering happens on the rows</b> before the table sees them, which keeps the table code the same whatever the row type is.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
