"use client";

import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/store/auth";
import { UserRound } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  useEffect(() => {
    logout();
    queryClient.clear();
  }, [logout, queryClient]);
  return (
    <div className="w-[clamp(300px,21vw,360px)] rounded-lg border border-neutral-300 bg-white">
      <div className="flex items-center gap-2 border-b p-4">
        <span className="font-bold">سجل دخولك</span>
        <UserRound />
      </div>
      <LoginForm />
    </div>
  );
}
