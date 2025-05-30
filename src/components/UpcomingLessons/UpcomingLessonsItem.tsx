import { getUpcomingLessonsBadgeText } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface UpcomingLessonsItemProps {
  lesson: ILesson;
}

export default function UpcomingLessonsItem({
  lesson,
}: UpcomingLessonsItemProps) {
  const { text, variant } = getUpcomingLessonsBadgeText(
    lesson.date,
    lesson.from,
    lesson.to,
  );

  return (
    <li className="border-[#F0F0F0] py-3 not-last:border-b-1">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-3">
          <Image
            src={"/physics.webp"}
            width={60}
            height={60}
            alt="subject logo"
          />
          <div>
            <h4 className="text-sm text-[#00000073]">
              {lesson.subject} / {lesson.grade}
            </h4>
            <p className="text-sm"> {lesson.title}</p>
          </div>
        </div>
        <Badge variant={variant} className="h-fit w-fit text-sm">
          {text}
        </Badge>
      </div>
    </li>
  );
}
