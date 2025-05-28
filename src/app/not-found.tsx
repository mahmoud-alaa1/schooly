"use client";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <AuthLayout>
      <div className="flex max-w-3xl flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="flex items-center gap-2 rounded-full border-2 border-[#FF4D4F] px-6 py-0.5 text-[#FF4D4F]">
          <Info size={19} />
          <span>خطأ 404</span>
        </h1>
        <h2 className="text-6xl">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground text-2xl font-light">
          إما أن الإنترنت لا يعمل، أو أننا لم نتمكن من العثور على الصفحة التي
          كنت تبحث عنها.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border bg-white"
            onClick={() => router.back()}
          >
            <span>للخلف</span>
            <ArrowLeft size={19} />
          </Button>
          <Link href="/">
            <Button variant="default">إذهب للرئيسية</Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
