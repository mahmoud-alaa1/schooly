import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HOMEWORKS_PER_PAGE } from "@/lib/constants";
import React, { forwardRef } from "react";
import HomeworkDetailsSkeleton from "./HomeworkDetailsSkeleton";
import HomeworkDetails from "./HomeworkDetails";

interface HomeworkListProps {
  homeworks: IHomework[] | undefined;
  isFetching: boolean;
  ref: React.RefObject<Element | null>;
}

const HomeworkList = forwardRef<HTMLDivElement, HomeworkListProps>(
  ({ homeworks, isFetching }, ref) => {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>الواجبات</CardTitle>
          <CardDescription>إدارة الواجبات المنزلية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {homeworks?.map((homework, index) => (
              <div
                key={homework?.homeWorkId}
                ref={index === homeworks.length - 1 ? ref : undefined}
              >
                <HomeworkDetails homework={homework} />
              </div>
            ))}

            {isFetching && (
              <>
                {Array.from({ length: HOMEWORKS_PER_PAGE }).map((_, i) => (
                  <HomeworkDetailsSkeleton key={i} />
                ))}
              </>
            )}
            {homeworks?.length === 0 && !isFetching && (
              <div className="flex items-center justify-center rounded-2xl bg-white p-6">
                <p className="text-red-500">لا توجد واجبات لعرضها</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);

HomeworkList.displayName = "HomeworkList";

export default HomeworkList;
