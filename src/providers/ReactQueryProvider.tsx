"use client";

import useToken from "@/hooks/useToken";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  useToken();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
