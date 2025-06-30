"use client";
import React from "react";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useUpcomingLessons from "@/hooks/lessons/useUpcomingLessons";
import { Box, BoxBody, BoxHeader } from "../../Box";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
import UpcomingLessonsItem from "./UpcomingLessonsItem";
import UpcomingLessonSkeleton from "./UpcomingLessonSkeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpcomingLessonsList() {
  const { data, isLoading, isError } = useUpcomingLessons();
  const lessons = data?.pages.flatMap((page) => page.data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box>
        <BoxHeader>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              <Clock size={18} />
            </motion.div>
            <motion.h3
              className="font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              حصصك القادمة
            </motion.h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Link href="/lessons">
              <Button
                variant="link"
                className="p-0 transition-transform duration-200 hover:scale-105"
              >
                الكل
              </Button>
            </Link>
          </motion.div>
        </BoxHeader>
        <BoxBody>
          <AnimatePresence mode="wait">
            {isError ? (
              <motion.p
                className="text-red-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                حدث خطأ أثناء تحميل الدروس القادمة.
              </motion.p>
            ) : lessons?.length === 0 && !isLoading ? (
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                لا توجد حصص قادمة.
              </motion.p>
            ) : (
              <motion.ul
                className="list-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <AnimatePresence>
                  {lessons?.map((lesson, index) => (
                    <motion.div
                      key={lesson?.id}
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UpcomingLessonsItem lesson={lesson} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from({ length: UPCOMING_LESSONS_PER_PAGE }).map(
                  (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1,
                      }}
                    >
                      <UpcomingLessonSkeleton />
                    </motion.div>
                  ),
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </BoxBody>
      </Box>
    </motion.div>
  );
}
