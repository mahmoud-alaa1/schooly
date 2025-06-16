import React from "react";
import { Label } from "@/components/ui/label";
import { HomeworkStatusBadge } from "./HomeworkStatusBadge";

interface HomeworkDetailsTabProps {
  homework: IHomework;
  formattedDate: string;
  formattedTime: string;
  status: string;
}

export const HomeworkDetailsTab: React.FC<HomeworkDetailsTabProps> = ({
  homework,
  formattedDate,
  formattedTime,
  status,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="font-semibold">المادة</Label>
          <p>{homework.subjectName}</p>
        </div>
        <div>
          <Label className="font-semibold">الصف</Label>
          <p>{homework.grade}</p>
        </div>
        <div>
          <Label className="font-semibold">اخر موعد للتسليم</Label>
          <p>{formattedDate}</p>
        </div>
        <div>
          <Label className="font-semibold">الساعة</Label>
          <p>{formattedTime}</p>
        </div>
        <div>
          <Label className="font-semibold">الحالة</Label>
          <div className="mt-1">
            <HomeworkStatusBadge status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};
