import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TLessonStatus } from "@/types/lessons";

interface LessonFilterProps {
  selectedStatus: TLessonStatus | "all";
  setSelectedStatus: (value: TLessonStatus | "all") => void;
}

const status = {
  Upcoming: "قادمة",
  Completed: "انتهت",
  Canceled: "ملغية",
};

function LessonFilter({
  selectedStatus,
  setSelectedStatus,
}: LessonFilterProps) {
  return (
    <>
      <Select
        value={selectedStatus}
        onValueChange={setSelectedStatus}
        dir="rtl"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="تصفية حسب الصف" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع الصفوف</SelectItem>
          {Object.entries(status).map(([key, value]) => (
            <SelectItem key={key} value={key as TLessonStatus}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default LessonFilter;
