import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
import FormInput from "./FormInput";
import { InputHTMLAttributes } from "react";

interface FormPasswordProps<TFormValues extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "defaultValue" | "type"
  > {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
}

export default function FormPassword<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  ...inputProps
}: FormPasswordProps<TFormValues>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      control={control}
      name={name}
      label={label}
      description={description}
      type={showPassword ? "text" : "password"}
      className={className}
      {...inputProps}
      Icon={
        <Button
          variant="link"
          className="text-muted-foreground w-fit cursor-pointer"
          size="icon"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
      }
    />
  );
}
