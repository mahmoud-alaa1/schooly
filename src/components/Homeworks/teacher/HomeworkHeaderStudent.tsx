import { Book } from "lucide-react";

function HomeworkHeaderStudent() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <span>
          <Book className="text-primary size-14" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">واجباتي</h1>
        </div>
      </div>
    </div>
  );
}

export default HomeworkHeaderStudent;
