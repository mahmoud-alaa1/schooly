"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

type ActionsMenuProps = {
  onDelete: () => void;
  onEdit: () => void;
};

export default function ActionsMenu({ onDelete, onEdit }: ActionsMenuProps) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setOpenConfirm(false);
  };

  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setOpenConfirm(true)}
          >
            حذف
          </DropdownMenuItem>
          {onEdit && (
            <DropdownMenuItem onClick={onEdit}>تعديل</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="w-[clamp(300px,90vw,500px)]! bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">هل أنت متأكد؟</DialogTitle>
            <DialogDescription className="text-center">
              سيتم حذف نهائيًا ولا يمكن التراجع عن هذه العملية.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter dir="rtl" className="flex justify-center! gap-2">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              احذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
