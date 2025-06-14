import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FileText, FileIcon, Inbox, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDropzoneStore } from "@/store/dropzone";
import useUpload from "@/hooks/useUpload";
import { useEffect } from "react";

interface DropzoneProps {
  onDrop: (files: File[]) => void;
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  multiple?: boolean;
  className?: string;
}

function Dropzone({
  onDrop,
  accept = { "image/*": [] },
  maxFiles = 1,
  multiple = false,
  className,
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    multiple,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "hover:bg-muted flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-gray-300 bg-[#FAFAFA] px-4 py-10 text-center text-sm transition",
        isDragActive && "bg-accent border-primary border-dashed",
        className,
      )}
    >
      <Inbox size={48} className="text-primary" />
      <div className="space-y-2">
        {isDragActive ? (
          <>
            <p className="text-primary text-base font-medium">
              أفلت الملف هنا للتحميل
            </p>
            <p className="text-muted-foreground text-sm">
              يمكنك إفلات الملف الآن لبدء التحميل
            </p>
          </>
        ) : (
          <>
            <p className="text-base">انقر أو اسحب الملف إلى هذه المنطقة</p>
            <p className="text-muted-foreground text-sm">
              أقصى حجم للملف الواحد هو 9 ميجا بايت
            </p>
          </>
        )}
      </div>
      <input {...getInputProps()} />
    </div>
  );
}

interface FilePreviewProps {
  file: File;
  url: string;
  onRemove: () => void;
  onChange: (value: string) => void;
}

function FilePreview({ file, url, onRemove, onChange }: FilePreviewProps) {
  const { res, progress, isUploading } = useUpload();

  const isImage = file.type?.startsWith("image/");
  const isPDF = file.type === "application/pdf";
  const isDocx =
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  useEffect(() => {
    const handleUpload = () => {
      const formData = new FormData();
      formData.append("formFile", file);
      res.mutate(formData, {
        onSuccess: (data) => {
          onChange(data.data.storedFileName);
        },
      });
    };

    handleUpload();
  }, [file, res, onChange]);

  return (
    <div className="flex items-center justify-between rounded-xl border-2 p-2">
      <div className="flex items-center gap-2">
        <div className="flex size-20 items-center justify-center rounded border">
          {isImage ? (
            <Image
              src={url}
              alt={file.name}
              className="h-full w-full rounded object-cover"
              width={64}
              height={64}
            />
          ) : isPDF ? (
            <FileText className="size-12 text-red-500" />
          ) : isDocx ? (
            <FileIcon className="size-12 text-blue-500" />
          ) : (
            <FileIcon className="size-12 text-gray-500" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-muted-foreground max-w-[150px] truncate text-sm">
            {file.name}
          </p>
          {isUploading && (
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          variant="ghost"
          size="icon"
          disabled={isUploading}
        >
          <Trash size={20} className="text-red-500" />
        </Button>
      </div>
    </div>
  );
}

interface FormDropzoneProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  labelClassName?: string;
  className?: string;
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  multiple?: boolean;
}

export default function FormDropzone<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  labelClassName,
  className,
  accept = {
    "image/*": [],
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  maxFiles = 1,
  multiple = false,
}: FormDropzoneProps<TFormValues>) {
  const { files: storedFiles, setFiles: setStoredFiles } = useDropzoneStore();
  const formFiles = storedFiles[name as string] || [];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange } = field;

        const removeFile = (index: number) => {
          const newFiles = [...formFiles];
          if (newFiles[index]?.url) {
            URL.revokeObjectURL(newFiles[index].url);
          }
          newFiles.splice(index, 1);
          setStoredFiles(name as string, newFiles);

          onChange("");
        };

        const onDrop = (acceptedFiles: File[]) => {
          if (!acceptedFiles.length) return;

          const newFiles = multiple ? acceptedFiles : [acceptedFiles[0]];
          const newUrls = newFiles.map((file) => URL.createObjectURL(file));
          const updatedFiles = multiple
            ? [
                ...formFiles,
                ...newFiles.map((file, i) => ({ file, url: newUrls[i] })),
              ]
            : newFiles.map((file, i) => ({ file, url: newUrls[i] }));

          setStoredFiles(name as string, updatedFiles);
        };

        return (
          <FormItem>
            {label && (
              <FormLabel className={cn("mb-1", labelClassName)}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Dropzone
                onDrop={onDrop}
                accept={accept}
                maxFiles={maxFiles}
                multiple={multiple}
                className={className}
              />
            </FormControl>
            {formFiles.length > 0 && (
              <div
                className={cn("mt-2 grid gap-4", multiple && "sm:grid-cols-2")}
              >
                {formFiles.map((fileData, index) => (
                  <FilePreview
                    key={index}
                    file={fileData.file}
                    url={fileData.url}
                    onRemove={() => removeFile(index)}
                    onChange={onChange}
                  />
                ))}
              </div>
            )}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
