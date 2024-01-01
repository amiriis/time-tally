"use client";

import { AuthProvider } from "@/contexts/auth";

export default function Layout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
