import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

import { Control, FieldValues, Path } from "react-hook-form";

interface FormOTPInputProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  slotCount?: number; // default to 6
  className?: string;
  slotClassName?: string;
}

export default function FormOTPInput<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  slotCount = 6,
  className,
  slotClassName,
}: FormOTPInputProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-center space-y-4">
          {label && <FormLabel className="text-center">{label}</FormLabel>}
          <FormControl>
            <InputOTP
              maxLength={slotCount}
              value={field.value}
              onChange={field.onChange}
              className={className}
            >
              <InputOTPGroup>
                {Array.from({ length: slotCount }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={slotClassName || "h-12 w-12 text-lg"}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
