import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import UpdateSession from "@/components/create-new/UpdateSession";
import { ILesson } from "@/types/lessons";
interface IEditLessonProps {
  lesson: ILesson;
}

function EditLesson({ lesson }: IEditLessonProps) {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Edit className="h-4 w-4" />
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تعديل الحصة</DialogTitle>
          <DialogDescription>تعديل معلومات الحصة</DialogDescription>
        </DialogHeader>
        <UpdateSession lesson={lesson} setIsCreateDialogOpen={setOpenConfirm} />
      </DialogContent>
    </Dialog>
  );
}

export default EditLesson;
