import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LessonSkeleton from "./UpcomingLessons/LessonSkeleton";

interface ISideCardProps {
  CardIcon: React.ReactNode;
  cardTitle: string;
  children?: React.ReactNode;
}

export default function SideCard({
  CardIcon,
  cardTitle,
  children,
}: ISideCardProps) {
  return (
    <div className="max-w-lg h-fit  bg-white rounded-2xl border-2 border-neutral-200 flex flex-col">
      <div>
        <div className="border-b border-neutral-200 justify-between flex items-center gap-x-1 py-4 px-6 font-medium">
          <h3 className="flex items-center gap-1 ">
            {CardIcon}
            {cardTitle}
          </h3>
          <Dialog>
            <DialogTrigger className="text-primary">الكل</DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-1 mb-4">
                  {CardIcon}
                  {cardTitle}
                </DialogTitle>
                <DialogDescription>{children}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
