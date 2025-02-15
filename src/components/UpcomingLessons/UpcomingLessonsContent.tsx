import Lesson from "./Lesson";
import { TLesson } from "@/types/lessons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const fakeGetLessons = () => {
  return new Promise<TLesson[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          teacherId: "1",
          subject: "الفيزياء",
          grade: "الصف الثاني الثانوي",
          title: "الحركة الدائرية",
          lessonType: 0,
          date: "2025-09-01",
          from: "10:00",
          to: "11:00",
        },
        {
          id: "2",
          teacherId: "1",
          subject: "الفيزياء",
          grade: "الصف الثاني الثانوي",
          title: "الحركة الدائرية",
          lessonType: 0,
          date: "2025-09-01",
          from: "10:00",
          to: "11:00",
        },
        {
          id: "3",
          teacherId: "1",
          subject: "الفيزياء",
          grade: "الصف الثاني الثانوي",
          title: "الحركة الدائرية",
          lessonType: 0,
          date: "2025-09-01",
          from: "10:00",
          to: "11:00",
        },
      ]);
    }, 0);
  });
};

export default async function UpcomingLessonsContent() {
  try {
    const lessons: TLesson[] = await fakeGetLessons();
    return (
      <>
        <ul className="p-6 pb-0">
          {lessons.map((lesson) => (
            <Lesson key={lesson.id} details={lesson} />
          ))}
        </ul>
        <Pagination className="mb-2 px-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-600">حدث خطأ اثناء جلب الحصص القادمة</p>;
  }
}
