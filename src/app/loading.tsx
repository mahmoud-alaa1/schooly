import React from "react";
import { RiGraduationCapLine } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative inline-block">
        <div className="pulse-ring"></div>

        <div className="bg-[#02D496] rounded-full p-6">
          <RiGraduationCapLine className=" size-10 text-[#E6FBF5]" />
        </div>
      </div>
    </div>
  );
}
