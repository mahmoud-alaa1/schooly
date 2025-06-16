import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeworkFiltersProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  classrooms: any;
  isLoading: boolean;
}

export default function HomeworkFilter({
  selectedClass,
  setSelectedClass,
  classrooms,
  isLoading,
}: HomeworkFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تصفية الواجبات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          {classrooms?.data && classrooms.data.length > 0 && (
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
                {classrooms.data.map((classroom: any) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.grade} - {classroom.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {classrooms?.data && classrooms.data.length === 0 && !isLoading && (
            <div className="flex-1">
              <Label>لا توجد صفوف متاحة</Label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
