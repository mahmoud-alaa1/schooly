import { Skeleton } from "../ui/skeleton";

export default function LessonSkeleton() {
  return (
    <div className="mb-3 min-h-20 grid grid-cols-[auto_3fr_auto] gap-x-3 border-b pt-2 pb-4 last-of-type:border-none last-of-type:mb-0">
      <Skeleton className="h-[52px] w-[52px] " />
      <article>
        <header className="mb-2">
          <h3 className="text-[#00000073]">
            <Skeleton className="h-[12px] w-[200px] " />
          </h3>
        </header>
        <div>
          <Skeleton className="h-[15px] w-[100px] " />
        </div>
      </article>
      <Skeleton className="h-[20px] w-[50px] " />
    </div>
  );
}
