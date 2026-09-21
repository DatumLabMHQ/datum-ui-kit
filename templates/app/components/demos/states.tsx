'use client';
// The four states of one list, side by side under a toggle. Every screen in a Datum app ships all
// four: the reader should never meet a blank rectangle and have to guess which one they are in.
import * as React from 'react';
import { ArrowClockwiseIcon, FolderOpenIcon, PlusIcon, WarningOctagonIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

type State = 'loading' | 'empty' | 'error' | 'full';
const ROWS = [
  ['morpho hourly', 'Succeeded 12 minutes ago', 'ok'],
  ['rwa legacy sync', 'Succeeded 12 minutes ago', 'ok'],
  ['centrifuge tokens', 'Failed 12 minutes ago', 'bad'],
];

export function StatesDemo() {
  const [state, setState] = React.useState<State>('full');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent runs</CardTitle>
        <CardDescription>The same card in each of its four states. Switch between them and notice that the shape of the card never moves.</CardDescription>
        <div className="mt-2">
          <ToggleGroup multiple={false} value={[state]} onValueChange={(v) => { if (v[0]) setState(v[0] as State); }} variant="outline" size="sm" aria-label="State">
            <ToggleGroupItem value="loading">Loading</ToggleGroupItem>
            <ToggleGroupItem value="empty">Empty</ToggleGroupItem>
            <ToggleGroupItem value="error">Error</ToggleGroupItem>
            <ToggleGroupItem value="full">Full</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="min-h-[248px] px-2">
        {state === 'loading' ? (
          <div className="flex flex-col gap-4 p-2" aria-busy="true" aria-live="polite">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3"><Skeleton className="size-8 rounded-full" /><div className="flex flex-1 flex-col gap-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-3 w-64" /></div></div>
            ))}
          </div>
        ) : null}

        {state === 'empty' ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon"><FolderOpenIcon /></EmptyMedia>
              <EmptyTitle>No runs yet</EmptyTitle>
              <EmptyDescription>This job has never run. It will run at the next hour, or you can start it now and watch it here.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent><Button size="sm"><PlusIcon />Run it now</Button></EmptyContent>
          </Empty>
        ) : null}

        {state === 'error' ? (
          <Empty className="border border-destructive/30">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="text-destructive"><WarningOctagonIcon /></EmptyMedia>
              <EmptyTitle>Could not load the runs</EmptyTitle>
              <EmptyDescription>The API did not answer in ten seconds. Nothing here is stale by accident: it is simply not shown. Reference 4f21ab.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent><Button size="sm" variant="outline"><ArrowClockwiseIcon />Try again</Button></EmptyContent>
          </Empty>
        ) : null}

        {state === 'full' ? (
          <ItemGroup>
            {ROWS.map(([name, when, tone], i) => (
              <div key={name}>
                {i > 0 ? <ItemSeparator /> : null}
                <Item size="sm">
                  <ItemMedia variant="icon"><ArrowClockwiseIcon /></ItemMedia>
                  <ItemContent><ItemTitle>{name}</ItemTitle><ItemDescription>{when}</ItemDescription></ItemContent>
                  <Badge variant="outline" className={tone === 'bad' ? 'text-(--red)' : 'text-(--green)'}><span className="size-1.5 rounded-full bg-current" />{tone === 'bad' ? 'Failed' : 'Succeeded'}</Badge>
                </Item>
              </div>
            ))}
          </ItemGroup>
        ) : null}
      </CardContent>
    </Card>
  );
}
