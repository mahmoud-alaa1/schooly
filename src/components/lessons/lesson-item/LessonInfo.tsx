"use client";
import { ILesson } from "@/types/lessons";
import React from "react";
import { BookOpen, Calendar, Clock, Edit, Trash2, Users } from "lucide-react";
import { arEG } from "date-fns/locale";
import {
  addDays,
  differenceInMinutes,
  formatDate,
  isBefore,
  parse,
  parseISO,
} from "date-fns";
import { ELessonType } from "@/types/enums";

import { Button } from "@/components/ui/button";
import RoleGuard from "@/components/RoleGuard";
import EditLesson from "../actions/EditLesson";
import DeleteLesson from "../actions/DeleteLesson";

const statusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-blue-100 text-blue-800";
    case 1:
      return "bg-gray-100 text-gray-800";
    case 2:
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

const statusText = (status: number) => {
  switch (status) {
    case 0:
      return "قادمة";
    case 1:
      return "ملغية";
    case 2:
      return "انتهت";
    default:
      return "";
  }
};

const lessonTypeText = (type: ELessonType) => {
  switch (type) {
    case ELessonType.Explain:
      return "محاضرة";
    case ELessonType.HomeworkSolution:
      return "حل واجب";
    case ELessonType.Practice:
      return "تدريب";
    case ELessonType.Revision:
      return "مراجعة";
    default:
      return "غير محدد";
  }
};

interface ILessonInfoProps {
  lesson: ILesson;
}

function LessonInfo({ lesson }: ILessonInfoProps) {
  const fromDateTime = parseISO(`${lesson.date}T${lesson.from}`);
  let toDateTime = parseISO(`${lesson.date}T${lesson.to}`);

  if (!isBefore(fromDateTime, toDateTime)) {
    toDateTime = addDays(toDateTime, 1);
  }
  const durationMinutes = differenceInMinutes(toDateTime, fromDateTime);

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return (
    <div className="flex-1">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-xl font-semibold">{lesson.subject}</h3>
            <span
              className={`rounded px-2 py-1 text-xs ${statusColor(lesson.status)}`}
            >
              {statusText(lesson.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Dr.{lesson.teacherName}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{lesson.grade}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="flex flex-col gap-1 space-x-1">
                <span>
                  {formatDate(lesson.date, "dd MMMM yyyy", {
                    locale: arEG,
                  })}
                </span>
                <span>
                  الساعة{" "}
                  {formatDate(
                    parse(lesson.from, "HH:mm:ss", new Date()),
                    "HH:MM a",
                    {
                      locale: arEG,
                    },
                  )}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {hours > 0 ? `${hours} س` : ""}{" "}
                {minutes > 0 ? `${minutes} د` : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">نوع الحصة:</span>
              {lessonTypeText(String(lesson.lessonType) as ELessonType)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {lesson.status === 0 && (
            <RoleGuard role="TEACHER">
              <EditLesson lesson={lesson} />
            </RoleGuard>
          )}
          <RoleGuard role="TEACHER">
            <DeleteLesson lessonId={lesson.id} />
          </RoleGuard>
        </div>
      </div>
    </div>
  );
}

export default LessonInfo;
