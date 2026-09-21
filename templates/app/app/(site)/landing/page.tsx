// The landing pattern: the same tokens and components as the app, in the wide shell. Sections are
// generous, the type is larger, and there is exactly one thing to do.
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = { title: 'Landing page' };

const FEATURES = [
  { title: 'One shell, two shapes', body: 'The app shell with its sidebar for people who are signed in, and this wide shell for everyone else. Both read the same tokens, so the seam between them is invisible.' },
  { title: 'Sections, not a wall', body: 'A landing page is a sequence of sections that each make one point, at about seventy characters a line, with plenty of room between them.' },
  { title: 'One thing to do', body: 'Every section can point at the same single action. Two competing calls to action halve each other.' },
];

export default function Landing() {
  return (
    <>
      <section className="flex flex-col items-start gap-5">
        <Badge variant="outline">The other shell</Badge>
        <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.1] tracking-tight text-balance md:text-5xl">Everything a client sees before they sign in, in the same design system as what they see after.</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">This page uses no component the app pages do not. The difference is the shell around it, the width of the column and the size of the type. That is what keeps a microsite and an internal console recognisably one product.</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/" />}>Back to the kit<ArrowRightIcon /></Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/patterns" />}>See the other patterns</Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title}>
            <CardHeader><CardTitle>{f.title}</CardTitle></CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">{f.body}</CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-6 rounded-2xl border bg-card p-8 md:p-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight">What a landing section is made of</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {['A heading that makes one claim', 'A paragraph that supports it, at a readable line length', 'Evidence: a number, a screenshot or a name', 'The same single action, repeated without shouting'].map((t) => (
            <p key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckIcon className="mt-0.5 size-4 shrink-0 text-(--green)" />{t}</p>
          ))}
        </div>
        <CardDescription>Copy rules are the same everywhere: sentence case, full sentences, no em dashes, and never a word like &ldquo;seamless&rdquo; where a fact would do.</CardDescription>
      </section>
    </>
  );
}
