"use client";
import { Box, BoxBody } from "../Box";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import useSingleLesson from "@/hooks/lessons/useSingleLesson";
import { formatArabicTime } from "@/lib/utils";
import LiveRoomHeaderSkeleton from "./LiveRoomHeaderSkeleton";
import { lessonTypeMap } from "@/types/enums";

export default function LiveRoomHeader() {
  const { data, isPending } = useSingleLesson();
  if (isPending || !data) {
    return <LiveRoomHeaderSkeleton />;
  }

  return (
    <Box className="mb-3 grid grid-cols-1 items-center md:grid-cols-[auto_1fr]">
      <BoxBody className="! sm:border-e">
        <div>
          <Badge className="rounded-full py-1">
            {lessonTypeMap[data.data.lessonType]}
          </Badge>
        </div>
      </BoxBody>
      <BoxBody className="">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm sm:text-base">
            <h1 className="mb-2">
              {data?.data.title + ` - ` + data?.data.subject}
            </h1>
            <div className="flex gap-6 text-neutral-500">
              <div className="flex items-center gap-2">
                <Calendar size={24} />
                <span>{data?.data.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={24} />
                <span> {formatArabicTime(data?.data.from ?? "")}</span>
              </div>
            </div>
          </div>
        </div>
      </BoxBody>
    </Box>
  );
}
