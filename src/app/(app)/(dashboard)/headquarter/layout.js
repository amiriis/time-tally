"use client";

import LoadingPage from "@/components/Loading";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HeadquarterLayout({ children }) {
    const { initAuth, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!initAuth) return;
        if (!user) {
            router.replace("/login");
            return;
        }
        if (user.role !== "admin") {
            router.replace("/u");
            return;
        }
    }, [initAuth, user]);

    if (!initAuth) return <LoadingPage />;
    if (!user) return <LoadingPage />;
    if (user.role !== "admin") return <LoadingPage />;

    return <>{user && children}</>;
}

export default HeadquarterLayout;
