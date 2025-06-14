import Image from "next/image";

function SideNavQrCode() {
  return (
    <div className="relative mt-auto overflow-hidden pt-8">
      <div className="rounded-lg bg-[#35DDAB] p-3">
        <div className="absolute -right-[10%] bottom-0 z-10 h-[90%] w-[60%]">
          <Image
            src={"/model.webp"}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            alt="teacher model"
            className="scale-x-[-1]"
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
          width={300}
          height={50}
          alt="objects background"
          className="relative -bottom-3 -left-3"
        />
      </div>
    </div>
  );
}

export default SideNavQrCode;
