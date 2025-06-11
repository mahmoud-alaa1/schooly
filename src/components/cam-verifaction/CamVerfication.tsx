"use client";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import CamInput from "./CamInput";
import { useState } from "react";
import useVerifyFace from "@/hooks/authentication/useVerifyFace";
import { base64ToBlob } from "@/lib/utils";
import CamVerficationLoading from "./CamVerficationLoading";
import CamVerficationError from "./CamVerficationError";
import CamVerficationSuccess from "./CamVerficationSuccess";

interface CamVerficationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CamVerfication({ open, setOpen }: CamVerficationProps) {
  const [image, setImage] = useState<string>("");

  const { mutate, isPending, isError, isSuccess, reset } = useVerifyFace();

  function onSubmit(image: string) {
    const imageBlob = base64ToBlob(image);
    const formData = new FormData();
    formData.append("image", imageBlob);
    mutate(formData, {
      onSuccess: () => {
        console.log("Form submitted successfully");
      },
      onError: (error) => {
        console.log("Error submitting form:", error);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white p-0 [&>button:last-child]:hidden"
        dir="rtl"
      >
        <div className="border-b-2">
          <DialogHeader className="p-4">
            <DialogTitle className="text-right">نموذج تحقيق الهوية</DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 left-4 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>
        </div>
        {isPending ? (
          <CamVerficationLoading />
        ) : isError ? (
          <CamVerficationError />
        ) : isSuccess ? (
          <CamVerficationSuccess />
        ) : (
          <CamInput onCapture={setImage} />
        )}

        <DialogFooter className="flex justify-end gap-2 border-t-2 p-4">
          <Button
            variant="outline"
            onClick={() => {
              setImage("");
              setOpen(false);
            }}
            className="border-2"
          >
            الغاء
          </Button>
          <Button
            variant="outline"
            type="submit"
            className="border-2"
            onClick={() => onSubmit(image)}
            disabled={isPending || isError || !image}
          >
            موافق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CamVerfication;
