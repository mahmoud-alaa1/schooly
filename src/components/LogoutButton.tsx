"use client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) throw new Error("فشل تسجيل الخروج");

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      className="active:scale-90"
      variant="outline"
      size="icon"
      onClick={handleLogout}
    >
      <LogOut className="size-6 font-bold " />
    </Button>
  );
}
