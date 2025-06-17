"use client";
import React from "react";
import { Button } from "../ui/button";
import { NotebookText } from "lucide-react";
import { Box, BoxBody, BoxHeader } from "../Box";
import Link from "next/link";
import { HOMEWORKS_PER_PAGE } from "@/lib/constants";
import HomeworksSkeleton from "./HomeworksSkeleton";
import HomeworkItem from "./HomeworkItem";
import useGetAllHomeworks from "@/hooks/homeworks/useGetAllHomeworks";
export default function HomeworksList() {
  const { data, isLoading, isError } = useGetAllHomeworks();
  const homeworks = data?.pages.flatMap((data) => data.data);
  return (
    <Box>
      <BoxHeader>
        <div className="flex items-center gap-2">
          <NotebookText size={18} />
          <h3 className="font-medium">الواجبات</h3>
        </div>
        <Link href="/homeworks">
          <Button variant="link" className="p-0">
            الكل
          </Button>
        </Link>
      </BoxHeader>
      <BoxBody>
        {isError ? (
          <p className="text-red-500">حدث خطأ أثناء تحميل الواجبات.</p>
        ) : homeworks?.length === 0 && !isLoading ? (
          <p className="text-gray-500">لا توجد واجبات</p>
        ) : (
          <ul className="list-none">
            {homeworks
              ?.slice(0, HOMEWORKS_PER_PAGE)
              .map((homework) => (
                <HomeworkItem
                  key={`${homework?.homeWorkId}`}
                  homework={homework}
                />
              ))}
          </ul>
        )}

        {isLoading && (
          <>
            {Array.from({ length: HOMEWORKS_PER_PAGE }).map((_, i) => (
              <HomeworksSkeleton key={i} />
            ))}
          </>
        )}
      </BoxBody>
    </Box>
  );
}
