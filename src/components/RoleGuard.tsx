"use client";

import { useAuth } from "@/store/auth";
import { EROLES } from "@/types/enums";
export type RoleKey = keyof typeof EROLES;

type RoleGuardProps =
  | {
      role: "OWNER";
      ownerId: string;
      children: React.ReactNode;
    }
  | {
      role: Exclude<RoleKey, "OWNER">;
      ownerId?: never;
      children: React.ReactNode;
    };

export default function RoleGuard({ role, ownerId, children }: RoleGuardProps) {
  const user = useAuth((state) => state.user);
  const hasAccess = () => {
    if (!user) return false;

    if (role === "OWNER") return user.id === ownerId;

    return user.role === EROLES[role];
  };

  if (!hasAccess()) return null;

  return <>{children}</>;
}
