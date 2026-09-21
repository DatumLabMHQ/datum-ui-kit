'use client';
// Live examples for the Overlays section. The rule they demonstrate: the smallest surface that can
// hold the job wins, and nothing that can be a page should be an overlay.
import { InfoIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Rename</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename this view</DialogTitle>
          <DialogDescription>Everyone who has the link sees the new name.</DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="demo-rename">Name</FieldLabel>
          <Input id="demo-rename" defaultValue="Weekly rollup" />
        </Field>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <DialogClose render={<Button onClick={() => toast.success('Renamed')} />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open filters</SheetTrigger>
      <SheetContent side="right" className="p-6">
        <SheetHeader className="p-0">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>A sheet holds a side task with several controls, and keeps the page behind it in view.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}><InfoIcon />How this is counted</PopoverTrigger>
      <PopoverContent align="start" className="max-w-xs">
        <PopoverTitle>How this is counted</PopoverTitle>
        <PopoverDescription>A popover carries a sentence or two of explanation next to the thing it explains. Longer than this belongs on a page.</PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="sm" />}>Hover me</TooltipTrigger>
      <TooltipContent>The label an icon button would have had</TooltipContent>
    </Tooltip>
  );
}
