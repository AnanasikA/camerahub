"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIOverlayContextValue {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const UIOverlayContext = createContext<UIOverlayContextValue | undefined>(
  undefined
);

export function UIOverlayProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <UIOverlayContext.Provider
      value={{
        searchOpen,
        openSearch: () => setSearchOpen(true),
        closeSearch: () => setSearchOpen(false),
      }}
    >
      {children}
    </UIOverlayContext.Provider>
  );
}

export function useUIOverlay() {
  const ctx = useContext(UIOverlayContext);
  if (!ctx) throw new Error("useUIOverlay must be used within UIOverlayProvider");
  return ctx;
}