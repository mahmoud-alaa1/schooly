"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function DeleteHomework({ homeworkId }: { homeworkId: string }) {
  const deleteHomework = async (id: string) => {
    try {
      await deleteHomework(id);

      toast.success("تم حذف الواجب بنجاح");
    } catch (error) {
      console.error("Error deleting homework:", error);
      toast.error("حدث خطأ أثناء حذف الواجب");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-red-600 hover:text-red-700"
      onClick={() => deleteHomework(homeworkId)}
    >
      <Trash2 className="ml-1 h-4 w-4" />
      حذف
    </Button>
  );
}

export default DeleteHomework;
