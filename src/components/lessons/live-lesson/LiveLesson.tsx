"use client";
import { Box, BoxHeader } from "@/components/Box";
import { useLiveLesson } from "@/hooks/useLiveLesson";

import { useState } from "react";
import LiveLessonError from "./LiveLessonError";
import LiveLessonHeader from "./LiveLessonHeader";
import JoinSessionActions from "./JoinSessionActions";
import Verification from "@/components/cam-verifaction/Verification";

function LiveLesson() {
  const { isError, lesson } = useLiveLesson();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  if (isError) {
    return <LiveLessonError />;
  }

  if (!lesson) return null;
  return (
    <Box>
      <BoxHeader className="flex flex-col justify-between gap-2">
        <LiveLessonHeader lesson={lesson} />
        <JoinSessionActions onJoinSession={() => setIsVerificationOpen(true)} />
      </BoxHeader>
      {isVerificationOpen && (
        <Verification
          open={isVerificationOpen}
          onClose={() => setIsVerificationOpen(false)}
          lessonId={lesson.id}
          classroomId={lesson.classRoomId}
        />
      )}
    </Box>
  );
}

export default LiveLesson;
