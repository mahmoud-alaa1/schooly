import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";
import { AutosizeTextarea } from "../ui/AutoResizeTextarea";

interface FormInputProps<TFormValues extends FieldValues>
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "defaultValue"
  > {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  onEnterSubmit?: () => void;
}

export default function FormTextArea<TFormValues extends FieldValues>({
  control,
  label,
  name,
  rightComponent,
  leftComponent,
  description,
  className,
  onEnterSubmit,
  ...inputProps
}: FormInputProps<TFormValues>) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift+Enter: Add new line
        return;
      } else if (isMobile) {
        // On mobile: Always add new line
        return;
      } else {
        // On desktop: Submit
        e.preventDefault();
        onEnterSubmit?.();
      }
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              {rightComponent && (
                <div className="absolute top-2 right-2">{rightComponent}</div>
              )}
              {leftComponent && (
                <div className="absolute bottom-4 left-2">{leftComponent}</div>
              )}
              <AutosizeTextarea
                id={name}
                {...inputProps}
                {...field}
                onKeyDown={handleKeyDown}
                className={`${rightComponent ? "pr-10" : ""} ${
                  leftComponent ? "pl-10" : ""
                } ${className || ""}`}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
