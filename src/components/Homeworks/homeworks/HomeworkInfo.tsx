import React from "react";
import { GraduationCap, Users, Calendar, FileText } from "lucide-react";
import { HomeworkStatusBadge } from "./HomeworkStatusBadge";

interface HomeworkInfoProps {
  homework: IHomework;
  formattedDate: string;
  status: string;
}

export const HomeworkInfo: React.FC<HomeworkInfoProps> = ({
  homework,
  formattedDate,
  status,
}) => {
  return (
    <div className="flex-1">
      <div className="mb-2 flex items-center gap-3">
        <h3 className="text-lg font-semibold">{homework.lessonTitle}</h3>
        <HomeworkStatusBadge status={status} />
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <GraduationCap className="h-4 w-4" />
          {homework.subjectName}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {homework.grade}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          التسليم: {formattedDate}
        </span>
      </div>
    </div>
  );
};
