"use client";
import React from "react";
import { Button } from "../ui/button";
import { NotebookText } from "lucide-react";
import useUpcomingLessons from "@/hooks/lessons/useUpcomingLessons";
import { Box, BoxBody, BoxHeader } from "../Box";
import Link from "next/link";
export default function HomeworksList() {
  const { data, isLoading, isError } = useUpcomingLessons();
  console.log(data, isLoading, isError);
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
      <BoxBody>test</BoxBody>
    </Box>
  );
}
