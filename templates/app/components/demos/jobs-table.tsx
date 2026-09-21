'use client';
// A worked table: the kit's DataTable with columns for one row type. Copy this file, change the row
// type and the columns, and the sorting, filtering, column menu, paging and row links come with it.
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { DataTable, defineColumns, SortHeader } from '@/components/data-table';

export type Job = { id: string; name: string; owner: string; env: 'production' | 'preview'; status: 'ok' | 'running' | 'failed'; lastRun: string; minutes: number };

const STATUS: Record<Job['status'], { label: string; cls: string }> = {
  ok: { label: 'Succeeded', cls: 'text-(--green)' },
  running: { label: 'Running', cls: 'text-(--brand-blue)' },
  failed: { label: 'Failed', cls: 'text-(--red)' },
};

const columns = defineColumns<Job>((col) => [
  col.accessor('name', {
    header: 'Job', enableHiding: false,
    cell: ({ row }) => (
      <Link href="/patterns/detail" className="flex flex-col leading-tight outline-none focus-visible:underline">
        <span className="font-medium">{row.original.name}</span>
        <span className="font-mono text-xs text-muted-foreground">{row.original.id}</span>
      </Link>
    ),
  }),
  col.accessor('owner', { header: 'Owner', cell: ({ row }) => <span className="text-muted-foreground">{row.original.owner}</span> }),
  col.accessor('env', { header: 'Environment', cell: ({ row }) => <Badge variant="outline" className="font-normal">{row.original.env}</Badge> }),
  col.accessor('status', {
    header: 'Status',
    cell: ({ row }) => { const s = STATUS[row.original.status]; return <Badge variant="outline" className={`px-1.5 ${s.cls}`}><span className="size-1.5 rounded-full bg-current" />{s.label}</Badge>; },
  }),
  col.accessor('lastRun', { header: ({ column }) => <SortHeader column={column} label="Last run" />, cell: ({ row }) => <span className="font-mono text-xs">{row.original.lastRun}</span> }),
  col.accessor('minutes', { header: ({ column }) => <SortHeader column={column} label="Minutes" />, cell: ({ row }) => <span className="tabular-nums">{row.original.minutes.toFixed(1)}</span> }),
]);

export function JobsTable({ rows }: { rows: Job[] }) {
  return (
    <DataTable<Job>
      rows={rows} columns={columns} title="Jobs"
      caption={<><b className="font-medium text-foreground">Every scheduled job, newest run first.</b> A caption says what the reader is looking at and what to notice; a table without one makes the reader guess.</>}
      getRowId={(j) => j.id} rowHref={() => '/patterns/detail'}
      search={(j, q) => `${j.name} ${j.owner} ${j.env} ${j.status}`.toLowerCase().includes(q)} searchPlaceholder="Filter jobs"
      numeric={['minutes']} labels={{ name: 'Job', owner: 'Owner', env: 'Environment', status: 'Status', lastRun: 'Last run', minutes: 'Minutes' }}
      initialSort={[{ id: 'lastRun', desc: true }]} pageSize={8} noun="job" empty="No job matches that filter."
    />
  );
}
