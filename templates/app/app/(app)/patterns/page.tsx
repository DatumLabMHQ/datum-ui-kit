// The patterns index: the four page shapes almost every internal app is made of, and the rule for
// picking one. Each links to a working page you can copy.
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Patterns' };

const PATTERNS = [
  { href: '/patterns/list', title: 'List page', lead: 'Many things of one kind, with a way to find one.', body: 'A heading that says what the list is, the table with its caption, and a row that opens the thing. Sorting, filtering, a column menu and paging come with the kit’s DataTable.' },
  { href: '/patterns/detail', title: 'Detail page', lead: 'One thing, its numbers, and its parameters.', body: 'A breadcrumb back to the list, a reading of the thing in one sentence, then two columns: the content on the left, the facts on the right. Both columns end on the same line.' },
  { href: '/patterns/form', title: 'Form page', lead: 'Something the reader is about to change.', body: 'One column, grouped into sections, labels above controls, validation on submit and then on change, one primary action, and a toast that says what happened.' },
  { href: '/patterns/states', title: 'Empty, loading, error', lead: 'The three states people forget.', body: 'Every screen has four. The shape of the page should not move between them, and each one should say what is happening and what the reader can do next.' },
  { href: '/landing', title: 'Landing page', lead: 'A page for people who are not logged in.', body: 'The other shell: no sidebar, a top bar, wide sections and a footer. For microsites, event pages and anything a client sees before they sign in.' },
];

export default function Patterns() {
  return (
    <>
      <PageHeader eyebrow="Patterns" question="What shape should this page be?"
        answer={<>Nearly every internal screen is one of five shapes. Start from the one that fits, copy the page, and change the content: that way two apps built a year apart still feel like one product.</>} />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @2xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        {PATTERNS.map((p) => (
          <Card key={p.href} className="@container/card">
            <CardHeader><CardTitle>{p.title}</CardTitle><CardDescription>{p.lead}</CardDescription></CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">{p.body}</CardContent>
            <CardFooter><Button variant="outline" size="sm" nativeButton={false} render={<Link href={p.href} />}>Open the pattern<ArrowRightIcon /></Button></CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
