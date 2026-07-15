"use client";

// =============================================================
// LoadingContext — Centralized global loading state
// =============================================================

import React, { createContext, useContext, type ReactNode } from "react";
import { usePageLoader } from "@/hooks/usePageLoader";
import { AppLoader } from "@/components/shared/loader";

interface LoadingContextType {
  isLoading: boolean;
  /** Manually override loading state (e.g., async operations) */
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const { isLoading, setIsLoading } = usePageLoader();

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <AppLoader isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within a <LoadingProvider>");
  }
  return ctx;
}
