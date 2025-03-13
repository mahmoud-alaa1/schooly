import React from "react";
import UserAvatar from "../ui/userAvatar";
import { Button } from "../ui/button";
import { IoIosMore } from "react-icons/io";

export default function PostContent({ content }: { content: string }) {
  return (
    <div className="flex gap-4 p-6 border-b-neutral-100 border-b-2 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <UserAvatar avatar={5} size={48}></UserAvatar>
          <div className="flex flex-col">
            <strong className="text-xs">أيمن أحمد</strong>
            <span className="text-neutral-400 text-xs">@AymanAhmed</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <IoIosMore />
        </Button>
      </div>
      <div>
        <span className="text-xs">
          يا شباب، خلوا بالكم إن الكويز ده عليه درجات مهمة، فركزوا كويس وحاولوا
          تجاوبوا كل الأسئلة. الوقت المتبقي للاختبار 10 دقايق، فراجع إجاباتك قبل
          ما تسلم.
        </span>
      </div>
      <div>
        <span className="text-neutral-400">قبل ساعة</span>
      </div>
    </div>
  );
}
