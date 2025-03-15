import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ISideCardProps<T> {
  CardIcon: React.ReactNode;
  cardTitle: string;
  items?: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function SideCard<T>({
  CardIcon,
  cardTitle,
  items,
  renderItem,
}: ISideCardProps<T>) {
  const firstItems = items?.slice(0, 3);

  return (
    <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200 flex flex-col">
      <div>
        <div className="border-b border-neutral-200 justify-between flex items-center gap-x-1 py-4 px-6 font-medium">
          <h3 className="flex items-center gap-1 ">
            {CardIcon}
            {cardTitle}
          </h3>

          <Dialog>
            <DialogTrigger className="text-primary">الكل</DialogTrigger>
            <DialogContent className=" ">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-1 mb-4">
                  {CardIcon}
                  {cardTitle}
                </DialogTitle>
              </DialogHeader>
              <ul className="h-[70vh] overflow-auto p-6">
                {items?.map(renderItem)}
              </ul>
            </DialogContent>
          </Dialog>
        </div>
        {firstItems && firstItems.length > 0 ? (
          <ul className="p-6 ">{firstItems?.map(renderItem)}</ul>
        ) : (
          <p className="text-neutral-400 text-center p-5">There is no data</p>
        )}
      </div>
    </div>
  );
}
