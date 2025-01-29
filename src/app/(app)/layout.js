"use client";

import { AppProvider } from "@/contexts/app";
import { AuthProvider } from "@/contexts/auth";

export default function Layout({ children }) {
    return (
        <AppProvider>
            <AuthProvider>{children}</AuthProvider>
        </AppProvider>
    );
}
