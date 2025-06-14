import { LucideIcon } from "lucide-react";
import useGetProfile from "@/hooks/profile/useGetProfile";
import FieldSkeleton from "./FieldSkeleton";

interface InfoItemProps {
  label: string;
  value?: string | number | null;
  icon?: LucideIcon;
  isLoading?: boolean;
}

export default function InfoItem({ label, value, icon: Icon }: InfoItemProps) {
  const { isPending } = useGetProfile();

  if (isPending) {
    return <FieldSkeleton icon={Icon} />;
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      <p className="flex items-center gap-2 rounded-md p-1.5 font-medium">
        <span>{label}</span>
        {Icon && <Icon size={16} />}
      </p>
      <p className="rounded-md bg-neutral-100 p-4 font-medium">
        {value ?? "غير متوفر"}
      </p>
    </div>
  );
}
