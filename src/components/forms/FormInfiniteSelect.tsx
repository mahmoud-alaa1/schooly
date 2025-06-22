import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useInfinite from "@/hooks/useInfinite";
import Spinner from "../Spinner";

interface FormInfiniteSelectProps<TFormValues extends FieldValues, TData> {
  label?: string;
  description?: string;
  labelClassName?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  queryKey: string[];
  fetchFn: (pageNumber: number) => Promise<IPaginatedResponse<TData>>;
  getOptionLabel: (item: TData) => string;
  getOptionValue: (item: TData) => string | number;
  control: Control<TFormValues>;
  name: Path<TFormValues>;
}

export default function FormInfiniteSelect<
  TFormValues extends FieldValues,
  TData,
>({
  control,
  name,
  label,
  description,
  placeholder,
  className,
  labelClassName,
  disabled,
  required,
  queryKey,
  fetchFn,
  getOptionLabel,
  getOptionValue,
  ...props
}: FormInfiniteSelectProps<TFormValues, TData>) {
  const { data, isFetching, ref } = useInfinite<TData>({
    queryKey,
    fetchFn: (pageNumber) => fetchFn(pageNumber),
  });
  console.log("fuck form ", data);

  const options = data?.pages?.flatMap((page) => page.data) ?? [];
  const lastPage = data?.pages[data.pages.length - 1];
  const hasMoreData =
    lastPage && lastPage?.meta?.currentPage < lastPage?.meta?.totalPages;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem dir="rtl">
          {label && (
            <FormLabel htmlFor={name} className={cn("mb-1", labelClassName)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Select
              key={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value?.toString()}
              value={field.value?.toString()}
              disabled={disabled}
              required={required}
              {...props}
            >
              <SelectTrigger
                id={name}
                dir="rtl"
                className={cn("w-full", className)}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent id={name} className="max-h-56" dir="rtl">
                {options.map((item) => (
                  <SelectItem
                    key={getOptionValue(item).toString()}
                    value={getOptionValue(item).toString()}
                  >
                    {getOptionLabel(item)}
                  </SelectItem>
                ))}

                {isFetching && (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                )}

                {!isFetching && !hasMoreData && (
                  <div className="text-muted-foreground py-2 text-center text-sm">
                    لا يوجد المزيد من البيانات
                  </div>
                )}

                <div ref={ref} className="h-0.5" />
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
