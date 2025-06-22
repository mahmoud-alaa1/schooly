import React from "react";
import { Button } from "./ui/button";

function Error() {
  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="mb-4">
            <i className="ph ph-warning-circle text-6xl text-red-500"></i>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">حدث خطأ</h2>
          <p className="mb-4 text-gray-600">
            فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            // className="bg-primary rounded-lg px-4 py-2 text-white transition-colors"
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
