"use client";

import { FileText } from "lucide-react";
import SideCard from "../SideCard";
import HomeworkSkeleton from "./HomeworkSkeleton";
import HomeworkItem from "./HomeworkItem";
import useFile from "@/hooks/useFile";

function Homework() {
  const { data, error, isLoading } = useFile();
  const pdfFiles =
    data?.filter((file) => file.contentType === "application/pdf") || [];
  return (
    <>
      {isLoading ? (
        <HomeworkSkeleton />
      ) : (
        <SideCard
          items={pdfFiles}
          cardTitle="الواجبات"
          CardIcon={<FileText className="size-5" />}
          renderItem={(item) => <HomeworkItem key={item?.id} item={item} />}
        />
      )}
    </>
  );
}

export default Homework;
