interface StatusIconProps {
  bgColor: "bg-red-500" | "bg-green-500";
  Icon: "✓" | "!";
}

const StatusIcon = ({ bgColor, Icon }: StatusIconProps) => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-green-500"></div>
        <div className="absolute inset-1 rounded-full bg-white"></div>
        <div
          className={`absolute inset-3 flex items-center justify-center rounded-full ${bgColor}`}
        >
          <div className="text-4xl font-bold text-white">{Icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusIcon;
