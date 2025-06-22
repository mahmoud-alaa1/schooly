import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import ClassroomFilter from "./LessonFilters/ClassroomFilter";
import LessonFilter from "./LessonFilters/LessonFilter";
import { TLessonStatus } from "@/types/lessons";

interface LessonFilterssProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  classrooms: IClassroom[] | undefined;
  selectedStatus: TLessonStatus | "all";
  setSelectedStatus: (value: TLessonStatus | "all") => void;
  isLoading: boolean;
}

export default function LessonFilters({
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
  classrooms,
  isLoading,
}: LessonFilterssProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تصفية الحصص</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          {classrooms && classrooms.length === 0 && !isLoading ? (
            <div className="flex-1">
              <Label>لا توجد صفوف متاحة</Label>
            </div>
          ) : (
            <>
              <ClassroomFilter
                classrooms={classrooms}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
              />
              <LessonFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
