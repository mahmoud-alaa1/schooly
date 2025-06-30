"use client";
import React from "react";
import { Button } from "../ui/button";
import { NotebookText } from "lucide-react";
import { Box, BoxBody, BoxHeader } from "../Box";
import Link from "next/link";
import { HOMEWORKS_PER_PAGE } from "@/lib/constants";
import HomeworksSkeleton from "./HomeworksSkeleton";
import HomeworkItem from "./HomeworkItem";
import useGetAllHomeworks from "@/hooks/homeworks/useGetAllHomeworks";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeworksList() {
  const { data, isLoading, isError } = useGetAllHomeworks();
  const homeworks = data?.pages.flatMap((data) => data.data);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box>
        <motion.div variants={headerVariants}>
          <BoxHeader>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <NotebookText size={18} />
              </motion.div>
              <motion.h3
                className="font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                الواجبات
              </motion.h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Link href="/homeworks">
                <Button
                  variant="link"
                  className="p-0 transition-transform duration-200 hover:scale-105"
                >
                  الكل
                </Button>
              </Link>
            </motion.div>
          </BoxHeader>
        </motion.div>

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
                حدث خطأ أثناء تحميل الواجبات.
              </motion.p>
            ) : homeworks?.length === 0 && !isLoading ? (
              <motion.p
                className="text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                لا توجد واجبات
              </motion.p>
            ) : (
              <motion.ul
                className="list-none"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {homeworks
                    ?.slice(0, HOMEWORKS_PER_PAGE)
                    .map((homework, index) => (
                      <motion.div
                        key={`${homework?.homeWorkId}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <HomeworkItem homework={homework} />
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
                {Array.from({ length: HOMEWORKS_PER_PAGE }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <HomeworksSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </BoxBody>
      </Box>
    </motion.div>
  );
}
