import { Button } from "@/components/ui/button";
import Avatar from "./Avatar";

export default function Users() {
  return (
    <div className="flex -space-x-3" dir="ltr">
      <div className="flex -space-x-3 text-left">
        {Array.from({ length: 4 }).map((_, index) => (
          <Avatar
            key={index}
            src="/person1.png"
            className="ring-background ring-2"
          />
        ))}
      </div>
      <Button
        className="ring-background flex size-10 items-center justify-center rounded-full bg-[#8BEBCF] text-sm text-black ring-2"
        size="icon"
      >
        +6
      </Button>
    </div>
  );
}
