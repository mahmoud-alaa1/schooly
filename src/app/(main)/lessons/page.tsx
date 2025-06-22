"use client";
import Lessons from "@/components/lessons/Lessons";

export default function page() {
  return (
    <main className="p-5">
      <div className="scrollbar-hide h-[calc(100dvh-118px)] gap-5 space-y-5 overflow-auto">
        <Lessons />
      </div>
    </main>
  );
}
