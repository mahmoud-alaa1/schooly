import { getUpcomingLessons } from "@/services/lessons";
import { AiOutlineClockCircle } from "react-icons/ai";
import Lesson from "./Lesson";

export default async function UpcomingLessons() {
  try {
    const { data: lessons } = await getUpcomingLessons();

    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl border-2 border-neutral-200">
        <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
          <AiOutlineClockCircle className="text-xl" />
          حصصك القادمة
        </h2>
        <ul className="p-6">
          {lessons.length > 0 ? (
            lessons.map((val) => <Lesson key={val.id} details={val} />)
          ) : (
            <li className="text-center text-gray-500 py-4">
              لا توجد حصص قادمة
            </li>
          )}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl border-2 border-neutral-200">
        <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
          <AiOutlineClockCircle className="text-xl" />
          حصصك القادمة
        </h2>
        <div className="p-4 text-red-600">
          حدث خطأ أثناء جلب البيانات، يرجى المحاولة مرة أخرى
        </div>
      </div>
    );
  }
}
