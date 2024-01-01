"use client";

import { AppProvider } from "@/contexts/app";
import { AuthProvider } from "@/contexts/auth";

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <html lang="en">
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </AppProvider>
  );
}
