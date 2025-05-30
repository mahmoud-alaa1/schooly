import { Box, BoxBody, BoxHeader } from "../Box";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <Box dir="rtl">
      <BoxHeader className="bg-[#FAFAFA]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
        </div>
      </BoxHeader>
      <BoxBody className="flex flex-col gap-4 border-b py-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-4 w-20" />
      </BoxBody>
      <BoxBody className="flex flex-col gap-4">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="size-12 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </BoxBody>
    </Box>
  );
}
