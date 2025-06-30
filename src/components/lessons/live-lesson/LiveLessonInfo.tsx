"use client";
import { ILesson } from "@/types/lessons";
import { motion } from "framer-motion";
import Image from "next/image";

interface LiveLessonInfoProps {
  lesson: ILesson;
}

const LiveLessonInfo = ({ lesson }: LiveLessonInfoProps) => (
  <motion.div
    className="flex items-center gap-3"
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src="/physics.webp"
        width={60}
        height={60}
        alt="subject logo"
        className="rounded-md"
      />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <motion.h4
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {lesson.subject} / {lesson.grade}
      </motion.h4>
      <motion.p
        className="text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {lesson.title}
      </motion.p>
    </motion.div>
  </motion.div>
);

export default LiveLessonInfo;
