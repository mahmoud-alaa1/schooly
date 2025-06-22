"use client";
import { useEffect, useState } from "react";
import LessonHeader from "./LessonHeader";
import useGetUserClassrooms from "@/hooks/classrooms/useGetUserClassrooms";
import { useRouter, useSearchParams } from "next/navigation";
import LessonFilters from "./LessonFilters";
import useGetAllLessons from "@/hooks/lessons/useGetAllLessons";
import { TLessonStatus } from "@/types/lessons";
import LessonList from "./LessonList";
import Error from "../Error";

function Lessons() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedClass, setSelectedClass] = useState(
    searchParams.get("classroom") || "all",
  );
  const [selectedStatus, setselectedStatus] = useState<TLessonStatus | "all">(
    (searchParams.get("status") as TLessonStatus) || "all",
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    data: classrooms,
    isLoading,
    isError: isClassroomError,
  } = useGetUserClassrooms();
  const {
    data,
    isError: isLessonError,
    ref,
    isFetching,
  } = useGetAllLessons(
    selectedClass === "all" ? undefined : selectedClass,
    selectedStatus === "all" ? undefined : selectedStatus,
  );
  const lessons = data?.pages.flatMap((data) => data.data);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("classroom", selectedClass);
    params.set("status", selectedStatus);

    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(newUrl, { scroll: false });
  }, [selectedClass, selectedStatus, router]);

  if (isClassroomError || isLessonError) {
    return <Error />;
  }

  return (
    <div className="bg-gray-50 p-6" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-6">
        <LessonHeader
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />

        <LessonFilters
          classrooms={classrooms?.data}
          isLoading={isLoading}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedStatus={selectedStatus}
          setSelectedStatus={setselectedStatus}
        />

        <LessonList lessons={lessons} ref={ref} isFetching={isFetching} />
      </div>
    </div>
  );
}

export default Lessons;
