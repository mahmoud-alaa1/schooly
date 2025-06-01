import Image from "next/image";
import HomeworkDownload from "./HomeworkDownload";

interface IHomeworkProps {
  homework: IHomework;
}

export default function HomeworkItem({ homework }: IHomeworkProps) {
  return (
    <li className="border-[#F0F0F0] py-3 not-last:border-b-1">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-3">
          <Image
            src={"/homework.png"}
            width={40}
            height={40}
            alt="subject logo"
          />
          <div>
            <h4 className="text-sm">{homework.fileName}</h4>
            <p className="text-sm text-[#00000073]">{homework.lessonTitle}</p>
          </div>
        </div>
        <HomeworkDownload
          fileName={homework?.fileName}
          fileUrl={homework?.fileUrl}
        />
      </div>
    </li>
  );
}
