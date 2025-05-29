import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OptimisticCreateConfig<TData, TInput> {
  createFn: (data: TInput) => Promise<TData>;
  queryKey: unknown[];
  // Function to generate an optimistic item before the server response
  optimisticItem: (input: TInput) => Partial<TData>;
  // Function to add the new item to the existing data
  updater: (oldData: any, newItem: Partial<TData>) => any;
  messages?: {
    success?: string;
    error?: string;
  };
}

export default function useOptimisticCreate<TData, TInput>({
  createFn,
  queryKey,
  optimisticItem,
  updater,
  messages = {
    success: "تم الإنشاء بنجاح",
    error: "حدث خطأ في الإنشاء",
  },
}: OptimisticCreateConfig<TData, TInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFn,

    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueriesData({ queryKey });
      const newItem = optimisticItem(input);

      queryClient.setQueriesData({ queryKey }, (old: any) => {
        if (!old) return old;
        return updater(old, newItem);
      });

      return { previousData };
    },

    onSuccess: (data, _, context) => {
      queryClient.setQueriesData({ queryKey }, (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                data: [data, ...page.data.slice(1)],
              };
            }
            return page;
          }),
        };
      });
      toast.success(messages.success);
    },

    onError: (error, _, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, value]) => {
          queryClient.setQueryData(queryKey, value);
        });
      }
      toast.error(error instanceof Error ? error.message : messages.error);
    },
  });
}
