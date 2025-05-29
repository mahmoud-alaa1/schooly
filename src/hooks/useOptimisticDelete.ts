import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OptimisticDeleteConfig<TData, TId> {
  deleteFn: (id: TId) => Promise<any>;
  queryKey: unknown[];
  matcher: (item: TData, id: TId) => boolean;
  messages?: {
    success?: string;
    error?: string;
  };
}

export default function useOptimisticDelete<
  TData extends Record<string, any>,
  TId = number | string,
>({
  deleteFn,
  queryKey,
  matcher,
  messages = {
    success: "تم الحذف بنجاح",
    error: "حدث خطأ في الحذف",
  },
}: OptimisticDeleteConfig<TData, TId>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFn,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<{ pages: { data: TData[] }[] }>(
        queryKey,
        (old) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.filter((item) => !matcher(item, id)),
            })),
          };
        },
      );

      return { previousData };
    },

    onSuccess: (_, id) => {
      toast.success(messages.success);
      queryClient.invalidateQueries({ queryKey });
    },

    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      toast.error(error instanceof Error ? error.message : messages.error);
    },
  });
}
