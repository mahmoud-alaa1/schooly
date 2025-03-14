import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="bg-primary-foreground rounded">
      <div className="flex gap-4 p-6 border-b-neutral-100 border-b-2 flex-col">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-full bg-primary/30" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-5 rounded bg-primary/30" />

              <Skeleton className="w-20 h-5 rounded bg-primary/30" />
            </div>
          </div>
        </div>
        <div>
          <Skeleton className="w-full h-10 rounded bg-primary/30" />
        </div>
        <div>
          <Skeleton className="w-20 h-5 rounded bg-primary/30" />
        </div>
      </div>

      <div className="flex flex-col gap-7 py-3 px-6 pb-12 ">
        <div className=" flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-full bg-primary/30" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-5 rounded bg-primary/30" />
              <Skeleton className="w-96 h-5 rounded bg-primary/30" />
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-full bg-primary/30" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-5 rounded bg-primary/30" />
              <Skeleton className="w-96 h-5 rounded bg-primary/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
