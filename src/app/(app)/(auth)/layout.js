"use client";

import LoadingPage from "@/components/Loading";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
    const { initAuth, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!initAuth) return;
        if (!user) return;
        switch (user.role) {
            case "user":
                router.replace("/u");
                break;
            case "admin":
                router.replace("/headquarter");
                break;
        }
    }, [initAuth, user]);

    if (!initAuth) return <LoadingPage />;
    if (user) return <LoadingPage />;

    return <>{!user && children}</>;
}
