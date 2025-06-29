import React from "react";
import { Label } from "@/components/ui/label";
import { HomeworkStatusBadge } from "./HomeworkStatusBadge";
import { motion } from "framer-motion";

interface HomeworkDetailsTabProps {
  homework: IHomework;
  formattedDate: string;
  formattedTime: string;
  status: string;
}

export const HomeworkDetailsTab: React.FC<HomeworkDetailsTabProps> = ({
  homework,
  formattedDate,
  formattedTime,
  status,
}) => {
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="h-72 space-y-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label className="text-muted-foreground text-sm font-medium">
              المادة
            </Label>
            <p className="text-base font-semibold">{homework.subjectName}</p>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label className="text-muted-foreground text-sm font-medium">
              الصف
            </Label>
            <p className="text-base font-semibold">{homework.grade}</p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label className="text-muted-foreground text-sm font-medium">
              اخر موعد للتسليم
            </Label>
            <p className="text-base font-semibold">{formattedDate}</p>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label className="text-muted-foreground text-sm font-medium">
              الساعة
            </Label>
            <p className="text-base font-semibold">{formattedTime}</p>
          </motion.div>
        </div>
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label className="text-muted-foreground text-sm font-medium">
            الحالة
          </Label>
          <HomeworkStatusBadge status={status} />
        </motion.div>
      </div>
    </motion.div>
  );
};
