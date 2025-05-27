import Image from "next/image";
import React from "react";
import Person from "../../public/person1.png";
export default function Avatar() {
  return (
    <div className="size-10 bg-orange-300 rounded-full overflow-hidden">
      <Image className="w-full" src={Person} alt="person" />
    </div>
  );
}
