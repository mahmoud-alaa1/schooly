"use client";

import Image from "next/image";
import image from "@/assets/classroom-hero.jpg";
import useGetSingleClassroom from "@/hooks/classrooms/useGetSingleClassroom";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClassroomHero() {
  const { data, isPending } = useGetSingleClassroom();
  return (
    <div className="relative flex h-[27.5dvh] w-full overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt="خلفية الفصل"
        fill
        className="absolute z-10 object-cover"
        priority
      />
      <div className="bg-primary/40 absolute inset-0 z-20" />
      <div className="relative z-30 flex h-full w-full flex-col items-start justify-end p-4 text-start text-white">
        {isPending ? (
          <>
            <Skeleton className="h-8 w-48 bg-white/20" />
            <Skeleton className="mt-2 h-6 w-32 bg-white/20" />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-medium">{data?.data.grade}</h1>
            <p className="mt-4 text-lg font-medium">{data?.data.subject}</p>
          </>
        )}
      </div>
    </div>
  );
}
