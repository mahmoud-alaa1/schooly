import Image from "next/image";

function Hero() {
  return (
    <div className="relative flex h-[200px] items-center rounded-xl bg-[#35DDAB] bg-[url('/OBJECTS.svg')] bg-position-[left_-25%_center] bg-no-repeat px-10 sm:justify-center sm:bg-left">
      <Image
        src={"/model.webp"}
        width={200}
        height={100}
        alt="teacher model"
        className="absolute right-0 bottom-0 hidden -scale-x-[1] rounded-xl object-contain sm:block"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={80}
      />
      <h1 className="relative z-20 flex flex-col gap-3 text-3xl text-[#E6FBF5] sm:text-4xl">
        نظَام متكامل
        <span className="font-bold text-[#DBFF77]">لخدمتَك كمعلم</span>
      </h1>
    </div>
  );
}

export default Hero;
