import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";

function CamVerficationLoading() {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold">يتم مقارنة الصورة.,.. </h2>
      <div className="flex items-center justify-center gap-4 p-4">
        <div className="relative h-38 w-38 rounded-full">
          <Image
            src={"/boy.jpg"}
            fill
            className="rounded-full object-cover"
            alt="Loading face verification"
          />
        </div>
        <CircleArrowLeft className="text-primary h-28 w-28" />
        <div className="relative h-38 w-38 rounded-full">
          <Image
            src={"/boy.jpg"}
            fill
            className="rounded-full object-cover"
            alt="Loading face verification"
          />
        </div>
      </div>
    </div>
  );
}

export default CamVerficationLoading;
