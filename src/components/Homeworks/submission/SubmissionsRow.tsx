import { TableCell } from "@/components/ui/table";

import { formatDate } from "@/lib/utils";
import HomeworkDownload from "../HomeworkDownload";

interface SubmissionsRowProps {
  submission: IStudentSubmitHomework;
}

export const SubmissionsRow: React.FC<SubmissionsRowProps> = ({
  submission,
}) => {
  return (
    <>
      <TableCell className="text-right font-medium">
        {submission.studentName}
      </TableCell>

      <TableCell className="text-right">
        {formatDate(submission.submittedDate).formattedDate || "لم يُرسل"}
      </TableCell>

      <TableCell className="text-right">
        <div>
          <HomeworkDownload
            fileName={submission.fileName}
            fileUrl={submission.fileUrl}
            text="عرض"
          />
        </div>
      </TableCell>
    </>
  );
};
