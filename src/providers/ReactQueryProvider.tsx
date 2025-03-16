"use client";

import { attachToken } from "@/services/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  // @ts-expect-error the token exists
  const token = useSession().data?.user?.token;
  useEffect(() => {
    if (token) attachToken(token);
  }, [token]);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
