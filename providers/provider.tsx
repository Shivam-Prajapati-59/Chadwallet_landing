"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import PrivyProviders from "./privyprovider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <PrivyProviders>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PrivyProviders>
  );
}
