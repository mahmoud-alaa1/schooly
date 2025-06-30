import CreateHomework from "@/components/create-new/CreateHomework";
import RoleGuard from "@/components/RoleGuard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book, Plus } from "lucide-react";
interface HomeworkHeaderProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

function HomeworkHeader({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: HomeworkHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <RoleGuard role="TEACHER">
        <div className="flex items-center gap-4">
          <span>
            <Book className="text-primary size-14" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة الواجبات</h1>
            <p className="mt-2 text-gray-600">إنشاء وإدارة ومتابعة الواجبات</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إنشاء واجب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>إنشاء واجب جديد</DialogTitle>
              <DialogDescription>
                إنشاء واجب منزلي جديد للطلاب
              </DialogDescription>
            </DialogHeader>
            <CreateHomework />
          </DialogContent>
        </Dialog>
      </RoleGuard>
      <RoleGuard role="STUDENT">
        <div className="flex items-center gap-4">
          <span>
            <Book className="text-primary size-14" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">واجباتي</h1>
          </div>
        </div>
      </RoleGuard>
    </div>
  );
}

export default HomeworkHeader;
