"use client";

import { useEffect, useState } from "react";

import useGetAllHomeworks from "@/hooks/homeworks/useGetAllHomeworks";
import useGetUserClassrooms from "@/hooks/classrooms/useGetUserClassrooms";
import HomeworkList from "./HomeworkList";
import HomeworkFilter from "./HomeworkFilter";
import { useRouter, useSearchParams } from "next/navigation";
import HomeworkHeader from "./HomeworkHeader";
import Error from "@/components/Error";

export default function Homework() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedClass, setSelectedClass] = useState(
    searchParams.get("classroom") || "all",
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data, isError, ref, isFetching } = useGetAllHomeworks(
    selectedClass === "all" ? undefined : selectedClass,
  );
  const {
    data: classrooms,
    isLoading,
    isError: isGetUserClassroomsError,
  } = useGetUserClassrooms();
  const homeworks = data?.pages.flatMap((data) => data.data);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("classroom", selectedClass);

    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(newUrl, { scroll: false });
  }, [selectedClass, router]);

  if (isError || isGetUserClassroomsError) {
    return <Error />;
  }

  return (
    <div className="bg-gray-50 p-6" dir="rtl">
      <div className="mx-auto max-w-7xl space-y-6">
        <HomeworkHeader
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />

        <HomeworkFilter
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classrooms={classrooms?.data}
          isLoading={isLoading}
        />

        <HomeworkList homeworks={homeworks} isFetching={isFetching} ref={ref} />
      </div>
    </div>
  );
}
