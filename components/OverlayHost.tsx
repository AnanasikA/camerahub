"use client";

import { AnimatePresence } from "framer-motion";
import { useUIOverlay } from "./UIOverlayContext";
import SearchOverlay from "./SearchOverlay";

export default function OverlayHost() {
  const { searchOpen, closeSearch } = useUIOverlay();

  return (
    <AnimatePresence>
      {searchOpen && <SearchOverlay key="search" onClose={closeSearch} />}
    </AnimatePresence>
  );
}