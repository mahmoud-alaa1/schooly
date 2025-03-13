import { TLesson } from "@/types/lessons";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { getUpcomingLessonsBadgeText } from "@/lib/utils";

export default function Lesson({ lesson }: { lesson: TLesson }) {
  const { date, from, grade, subject, title, to } = lesson;
  const { text, variant } = getUpcomingLessonsBadgeText(date, from, to);
  return (
    <li className="mb-3 min-h-20 grid grid-cols-[auto_3fr_auto] gap-x-3 border-b border-b-neutral-200 pt-2 pb-4 last-of-type:border-none last-of-type:mb-0">
      <Image height={52} width={52} src={`/physics.webp`} alt={subject} />
      <div>
        <h3 className="text-[#00000073]">
          {subject} / {grade}
        </h3>
        <h4>{title}</h4>
      </div>
      <Badge variant={variant} className="w-fit h-fit">
        {text}
      </Badge>
    </li>
  );
}
