import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useInfinite from "@/hooks/useInfinite";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface InfiniteSelectProps<T> {
  queryKey: string[];
  fetchFn: (pageNumber: number) => Promise<IPaginatedResponse<T>>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string | number;
  additionalParams?: Record<string, any>;
}

export default function InfiniteSelect<T>({
  queryKey,
  fetchFn,
  value,
  onChange,
  placeholder,
  className,
  disabled,
  required,
  getOptionLabel,
  getOptionValue,
  additionalParams,
}: InfiniteSelectProps<T>) {
  const { data, isFetching, ref } = useInfinite<T>({
    queryKey,
    fetchFn: (pageNumber) => fetchFn(pageNumber),
  });

  const options = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <Select
      value={value?.toString()}
      onValueChange={onChange}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem
            key={getOptionValue(item).toString()}
            value={getOptionValue(item).toString()}
          >
            {getOptionLabel(item)}
          </SelectItem>
        ))}
        {isFetching && (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <div ref={ref} className="h-1" />
      </SelectContent>
    </Select>
  );
}
