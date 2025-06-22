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
import SubmissionList from "./SubmissionList";
import DeleteHomework from "./DeleteHomework";
import RoleGuard from "@/components/RoleGuard";
import HomeworkSubmit from "./HomeworkSubmit";
import { HomeworkDetailsTab } from "./HomeworkDetailsTab";

interface HomeworkDetailsProps {
  homework: IHomework;
}

function HomeworkDetails({ homework }: HomeworkDetailsProps) {
  const { formattedDate, status, formattedTime } = formatDate(
    homework.deadline,
  );

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
                  <TabsContent value="details">
                    <HomeworkDetailsTab
                      formattedDate={formattedDate}
                      status={status}
                      homework={homework}
                      formattedTime={formattedTime}
                    />
                  </TabsContent>
                  <TabsContent value="submissions">
                    <SubmissionList homeworkId={homework.homeWorkId} />
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
