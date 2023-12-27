'use client'

import { AuthProvider } from "@/contexts/auth"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}
