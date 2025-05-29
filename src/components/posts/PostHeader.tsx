import useGetSingleClassroom from "@/hooks/classrooms/useGetSingleClassroom";
import React from "react";

export default function PostHeader({ classroomId }: { classroomId: string }) {
  const { data: classroom } = useGetSingleClassroom(classroomId);
  return (
    <div dir="rtl" className="rounded-lg font-medium">
      <span className="text-muted-foreground">
        {" "}
        {classroom?.data.grade}&nbsp;
      </span>
      &nbsp; / &nbsp; &nbsp;{classroom?.data.subject}
    </div>
  );
}
