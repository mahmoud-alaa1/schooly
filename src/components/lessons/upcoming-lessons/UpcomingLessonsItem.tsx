import { getSubjectImage, getUpcomingLessonsBadgeText } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "../../ui/badge";
import { ILesson } from "@/types/lessons";

interface UpcomingLessonsItemProps {
  lesson: ILesson;
}

export default function UpcomingLessonsItem({
  lesson,
}: UpcomingLessonsItemProps) {
  const { text, variant } = getUpcomingLessonsBadgeText(
    lesson.date,
    lesson.from,
    lesson.to,
  );

  const { subject } = lesson;

  return (
    <li className="border-[#F0F0F0] py-3 not-last:border-b-1">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="size-16 relative">
              <Image
                src={getSubjectImage(subject)}
                alt="subject logo"
                className="rounded-full"
                fill
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.h4
              className="text-sm text-[#00000073]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {lesson.subject} / {lesson.grade}
            </motion.h4>
            <motion.p
              className="text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {lesson.title}
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge variant={variant} className="h-fit w-fit text-sm">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {text}
            </motion.span>
          </Badge>
        </motion.div>
      </div>
    </li>
  );
}
