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
      router.replace(`/`, { scroll: true });
      toast.success("تم مغادرة الحصة ");
    },

    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ أثناء مغادرة الحصة. يرجى المحاولة مرة أخرى.",
      );
    },
  });
  return mutation;
}

export default useLeaveLesson;
