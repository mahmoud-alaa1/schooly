"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { TFile } from "@/types/file";
import useToken from "@/hooks/useToken";
import DownloadFile from "./DownloadFile";

function HomeworkItem({ item }: { item: TFile }) {
  const token = useToken();

  return (
    <li className="mb-1 min-h-20 grid grid-cols-[auto_3fr_auto] gap-x-3 border-b border-b-neutral-200 pt-2 pb-3 last-of-type:border-none last-of-type:mb-0 items-center">
      <Image
        height={50}
        width={50}
        src={`/homeworkFile.svg`}
        quality={75}
        alt={item.fileName}
      />
      <div>
        <h3>{item.fileName}</h3>
        <span className="text-[#00000073] text-sm">
          الدرس الخامس: الضرب الإتجاهي والقياسي
        </span>
      </div>
      <DownloadFile
        storedFileName={item.storedFileName}
        token={token}
        fileName={item.fileName}
      />
    </li>
  );
}

export default HomeworkItem;
