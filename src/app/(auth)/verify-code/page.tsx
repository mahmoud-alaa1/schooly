import VerifyCodeForm from "@/components/VerifyCodeForm";
import { RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const VerifyCode = () => {
  return (
    <div className="w-[clamp(300px,21vw,360px)] rounded-lg border border-neutral-300 bg-white">
      <div className="flex items-center justify-between gap-2 border-b p-4">
        <div className="flex items-center gap-2">
          <RectangleEllipsis />
          <span className="font-bold">رمز التحقق</span>
        </div>
        <Link href="/login" className="font-medium text-[#02C189]">
          العودة
        </Link>
      </div>
      <Suspense>
        <VerifyCodeForm />
      </Suspense>
    </div>
  );
};

export default VerifyCode;
