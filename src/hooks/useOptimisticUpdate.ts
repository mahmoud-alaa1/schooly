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

      // Handle paginated data
      if (
        previousData &&
        typeof previousData === "object" &&
        "pages" in previousData
      ) {
        queryClient.setQueryData(queryKey, (old: any) => {
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              data: page.data.map((item: TData) =>
                matcher(item, input) ? updater(item, input) : item,
              ),
            })),
          };
        });
      }

      // Handle non-paginated object data
      else if (previousData && matcher(previousData as TData, input)) {
        queryClient.setQueryData(queryKey, (old: TData) => updater(old, input));
      }

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
