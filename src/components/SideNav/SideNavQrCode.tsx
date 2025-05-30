import Image from "next/image";

function SideNavQrCode() {
  return (
    <div className="relative mt-auto pt-8">
      <div className="rounded-lg bg-[#35DDAB] p-3">
        <div className="absolute -right-[30%] bottom-0 z-10 h-[210px] w-[300px]">
          <Image
            src={"/model.webp"}
            fill
            alt="teacher model"
            className="scale-x-[-1]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
        <div className="overflow-hidden p-2" dir="ltr">
          <div className="flex items-center gap-2">
            <Image
              src={"/qr-code.png"}
              width={70}
              height={70}
              alt="qr-code"
              className="w-auto rounded-lg"
            />
            <span className="text-lg font-bold text-white">
              حــــمـــل
              <br />
              التطبيق
            </span>
          </div>
        </div>
        <Image
          src={"/Vector.svg"}
          width={280}
          height={50}
          alt="objects background"
          className="relative -bottom-3 -left-3"
        />
      </div>
    </div>
  );
}

export default SideNavQrCode;
