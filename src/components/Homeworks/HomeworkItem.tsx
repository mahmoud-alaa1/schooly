"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import HomeworkDownload from "./HomeworkDownload";

interface IHomeworkProps {
  homework: IHomework;
}

export default function HomeworkItem({ homework }: IHomeworkProps) {
  return (
    <motion.li
      className="border-[#F0F0F0] py-3 not-last:border-b-1"
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0.02)",
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-1.5">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={"/homework.png"}
              width={40}
              height={40}
              alt="subject logo"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.h4 className="text-sm" transition={{ duration: 0.2 }}>
              {homework.fileName}
            </motion.h4>
            <motion.p
              className="text-sm text-[#00000073]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {homework.lessonTitle}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <HomeworkDownload
            fileName={homework?.fileName}
            fileUrl={homework?.fileUrl}
          />
        </motion.div>
      </div>
    </motion.li>
  );
}
