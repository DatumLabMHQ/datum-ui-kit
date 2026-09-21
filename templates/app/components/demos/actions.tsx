'use client';
// Live examples for the Actions section. Client because every one of them responds to a click.
import { CaretDownIcon, DownloadSimpleIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export function ButtonsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={() => toast.success('Saved')}><PlusIcon />Primary action</Button>
      <Button variant="outline">Secondary</Button>
      <Button variant="ghost">Quiet</Button>
      <Button variant="outline" size="sm"><DownloadSimpleIcon />Small</Button>
      <Button variant="link">A link that acts</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

export function MenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Row actions<CaretDownIcon /></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => toast('Opened')}>Open</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast('Duplicated')}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => toast.error('Deleted')}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ToggleDemo() {
  return (
    <ToggleGroup multiple={false} defaultValue={['week']} variant="outline" size="sm" aria-label="Range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function DestructiveDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}><TrashIcon />Delete the run</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this run?</AlertDialogTitle>
          <AlertDialogDescription>The run and its logs go for good. Anything built from it stays where it is.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction onClick={() => toast.error('Run deleted')}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
