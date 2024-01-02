"use client";

import LoadingPage from "@/components/Loading";
import LoginPage from "@/components/LoginPage";
import { useAuth } from "@/contexts/auth";

export default function Layout({ children }) {
  const { initAuth, user } = useAuth()

  if (!initAuth) return (<LoadingPage />)

  return (
    <>
      {user ? children : (
        <LoginPage />
      )}
    </>
  );
}
