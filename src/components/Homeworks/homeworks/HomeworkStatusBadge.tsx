import React from "react";
import { Badge } from "@/components/ui/badge";

interface HomeworkStatusBadgeProps {
  status: string;
}

export const HomeworkStatusBadge: React.FC<HomeworkStatusBadgeProps> = ({
  status,
}) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          نشط
        </Badge>
      );
    case "completed":
      return <Badge variant="secondary">مكتمل</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
