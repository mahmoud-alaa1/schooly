import useGetSubmittedStudents from "@/hooks/homeworks/useGetSubmittedStudents";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubmissionsRow } from "./SubmissionsRow";
import SubmissionRowSkeleton from "./SubmissionRowSkeleton";

interface SubmissionListProps {
  homeworkId: string;
}

function SubmissionList({ homeworkId }: SubmissionListProps) {
  const { data, isFetching, ref } = useGetSubmittedStudents(homeworkId);
  const submissions = data?.pages.flatMap((data) => data.data);

  return (
    <div className="scrollbar-hide h-72 overflow-auto">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الطالب</TableHead>
            <TableHead className="text-right">تاريخ التسليم</TableHead>
            <TableHead className="text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions &&
            submissions.length > 0 &&
            submissions.map((submission, index) => (
              <TableRow
                key={submission.studentId}
                ref={index === submissions.length - 1 ? ref : undefined}
              >
                <SubmissionsRow submission={submission} />
              </TableRow>
            ))}

          {isFetching && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <SubmissionRowSkeleton key={i} />
              ))}
            </>
          )}
          {submissions?.length === 0 && !isFetching && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                لا توجد تسليمات حتى الآن
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SubmissionList;
