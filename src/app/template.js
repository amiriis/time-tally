'use client'

import ThemeRegistry from "@/components/ThemeRegisery/ThemeRegistery";
import Navbar from "@/components/navbar";
import { useAuth } from "@/contexts/auth";
import { Container, Typography } from "@mui/material";

export default function Template({ children }) {
    const { user, initAuth } = useAuth()
    return (
        <ThemeRegistry>
            <Navbar />
            <Container sx={{mt:3}} maxWidth="xs">
                {!initAuth ? null : !user ? (
                    <Typography>Please Login...</Typography>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </Container>
        </ThemeRegistry>
    )
}