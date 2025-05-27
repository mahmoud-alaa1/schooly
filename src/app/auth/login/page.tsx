import LoginForm from "@/components/LoginForm";
import { UserRound } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-[clamp(300px,21vw,360px)] bg-white rounded-lg border border-neutral-300">
      <div className="p-4 flex items-center gap-2 border-b">
        <span className="font-bold ">سجل دخولك</span>
        <UserRound />
      </div>
      <LoginForm />
    </div>
  );
}
