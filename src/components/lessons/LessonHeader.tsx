import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpenText, Plus } from "lucide-react";
import RoleGuard from "../RoleGuard";
import CreateSessionGeneral from "../create-new/CreateSessionGeneral";
interface LessonHeaderProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

function LessonHeader({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: LessonHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <RoleGuard role="TEACHER">
        <div className="flex items-center gap-4">
          <span>
            <BookOpenText className="text-primary size-14" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة الحصص</h1>
            <p className="mt-2 text-gray-600">إنشاء وإدارة ومتابعة الحصص</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إنشاء حصة جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>إنشاء حصة جديد</DialogTitle>
              <DialogDescription>إنشاء حصة جديد للطلاب</DialogDescription>
            </DialogHeader>
            <CreateSessionGeneral
              setIsCreateDialogOpen={setIsCreateDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </RoleGuard>
      <RoleGuard role="STUDENT">
        <div className="flex items-center gap-4">
          <span>
            <BookOpenText className="text-primary size-14" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">حصصي</h1>
          </div>
        </div>
      </RoleGuard>
    </div>
  );
}

export default LessonHeader;
