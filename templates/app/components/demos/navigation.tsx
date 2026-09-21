'use client';
// Live examples for the Navigation section: moving within a page (tabs), hiding detail until asked
// (accordion), and moving between pages of rows (pagination).
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export function TabsDemo() {
  return (
    <Tabs defaultValue="summary">
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="runs">Runs</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="pt-4 text-sm text-muted-foreground">One subject, three views of it. Tabs keep the reader in place; they never stand in for navigation between subjects.</TabsContent>
      <TabsContent value="runs" className="pt-4 text-sm text-muted-foreground">The last runs of this job would sit here.</TabsContent>
      <TabsContent value="settings" className="pt-4 text-sm text-muted-foreground">Its settings would sit here.</TabsContent>
    </Tabs>
  );
}

export function AccordionDemo() {
  return (
    <Accordion defaultValue={['what']}>
      <AccordionItem value="what">
        <AccordionTrigger>What an accordion is for</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">Detail most readers can skip: a methodology note, a long definition, an advanced option. If everyone needs it, it is not an accordion, it is the page.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="not">
        <AccordionTrigger>What it is not for</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">Hiding the point of the page, or stacking six of them where a table would have said the same thing at a glance.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
