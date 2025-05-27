import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormCheckboxProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
}

export default function FormCheckbox<TFormValues extends FieldValues>({
  control,
  name,
  label,
}: FormCheckboxProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-start  space-y-0">
          <FormControl>
            <Checkbox
              name={name}
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
