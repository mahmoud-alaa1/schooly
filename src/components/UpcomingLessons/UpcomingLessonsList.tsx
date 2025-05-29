"use client";
import React from "react";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";
import useUpcomingLessons from "@/hooks/lessons/useUpcomingLessons";
import { Box, BoxBody, BoxHeader } from "../Box";
import Link from "next/link";
export default function UpcomingLessonsList() {
  const { data, isLoading, isError } = useUpcomingLessons();
  return (
    <Box>
      <BoxHeader>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <h3 className="font-medium">حصصك القادمة</h3>
        </div>
        <Link href="/table">
          <Button variant="link" className="p-0">
            الكل
          </Button>
        </Link>
      </BoxHeader>
      <BoxBody>test</BoxBody>
    </Box>
  );
}
