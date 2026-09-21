'use client';
// Live examples for the Feedback section: what the app says back when something happens, is happening
// or has gone wrong.
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => toast.success('Run queued')}>Success</Button>
      <Button variant="outline" size="sm" onClick={() => toast.error('Could not reach the API', { description: 'Tried three times over ten seconds.' })}>Error</Button>
      <Button variant="outline" size="sm" onClick={() => toast('Copied the id', { action: { label: 'Undo', onClick: () => toast('Undone') } })}>With an action</Button>
    </div>
  );
}

export function ProgressDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Progress value={62} className="gap-2">
        <ProgressTrack><ProgressIndicator /></ProgressTrack>
      </Progress>
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><Spinner className="size-4" />Reading 62 of 100 markets</p>
    </div>
  );
}
