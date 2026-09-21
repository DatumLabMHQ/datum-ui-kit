// The form pattern, working: react-hook-form for state, zod for the rules, Field for the layout.
import { PageHeader } from '@/components/page-header';
import { JobForm } from '@/components/demos/job-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = { title: 'Form page' };

const RULES: [string, string][] = [
  ['One column', 'Two columns of fields double the eye movement and halve the completion rate. Put fields in one column and group them with a legend.'],
  ['Labels above controls', 'Always a real label, never a placeholder standing in for one: the placeholder disappears the moment someone types.'],
  ['Help before the error', 'A line of help under the control stops most errors happening. The error appears under that, and only after a submit.'],
  ['Validate on submit, then on change', 'Nobody should be told they are wrong while they are still typing a value. After the first submit, correcting a field clears its error at once.'],
  ['One primary action', 'A save and a cancel. If a form needs three equal actions, it is really three forms.'],
  ['Say what happened', 'A toast with the verb in the past tense, and the consequence in the line below it. If it can be undone, offer Undo there.'],
];

export default function FormPattern() {
  return (
    <>
      <PageHeader eyebrow="Pattern" question="What is this form about to change?"
        answer={<>A form page opens with what it changes and for whom, not with the word &ldquo;Settings&rdquo;. This one creates a scheduled job: it has six fields, validation, a disabled state while it saves and a toast when it is done.</>} />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @4xl/main:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <Card>
          <CardHeader><CardTitle>New job</CardTitle><CardDescription>Everything needed to schedule one, in the order someone would think of it: what it is, when it runs, and anything the next person should know.</CardDescription></CardHeader>
          <CardContent><JobForm /></CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader><CardTitle>The six rules</CardTitle><CardDescription>They apply to every form in every Datum app, including the ones inside dialogs.</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-4">
            {RULES.map(([t, d], i) => (
              <div key={t} className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2"><span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span><h3 className="text-sm font-medium">{t}</h3></div>
                <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
