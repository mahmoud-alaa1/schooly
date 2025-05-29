import Image from "next/image"

function SideNavQrCode() {
    return (
        <div className="mt-auto pt-8 relative overflow-hidden">
            <div className=' bg-[#35DDAB] rounded-lg p-3  ' >
                <div className="absolute  z-10 w-[300px] h-[210px] xl:w-[350px] xl:h-[230px] bottom-0 -right-[30%] xl:-right-[30%] ">
                <Image src={"/model.webp"} fill  alt="teacher model"  className="scale-x-[-1]" />
                </div>
                <div className="p-2 overflow-hidden" dir="ltr">
                    <div className="flex items-center gap-2">
                        <Image src={"/qr-code.png"} width={70} height={70} alt="qr-code" className="rounded-lg " />
                        <span className="text-white text-lg font-bold">
                            حــــمـــل
                            <br />
                            التطبيق
                        </span>
                    </div>
                </div>
                <Image src={"/Vector.svg"} width={280} height={50} alt="objects background" className="relative -left-12 -bottom-3" />
            </div>
        </div>
    )
} 

export default SideNavQrCode