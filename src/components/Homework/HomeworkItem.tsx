"use client";

import Image from "next/image";
import React from "react";
import DownloadFile from "./DownloadFile";

function HomeworkItem({ item }: { item: THomework }) {
  return (
    <li className="mb-1 min-h-20 grid grid-cols-[auto_3fr_auto] gap-x-3 border-b border-b-neutral-200 pt-2 pb-3 last-of-type:border-none last-of-type:mb-0 items-center">
      <Image
        height={45}
        width={45}
        src={`/homeworkFile.svg`}
        quality={75}
        alt={item.fileName}
      />
      <div>
        <h3>{item.fileName}</h3>
        <span className="text-[#00000073] text-xs">{item.lessonTitle}</span>
      </div>
      <DownloadFile storedFileName={item.fileUrl} fileName={item.fileName} />
    </li>
  );
}

export default HomeworkItem;
