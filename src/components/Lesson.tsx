import { TLesson } from "@/types/lessons";

export default function Lesson({ details }: { details: TLesson }) {
  const { date, from, grade, subject, title, to, lessonType } = details;
  return <div>انا</div>;
}
