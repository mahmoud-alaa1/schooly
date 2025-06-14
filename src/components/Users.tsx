import { Button } from "@/components/ui/button";
import Avatar from "./Avatar";

export default function Users() {
  return (
    <div className="flex items-center -space-x-1.5" dir="ltr">
      <div className="flex -space-x-1.5 text-left">
        {Array.from({ length: 5 }).map((_, index) => (
          <Avatar
            key={index}
            className="ring-background size-8! ring-2"
          />
        ))}
      </div>
      <Button
        className="ring-background flex size-8 items-center justify-center rounded-full bg-[#8BEBCF] text-sm text-black ring-2"
        size="icon"
      >
        +6
      </Button>
    </div>
  );
}
