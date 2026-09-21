'use client';
// Live examples for the Form controls section: one of each, wired to nothing. The worked form with
// validation and a submit is the Form page pattern.
import * as React from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function TextFieldsDemo() {
  return (
    <div className="grid gap-5 @2xl/card:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="demo-name">Name</FieldLabel>
        <Input id="demo-name" placeholder="Ada Lovelace" />
        <FieldDescription>A label above, help below, the control between. Never a placeholder instead of a label.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="demo-search">Search</FieldLabel>
        <InputGroup>
          <InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon>
          <InputGroupInput id="demo-search" placeholder="Filter by name or id" />
        </InputGroup>
        <FieldDescription>InputGroup when the control needs an icon, a prefix or a unit.</FieldDescription>
      </Field>
      <Field className="@2xl/card:col-span-2">
        <FieldLabel htmlFor="demo-note">Note</FieldLabel>
        <Textarea id="demo-note" rows={3} placeholder="What changed and why" />
      </Field>
    </div>
  );
}

export function ChoiceDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="grid gap-5 @2xl/card:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="demo-env">Environment</FieldLabel>
        <NativeSelect id="demo-env" defaultValue="production">
          <NativeSelectOption value="production">Production</NativeSelectOption>
          <NativeSelectOption value="preview">Preview</NativeSelectOption>
          <NativeSelectOption value="local">Local</NativeSelectOption>
        </NativeSelect>
        <FieldDescription>NativeSelect for a short list of plain options: it is the platform control, so it works on a phone.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Owner</FieldLabel>
        <Select defaultValue="olusegun">
          <SelectTrigger><SelectValue placeholder="Choose an owner" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="olusegun">Olusegun</SelectItem>
            <SelectItem value="joel">Joel</SelectItem>
            <SelectItem value="abdel">Abdel</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>Select when an option needs more than a word: an icon, a description, a group.</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="demo-check" defaultChecked />
        <FieldLabel htmlFor="demo-check" className="font-normal">Email me when it finishes</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="demo-switch" checked={on} onCheckedChange={setOn} />
        <FieldLabel htmlFor="demo-switch" className="font-normal">Run on every push</FieldLabel>
      </Field>
      <Field className="@2xl/card:col-span-2">
        <FieldLabel>Cadence</FieldLabel>
        <RadioGroup defaultValue="hourly" className="flex flex-wrap gap-x-6 gap-y-2">
          {[['hourly', 'Hourly'], ['daily', 'Daily'], ['weekly', 'Weekly']].map(([v, l]) => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroupItem value={v} id={`demo-r-${v}`} />
              <Label htmlFor={`demo-r-${v}`} className="font-normal">{l}</Label>
            </div>
          ))}
        </RadioGroup>
        <FieldDescription>A switch is one setting that takes effect now. A checkbox is a value you save. Radios are three or four options seen at once.</FieldDescription>
      </Field>
    </div>
  );
}
