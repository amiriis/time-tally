'use client'
import LoadingPage from "@/components/Loading"
import { useAuth } from "@/contexts/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
    const { initAuth, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!initAuth) return

        if (user) {
            router.replace('/u')
            return
        }

        router.replace('/login')


    }, [initAuth, user])

    return (
        <LoadingPage/>
    )
}

export default Page