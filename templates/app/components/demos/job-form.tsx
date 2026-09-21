'use client';
// The house form: react-hook-form for state, zod for the rules, shadcn Field for the layout. One
// column, labels above controls, help text under the control, errors under that, one primary action
// at the end. Validation runs on submit and then on change, so nobody is told they are wrong while
// they are still typing.
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  name: z.string().min(2, 'Give the job a name of at least two characters'),
  email: z.email('A work email, so the failures reach someone'),
  env: z.enum(['production', 'preview'], { message: 'Pick an environment' }),
  cadence: z.enum(['hourly', 'daily', 'weekly']),
  notify: z.boolean(),
  note: z.string().max(280, 'Keep it under 280 characters').optional(),
});
type Values = z.infer<typeof schema>;

export function JobForm() {
  const { register, handleSubmit, control, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<Values>({
    resolver: zodResolver(schema), mode: 'onSubmit', reValidateMode: 'onChange',
    defaultValues: { name: '', email: '', env: 'preview', cadence: 'daily', notify: true, note: '' },
  });
  const onSubmit = async (v: Values) => {
    await new Promise((r) => setTimeout(r, 400));
    toast.success('Job saved', { description: `${v.name} runs ${v.cadence} on ${v.env}.` });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">What it is</FieldLegend>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="job-name">Name</FieldLabel>
              <Input id="job-name" aria-invalid={!!errors.name} {...register('name')} />
              <FieldDescription>How it appears in the list and in alerts.</FieldDescription>
              <FieldError errors={[errors.name]} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="job-email">Who to tell when it fails</FieldLabel>
              <Input id="job-email" type="email" placeholder="name@datumlab.xyz" aria-invalid={!!errors.email} {...register('email')} />
              <FieldError errors={[errors.email]} />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend variant="label">When it runs</FieldLegend>
          <FieldGroup>
            <Field data-invalid={!!errors.env}>
              <FieldLabel htmlFor="job-env">Environment</FieldLabel>
              <NativeSelect id="job-env" aria-invalid={!!errors.env} {...register('env')}>
                <NativeSelectOption value="preview">Preview</NativeSelectOption>
                <NativeSelectOption value="production">Production</NativeSelectOption>
              </NativeSelect>
              <FieldError errors={[errors.env]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="job-cadence">Cadence</FieldLabel>
              <NativeSelect id="job-cadence" {...register('cadence')}>
                <NativeSelectOption value="hourly">Hourly</NativeSelectOption>
                <NativeSelectOption value="daily">Daily</NativeSelectOption>
                <NativeSelectOption value="weekly">Weekly</NativeSelectOption>
              </NativeSelect>
            </Field>
            <Controller
              control={control} name="notify"
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Switch id="job-notify" checked={field.value} onCheckedChange={field.onChange} />
                  <FieldLabel htmlFor="job-notify" className="font-normal">Send a message on every failure</FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field data-invalid={!!errors.note}>
          <FieldLabel htmlFor="job-note">Note</FieldLabel>
          <Textarea id="job-note" rows={3} placeholder="Anything the next person should know" aria-invalid={!!errors.note} {...register('note')} />
          <FieldDescription>Optional. Shown on the job&rsquo;s page.</FieldDescription>
          <FieldError errors={[errors.note]} />
        </Field>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving' : 'Save job'}</Button>
          <Button type="button" variant="ghost">Cancel</Button>
          {isSubmitSuccessful ? <span className="text-sm text-(--green)">Saved</span> : null}
        </div>
      </FieldGroup>
    </form>
  );
}
