import { Skeleton } from "../ui/skeleton";

function UpcomingLessonSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 py-1 not-last:border-b-1">
      <div className="flex grow items-center gap-1">
        <Skeleton className="h-15 w-15" />
        <div className="flex grow flex-col gap-1">
          <Skeleton className="h-5 w-[70%]" />
          <Skeleton className="h-5 w-[70%]" />
        </div>
      </div>
      <Skeleton className="h-8 w-12" />
    </div>
  );
}

export default UpcomingLessonSkeleton;
