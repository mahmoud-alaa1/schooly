import { putProfile } from "@/services/profileServices";
import useOptimisticUpdate from "../useOptimisticUpdate";
import { useAuth } from "@/store/auth";
import { IProfilePutResponse } from "@/types/profile";
import { editProfileSchema } from "@/schemas/profileSchema";

export default function usePutProfile() {
  const id = useAuth((state) => state.user?.id);

  return useOptimisticUpdate<IProfilePutResponse, editProfileSchema>({
    queryKey: ["profile", id],
    updateFn: putProfile,
    messages: {
      success: "تم تحديث الملف الشخصي بنجاح",
      error: "حدث خطأ في تحديث الملف الشخصي",
    },
    matcher: (profile) => profile.data.id === id,
    updater: (profile, input) => ({
      ...profile,
      data: {
        ...profile.data,
        ...Object.fromEntries(
          Object.entries(input).filter(
            ([_, value]) => value !== undefined && value !== null,
          ),
        ),
      },
    }),
  });
}
