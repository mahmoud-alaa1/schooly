"use client";
import { Box, BoxHeader } from "@/components/Box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CamVerfication from "@/components/cam-verifaction/CamVerfication";
import Users from "@/components/Users";
import { useLiveLesson } from "@/hooks/useLiveLesson";

import Image from "next/image";
import { useState } from "react";

function LiveLesson() {
  const { isError, lesson } = useLiveLesson();
  const [isOpen, setIsOpen] = useState(false);

  if (isError) {
    return (
      <Box>
        <BoxHeader>
          <p className="text-red-500">حدث خطأ أثناء تحميل الدرس المباشر.</p>
        </BoxHeader>
      </Box>
    );
  }

  // if (!lesson) return null;
  return (
    <Box>
      <BoxHeader className="flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-3">
            <Image
              src={"/physics.webp"}
              width={60}
              height={60}
              alt="subject logo"
            />
            <div>
              <h4 className="text-sm text-[#00000073]">
                {lesson?.subject} / {lesson?.grade}
              </h4>
              <p className="text-sm"> {lesson?.title}</p>
            </div>
          </div>
          <Badge
            variant="red"
            className="h-fit w-fit rounded-full border-none bg-[#FF4D4F] text-white"
          >
            <span className="p-1 text-sm">مباشر</span>
          </Badge>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button className="grow" onClick={() => setIsOpen(true)}>
            انضم للجلسة
          </Button>
          {isOpen ? <CamVerfication open={isOpen} setOpen={setIsOpen} /> : null}

          <Users />
        </div>
      </BoxHeader>
    </Box>
  );
}

export default LiveLesson;
