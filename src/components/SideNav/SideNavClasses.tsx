"use client";
import { Calculator, FlaskConical, Globe } from "lucide-react";
import React from "react";
import NavLink from "../NavLink";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import useGetAllClassrooms from "@/hooks/classrooms/useGetAllClassrooms";
import { Skeleton } from "../ui/skeleton";

const subjectConfig: Record<string, { icon: React.ReactNode; color: string }> =
  {
    رياضه: { icon: <Calculator size={16} />, color: "#899FE7" },
    عربي: {
      icon: (
        <span className="flex size-2 items-center justify-center p-2">ض</span>
      ),
      color: "#978208",
    },
    علوم: { icon: <FlaskConical size={16} />, color: "#A4CE42" },
    دراسات: { icon: <Globe size={16} />, color: "#CF5A77" },
    Math: { icon: <Calculator size={16} />, color: "#899FE7" },
    English: {
      icon: (
        <span className="flex size-2 items-center justify-center p-2">A</span>
      ),
      color: "#864C8C",
    },
    Arabic: {
      icon: (
        <span className="flex size-2 items-center justify-center p-2">ض</span>
      ),
      color: "#978208",
    },
    // Default fallback
    default: { icon: <Globe size={16} />, color: "#899FE7" },
  };

export default function SideNavClasses() {
  const { data: classrooms, isLoading } = useGetAllClassrooms();

  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="border-b-2 pr-3 pb-3 text-sm font-bold text-[#00000073]">
          فصولي الدراسية
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <li key={index}>
              <div className="flex w-full items-center gap-2 rounded-lg p-1">
                <Skeleton className="h-8 w-8 rounded-full bg-[#c0cdc2]" />
                <Skeleton className="h-4 w-32 bg-[#c0cdc2]" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="border-b-2 pr-3 pb-3 text-sm font-bold text-[#00000073]">
        فصولي الدراسية
      </div>
      <ul className="mt-3 flex flex-col">
        {classrooms?.data?.map((classroom: IClassroom) => {
          const config =
            subjectConfig[classroom.subject] || subjectConfig.default;
          return (
            <li key={classroom.id}>
              <NavLink
                href={`/classrooms/${classroom.id}`}
                className="flex w-full items-center gap-2 rounded-lg p-1 text-sm text-[#00000073]"
                nonActiveClassName="bg-transparent hover:bg-white"
                activeClassName="bg-[#B5F3E0] text-[#017553] font-semibold"
              >
                <Badge
                  style={{ backgroundColor: config.color }}
                  variant="secondary"
                  className={cn(`rounded-full p-2 text-white`)}
                >
                  {config.icon}
                </Badge>
                {classroom.subject} - {classroom.grade}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
