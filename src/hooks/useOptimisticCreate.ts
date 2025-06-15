import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OptimisticCreateConfig<TData, TInput> {
  createFn: (data: TInput) => Promise<TData>;
  queryKey: unknown[];
  optimisticData: (input: TInput) => TData;
  messages?: {
    success?: string;
    error?: string;
  };
}

export default function useOptimisticCreate<TData, TInput>({
  createFn,
  queryKey,
  optimisticData,
  messages = {
    success: "تمت العملية بنجاح",
    error: "حدث خطأ ما في العملية",
  },
}: OptimisticCreateConfig<TData, TInput>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFn,

    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<{ pages: { data: TData[] }[] }>(
        queryKey,
        (old) => {
          if (!old?.pages?.[0]) return old;
          return {
            ...old,
            pages: [
              {
                ...old.pages[0],
                data: [...old.pages[0].data, optimisticData(input)],
              },
              ...old.pages.slice(1),
            ],
          };
        },
      );

      return { previousData };
    },

    onError: (error, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error(error instanceof Error ? error.message : messages.error);
    },

    onSuccess: () => {
      toast.success(messages.success);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
