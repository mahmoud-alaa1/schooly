import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Inbox, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useDropzoneStore } from "@/store/dropzone";
import useUpload from "@/hooks/useUpload";
import { useRef } from "react";

interface FormImageDropzoneProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  labelClassName?: string;
  className?: string;
  defaultImage?: string;
}

export default function FormImageDropzone<TFormValues extends FieldValues>({
  control,
  name,
  label,
  labelClassName,
  className,
  defaultImage = "/person1.png",
}: FormImageDropzoneProps<TFormValues>) {
  const { files: storedFiles, setFiles: setStoredFiles } = useDropzoneStore();
  const formFiles = storedFiles[name as string] || [];
  const { res, progress, isUploading } = useUpload();
  const onChangeRef = useRef<((value: string) => void) | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setStoredFiles(name as string, [{ file, url }]);

      const formData = new FormData();
      formData.append("formFile", file);
      res.mutate(formData, {
        onSuccess: (data) => {
          onChangeRef.current?.(data.data.storedFileName);
        },
      });
    },
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { value } = field;
        onChangeRef.current = field.onChange;

        return (
          <FormItem>
            {label && (
              <FormLabel className={cn("mb-1", labelClassName)}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative inline-block">
                <div
                  {...getRootProps()}
                  className={cn(
                    "relative cursor-pointer",
                    isDragActive && "opacity-50",
                    className,
                  )}
                >
                  <Image
                    src={
                      formFiles[0]?.url ??
                      (value
                        ? `${process.env.NEXT_PUBLIC_API_URL}/upload/${value}`
                        : null) ??
                      defaultImage
                    }
                    alt="صورة الملف الشخصي"
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-neutral-100 bg-orange-300 object-cover shadow-lg"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                    <Inbox size={32} className="text-white" />
                  </div>
                  <input {...getInputProps()} />
                  <Button
                    type="button"
                    className="absolute end-1 bottom-1 size-8 rounded-full"
                    size="icon"
                    disabled={isUploading}
                  >
                    <Pencil size={16} />
                  </Button>
                </div>

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                    <div className="h-2.5 w-16 rounded-full bg-gray-200">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
