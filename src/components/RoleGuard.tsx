"use client";

import { useAuth } from "@/store/auth";

type TRole = "OWNER" | "STUDENT" | "TEACHER";

interface RoleGuardProps {
  ownerId: string;
  role: TRole;
  children: React.ReactNode;
}

export default function RoleGuard({ ownerId, role, children }: RoleGuardProps) {
  const user = useAuth((state) => state.user);

  const hasAccess = () => {
    if (!user) return false;

    switch (role) {
      case "OWNER":
        return user.id === ownerId;
      case "STUDENT":
        return user.role === "STUDENT";
      case "TEACHER":
        return user.role === "TEACHER";
      default:
        return false;
    }
  };

  if (!hasAccess()) return null;

  return <>{children}</>;
}
