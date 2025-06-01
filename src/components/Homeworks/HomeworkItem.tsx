import Image from "next/image";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export default function HomeworkItem() {
  return (
    <li className="border-[#F0F0F0] py-3 not-last:border-b-1">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-3">
          <Image
            src={"/homework.png"}
            width={40}
            height={40}
            alt="subject logo"
          />
          <div>
            <h4 className="text-sm">واجب 2024-02-24.pdf</h4>
            <p className="text-sm text-[#00000073]">
              {" "}
              الدرس الخامس: الضرب الإتجاهي والقياسي
            </p>
          </div>
        </div>
        <Button variant="outline" className="rounded-full border-2">
          <Download />
        </Button>
      </div>
    </li>
  );
}
