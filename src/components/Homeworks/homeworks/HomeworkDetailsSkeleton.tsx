import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function HomeworkDetailsSkeleton() {
  return (
    <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <Skeleton className="text-lg font-semibold" />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </span>
            <span className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </span>
            <span className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </span>
            <span className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-12">
            <Skeleton className="ml-1 h-4 w-4" />
          </Skeleton>
          <Skeleton className="h-8 w-12">
            <Skeleton className="ml-1 h-4 w-4" />
          </Skeleton>
          <Skeleton className="h-8 w-12">
            <Skeleton className="ml-1 h-4 w-4" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}

export default HomeworkDetailsSkeleton;
