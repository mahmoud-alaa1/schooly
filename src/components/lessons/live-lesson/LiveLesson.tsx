"use client";
import { Box, BoxHeader } from "@/components/Box";
import { useLiveLesson } from "@/hooks/useLiveLesson";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box>
        <BoxHeader className="flex flex-col justify-between gap-2">
          <LiveLessonHeader lesson={lesson} />
          <JoinSessionActions
            onJoinSession={() => setIsVerificationOpen(true)}
          />
        </BoxHeader>
        <AnimatePresence>
          {isVerificationOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Verification
                open={isVerificationOpen}
                onClose={() => setIsVerificationOpen(false)}
                lessonId={lesson.id}
                classroomId={lesson.classRoomId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
}

export default LiveLesson;
