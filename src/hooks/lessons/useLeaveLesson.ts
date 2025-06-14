"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useLeaveLesson() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/agora/leave`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("فشل الخروج من الحصة");
    },
    onSuccess: () => {
      localStorage.removeItem("agora-token");
      router.push(`/`);
      toast.success("تم مغادرة الحصة ");
    },

    onError: (error) => {
      console.log("Error during verify code:", error.name);
    },
  });
  return mutation;
}

export default useLeaveLesson;
