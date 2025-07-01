import { Calendar, Info, User2 } from "lucide-react";
import { Box, BoxBody, BoxHeader } from "../Box";
import useGetProfile from "@/hooks/profile/useGetProfile";
import InfoItem from "./InfoItem";
import { useAuth } from "@/store/auth";
import { LucideIcon } from "lucide-react";

interface InfoItemType {
  label: string;
  icon: LucideIcon;
  key: keyof typeof studentExtraKeys;
}

const studentExtraKeys = {
  parent: "parent",
  address: "address",
  dateOfJoining: "dateOfJoining",
  department: "department",
  grade: "grade",
} as const;

const infoItems: InfoItemType[] = [
  {
    label: "العنوان",
    icon: Info,
    key: "address",
  },
  {
    label: "تاريخ الانضمام",
    icon: Calendar,
    key: "dateOfJoining",
  },
  {
    label: "القسم",
    icon: Info,
    key: "department",
  },
  {
    label: "الصف",
    icon: Info,
    key: "grade",
  },
  {
    label: "ولي الأمر",
    icon: User2,
    key: "parent",
  },
];

export default function ExtraInfoBox() {
  const { data, isPending } = useGetProfile();
  const role = useAuth((state) => state.user?.role);

  if (role !== 1) {
    return null;
  }

  if (isPending || !data?.data) {
    return (
      <Box>
        <BoxHeader className="p-4!">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md p-1.5 text-white">
              <Info strokeWidth={2.5} size={16} />
            </div>
            <h2 className="text-lg font-medium">معلومات إضافية</h2>
          </div>
        </BoxHeader>
        <BoxBody className="space-y-4 p-4!">
          {Array.from({ length: 5 }).map((_, index) => (
            <InfoItem key={index} isLoading label="Loading..." />
          ))}
        </BoxBody>
      </Box>
    );
  }

  const getValue = (key: keyof typeof studentExtraKeys) => {
    const value = data.data.studentExtra?.[key];
    if (key === "department" && value === 0) return "أمريكي";
    else if (key === "department" && value === 1) return "بريطاني";
    else if (key === "parent") return data?.data?.studentExtra?.parent?.parentName;
    return value as string;
  };

  return (
    <Box>
      <BoxHeader className="p-4!">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1.5 text-white">
            <Info strokeWidth={2.5} size={16} />
          </div>
          <h2 className="text-lg font-medium">معلومات إضافية</h2>
        </div>
      </BoxHeader>
      <BoxBody className="space-y-4 p-4!">
        {infoItems.map((item) => (
          <InfoItem
            key={item.key}
            label={item.label}
            value={getValue(item.key)}
            icon={item.icon}
          />
        ))}
      </BoxBody>
    </Box>
  );
}
