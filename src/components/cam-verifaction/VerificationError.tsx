import React from "react";
import StatusIcon from "../ErrorIcon";

function VerificationError() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-center text-2xl font-bold text-[#000000D9]">
        حدث خطأ...
      </h2>
      <div>
        <StatusIcon bgColor="bg-red-500" Icon="!" />
      </div>
    </div>
  );
}

export default VerificationError;
