"use client";

import { AppProvider } from "@/contexts/app";

export default function Layout({ children }) {
  return <AppProvider>{children}</AppProvider>;
}
