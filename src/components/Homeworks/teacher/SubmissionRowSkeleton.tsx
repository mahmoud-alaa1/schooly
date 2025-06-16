import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

function SubmissionRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="text-right font-medium">
        <Skeleton className="h-4 w-32" />
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="h-4 w-32" />
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="h-4 w-32" />
      </TableCell>
    </TableRow>
  );
}

export default SubmissionRowSkeleton;
