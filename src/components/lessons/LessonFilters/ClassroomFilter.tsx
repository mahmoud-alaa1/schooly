import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClassroomFilterProps {
  classrooms: IClassroom[] | undefined;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
}

function ClassroomFilter({
  classrooms,
  selectedClass,
  setSelectedClass,
}: ClassroomFilterProps) {
  return (
    <>
      {classrooms && classrooms.length > 0 && (
        <Select
          value={selectedClass}
          onValueChange={setSelectedClass}
          dir="rtl"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="تصفية حسب الصف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الصفوف</SelectItem>
            {classrooms.map((classroom: IClassroom) => (
              <SelectItem key={classroom.id} value={classroom.id}>
                {classroom.grade} - {classroom.subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
}

export default ClassroomFilter;
