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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  Users,
  Calendar,
  FileText,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import useGetSubmittedStudents from "@/hooks/homeworks/useGetSubmittedStudents";
import { HomeworkInfo } from "./HomeworkInfo";
import { HomeworkDetailsTab } from "./HomeworkDetailsTab";
import { SubmissionsRow } from "./SubmissionsRow";
import SubmissionList from "./SubmissionList";
import { deleteHomework } from "@/services/homeworksServices";
import { toast } from "sonner";
import DeleteHomework from "./DeleteHomework";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          نشط
        </Badge>
      );
    case "completed":
      return <Badge variant="secondary">مكتمل</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getSubmissionStatusIcon = (status: string) => {
  switch (status) {
    case "submitted":
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case "graded":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

const getSubmissionStatusText = (status: string) => {
  switch (status) {
    case "submitted":
      return "مُرسل";
    case "graded":
      return "مُقيم";
    case "pending":
      return "في الانتظار";
    default:
      return "غير مُرسل";
  }
};

const submissions = [
  {
    id: 1,
    studentName: "فرانك جونز",
    submittedAt: "2024-01-18 08:45",
    status: "graded",
    grade: "ج",
  },
  {
    id: 2,
    studentName: "بوب سميث",
    submittedAt: "2024-01-16 09:15",
    status: "graded",
    grade: "أ-",
  },
  {
    id: 3,
    studentName: "فرانك جونز",
    submittedAt: "2024-01-18 08:45",
    status: "graded",
    grade: "ج",
  },
  {
    id: 4,
    studentName: "ديفيد براون",
    submittedAt: "2024-01-17 11:00",
    status: "submitted",
    grade: "ب+",
  },
  {
    id: 63,
    studentName: "فرانك جونز",
    submittedAt: "2024-01-18 08:45",
    status: "graded",
    grade: "ج",
  },
  {
    id: 6,
    studentName: "فرانك جونز",
    submittedAt: "2024-01-18 08:45",
    status: "graded",
    grade: "ج",
  },
  // {
  //   id: 62,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  // {
  //   id: 60,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },

  // {
  //   id: 8,
  //   studentName: "إيفا ويلسون",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "not_submitted",
  //   grade: "g",
  // },
  // {
  //   id: 9,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  // {
  //   id: 9,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  // {
  //   id: 9,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  // {
  //   id: 9,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  // {
  //   id: 9,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  // {
  //   id: 9,
  //   studentName: "فرانك جونز",
  //   submittedAt: "2024-01-18 08:45",
  //   status: "graded",
  //   grade: "ج",
  // },
  ,
];

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
                <DialogDescription>تفاصيل الواجب والتسليمات</DialogDescription>
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
      </div>
    </div>
  );
}

export default HomeworkDetails;
