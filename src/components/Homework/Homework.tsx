"use client";

import { FileText } from "lucide-react";
import SideCard from "../SideCard";
import HomeworkSkeleton from "./HomeworkSkeleton";
import HomeworkItem from "./HomeworkItem";
import useHomeworks from "@/hooks/useHomeworks";
import { HOMEWORKS_PAGE_SIZE } from "@/lib/constants";

function Homework() {
  const { data, isLoading, error } = useHomeworks(
    1,
    "e082bf29-033a-4b1f-bdc4-08dd584749a7"
  );
  const HomeworkFiles =
    (data?.data as THomework[]) ||
    Array.from({ length: HOMEWORKS_PAGE_SIZE }).fill(null);
  return (
    <>
      {error ? (
        <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>
      ) : (
        <SideCard
          items={HomeworkFiles}
          cardTitle="الواجبات"
          CardIcon={<FileText className="size-5" />}
          renderItem={(item: THomework, index) =>
            isLoading ? (
              <HomeworkSkeleton key={index} />
            ) : (
              <HomeworkItem key={item?.homeWorkId} item={item} />
            )
          }
        />
      )}
    </>
  );
}

export default Homework;
