"use client";

import LoadingPage from "@/components/Loading";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function dashboardLayout({ children }) {
    const { initAuth, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!initAuth) return
        if (user) return
        router.replace('/login')
    }, [initAuth, user])

    if (!initAuth) return (<LoadingPage />)
    if (!user) return (<LoadingPage />)

    return (
        <>
            {user && children}
        </>
    );
}

export default dashboardLayout