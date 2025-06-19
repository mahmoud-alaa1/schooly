import { Box, BoxBody } from "../Box";
import { Skeleton } from "../ui/skeleton";

export default function LiveRoomHeaderSkeleton() {
  return (
    <Box className="mb-3 grid grid-cols-1 items-center md:grid-cols-[auto_1fr]">
      <BoxBody className="sm:border-e sm:p-6!">
        <div>
          <Skeleton className="h-6 w-16 rounded-full py-2" />
        </div>
      </BoxBody>
      <BoxBody className="sm:p-6!">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="w-full text-sm sm:text-base">
            <Skeleton className="mb-2 h-6 w-40" />
            <div className="flex gap-6 text-neutral-500">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      </BoxBody>
    </Box>
  );
}
