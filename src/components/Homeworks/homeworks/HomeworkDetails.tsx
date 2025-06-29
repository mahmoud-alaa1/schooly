import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { HomeworkInfo } from "./HomeworkInfo";
import SubmissionList from "../submission/SubmissionList";
import DeleteHomework from "../actions/DeleteHomework";
import RoleGuard from "@/components/RoleGuard";
import HomeworkSubmit from "../actions/HomeworkSubmit";
import { HomeworkDetailsTab } from "./HomeworkDetailsTab";
import { motion, AnimatePresence } from "framer-motion";

interface HomeworkDetailsProps {
  homework: IHomework;
}

function HomeworkDetails({ homework }: HomeworkDetailsProps) {
  const { formattedDate, status, formattedTime } = formatDate(
    homework.deadline,
  );
  const tabVariants = {
    initial: {
      opacity: 0,
      x: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
  };

  const transition = {
    duration: 0.3,
    ease: [0.4, 0.0, 0.2, 1],
  };
  return (
    <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <HomeworkInfo
          formattedDate={formattedDate}
          status={status}
          homework={homework}
        />
        <RoleGuard role="TEACHER">
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Eye className="ml-1 h-4 w-4" />
                  عرض
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-white [&>button:last-child]:hidden">
                <DialogHeader dir="rtl" className="text-right">
                  <DialogTitle>{homework.lessonTitle}</DialogTitle>
                  <DialogDescription>
                    تفاصيل الواجب والتسليمات
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="details" className="w-full" dir="rtl">
                  <TabsList className="mb-2 w-full">
                    <TabsTrigger value="details">التفاصيل</TabsTrigger>
                    <TabsTrigger value="submissions">التسليمات</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="details"
                        variants={tabVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                      >
                        <HomeworkDetailsTab
                          formattedDate={formattedDate}
                          status={status}
                          homework={homework}
                          formattedTime={formattedTime}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                  <TabsContent value="submissions" className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="submissions"
                        variants={tabVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                      >
                        <SubmissionList homeworkId={homework.homeWorkId} />
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <DeleteHomework homeworkId={homework.homeWorkId} />
          </div>
        </RoleGuard>
        <RoleGuard role="STUDENT">
          <HomeworkSubmit homework={homework} />
        </RoleGuard>
      </div>
    </div>
  );
}

export default HomeworkDetails;
