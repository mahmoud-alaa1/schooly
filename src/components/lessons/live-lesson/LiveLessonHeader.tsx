"use client";
import { ILesson } from "@/types/lessons";
import { motion } from "framer-motion";
import LiveBadge from "./LiveBadge";
import LiveLessonInfo from "./LiveLessonInfo";

interface LiveLessonHeaderProps {
  lesson: ILesson;
}

const LiveLessonHeader = ({ lesson }: LiveLessonHeaderProps) => (
  <motion.div
    className="flex items-center justify-between gap-1.5"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
  >
    <LiveLessonInfo lesson={lesson} />
    <LiveBadge />
  </motion.div>
);

export default LiveLessonHeader;
