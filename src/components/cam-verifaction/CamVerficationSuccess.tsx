import StatusIcon from "../ErrorIcon";

function CamVerficationSuccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-center text-2xl font-bold text-[#000000D9]">
        تم التحقق بنجاح...
      </h2>
      <div>
        <StatusIcon bgColor="bg-green-500" Icon="✓" />
      </div>
    </div>
  );
}

export default CamVerficationSuccess;
