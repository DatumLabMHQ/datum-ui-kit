// The states pattern: the four a screen always has, and the copy rules that make each one useful.
import { PageHeader } from '@/components/page-header';
import { StatesDemo } from '@/components/demos/states';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata = { title: 'Empty, loading, error' };

const COPY: [string, string, string][] = [
  ['Loading', 'A skeleton in the shape of what is coming, not a spinner in the middle of a blank card.', 'Three grey lines where three rows will be'],
  ['Empty, nothing yet', 'Say why it is empty and give the one action that fills it.', 'No runs yet. It will run at the next hour, or start it now.'],
  ['Empty, nothing matched', 'Say what was searched and offer a way back.', 'No job matches &ldquo;centrifuge&rdquo;. Clear the filter to see all twelve.'],
  ['Error', 'Say what failed in plain words, say that nothing is stale by accident, give a reference and a retry.', 'Could not load the runs. The API did not answer in ten seconds. Reference 4f21ab.'],
];

export default function StatesPattern() {
  return (
    <>
      <PageHeader eyebrow="Pattern" question="What does this screen look like before it has anything to show?"
        answer={<>Every screen has four states and most bugs a reader notices are in the three that are not &ldquo;full&rdquo;. Build them together, keep the shape of the page the same in each, and say what is happening and what to do next.</>} />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <StatesDemo />
        <Card>
          <CardHeader><CardTitle>What each state says</CardTitle><CardDescription>The words matter more than the illustration. These are the four we use, with an example of each.</CardDescription></CardHeader>
          <CardContent className="px-0">
            <div className="border-t">
              <Table>
                <TableHeader className="bg-muted"><TableRow><TableHead className="w-44 pl-6">State</TableHead><TableHead>Rule</TableHead><TableHead className="pr-6">Example</TableHead></TableRow></TableHeader>
                <TableBody>{COPY.map(([s, r, e]) => (
                  <TableRow key={s}><TableCell className="pl-6 font-medium">{s}</TableCell><TableCell className="whitespace-normal text-muted-foreground">{r}</TableCell><TableCell className="whitespace-normal pr-6 text-muted-foreground">{e}</TableCell></TableRow>
                ))}</TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader><CardTitle>Where each one lives in a Next app</CardTitle><CardDescription>Three of the four are files the framework looks for, so a page gets them by existing.</CardDescription></CardHeader>
          <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm leading-relaxed text-muted-foreground @2xl/card:grid-cols-2">
            <p><b className="font-medium text-foreground">loading.tsx</b> beside a page renders while that page&rsquo;s server work runs. Put skeletons in the shape of the page, not a spinner.</p>
            <p><b className="font-medium text-foreground">error.tsx</b> is a client component that catches a throw in the page. It shows the reference and a retry, never a stack trace.</p>
            <p><b className="font-medium text-foreground">not-found.tsx</b> catches a bad id. The kit ships one at the root and you can add one per section.</p>
            <p><b className="font-medium text-foreground">The empty state</b> is yours: the Empty block, inside the card where the rows would have been.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
