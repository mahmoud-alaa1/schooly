import { TLesson } from "@/types/lessons";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { getUpcomingLessonsBadgeText } from "@/lib/utils";

export default function Lesson({ details }: { details: TLesson }) {
  const { date, from, grade, subject, title, to } = details;
  const { text, variant } = getUpcomingLessonsBadgeText(date, from, to);
  return (
    <li className="mb-3 min-h-20 grid grid-cols-[auto_3fr_auto] gap-x-3 border-b pt-2 pb-4 last-of-type:border-none">
      <Image height={52} width={52} src={`/physics.png`} alt={subject} />
      <article className="">
        <header>
          <h3 className="text-[#00000073]">
            {subject} / {grade}
          </h3>
        </header>
        <p>{title}</p>
      </article>
      <Badge variant={variant} className="w-fit h-fit">
        {text}
      </Badge>
    </li>
  );
}
