import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OptimisticUpdateConfig<TData, TInput> {
  updateFn: (data: TInput) => Promise<TData>;
  queryKey: unknown[];
  matcher: (item: TData, input: TInput) => boolean;
  updater: (item: TData, input: TInput) => TData;
  messages?: {
    success?: string;
    error?: string;
  };
}

export default function useOptimisticUpdate<
  TData extends Record<string, any>,
  TInput,
>({
  updateFn,
  queryKey,
  matcher,
  updater,
  messages = {
    success: "تم التحديث بنجاح",
    error: "حدث خطأ في التحديث",
  },
}: OptimisticUpdateConfig<TData, TInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFn,

    onMutate: async (input) => {
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
              data: page.data.map((item) =>
                matcher(item, input) ? updater(item, input) : item,
              ),
            })),
          };
        },
      );

      return { previousData };
    },

    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error(error instanceof Error ? error.message : messages.error);
    },

    onSuccess: () => {
      toast.success(messages.success);
    },
  });
}
