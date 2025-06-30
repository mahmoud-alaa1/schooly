import SubmitOneHomework from "@/components/create-new/SubmitOneHomework";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle } from "lucide-react";
interface HomeworkSubmitProps {
  homework: IHomework;
}

import { useState } from "react";
import { formatDate } from "@/lib/utils";

function HomeworkSubmit({ homework }: HomeworkSubmitProps) {
  const [open, setOpen] = useState(false);
  const { formattedDate, status } = formatDate(homework.deadline);

  return status === "active" ? (
    homework.isSubmitted ? (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle className="h-4 w-4" />
          تم تسليم الواجب
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              تسليم الواجب مرة أخرى
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>تسليم الواجب</DialogTitle>
              <DialogDescription>
                تسليم الواجب {homework.lessonTitle} قبل الموعد النهائي:{" "}
                {formattedDate}
              </DialogDescription>
            </DialogHeader>
            <SubmitOneHomework
              homeWorkId={homework.homeWorkId}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
    ) : (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            تسليم الواجب
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>تسليم الواجب</DialogTitle>
            <DialogDescription>
              تسليم الواجب {homework.lessonTitle} قبل الموعد النهائي:{" "}
              {formattedDate}
            </DialogDescription>
          </DialogHeader>
          <SubmitOneHomework
            homeWorkId={homework.homeWorkId}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    )
  ) : homework.isSubmitted ? (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-green-500">
        <CheckCircle className="h-4 w-4" />
        تم تسليم الواجب
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2 text-red-500">
      <FileText className="h-4 w-4" />
      انتهى موعد تسليم الواجب
    </div>
  );
}
export default HomeworkSubmit;
