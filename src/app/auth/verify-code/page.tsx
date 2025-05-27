import VerifyCodeForm from "@/components/VerifyCodeForm";
import { RectangleEllipsis } from "lucide-react";
import Link from "next/link";

const VerifyCode = () => {
  return (
    <div className="w-[clamp(300px,21vw,360px)] bg-white rounded-lg border border-neutral-300">
      <div className="p-4 flex items-center justify-between gap-2 border-b">
        <div className="flex items-center gap-2">
          <RectangleEllipsis />
          <span className="font-bold ">رمز التحقق</span>
        </div>
        <Link href="/auth/login" className="text-[#02C189] font-medium">
          العودة{" "}
        </Link>
      </div>
      <VerifyCodeForm />
    </div>
  );
};

export default VerifyCode;
