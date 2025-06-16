"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import useDeleteHomework from "@/hooks/homeworks/useDeleteHomework";
function DeleteHomework({ homeworkId }: { homeworkId: string }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { mutate } = useDeleteHomework(homeworkId);

  return (
    <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="ml-1 h-4 w-4" />
          حذف
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-white [&>button:last-child]:hidden">
        <DialogHeader dir="rtl" className="text-right">
          <DialogTitle className="text-center">هل أنت متأكد؟</DialogTitle>
          <DialogDescription className="text-center">
            سيتم حذف نهائيًا ولا يمكن التراجع عن هذه العملية.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center! gap-2">
          <Button
            variant="destructive"
            onClick={() => {
              mutate();
              setOpenConfirm(false);
            }}
          >
            احذف
          </Button>
          <Button variant="outline" onClick={() => setOpenConfirm(false)}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteHomework;
