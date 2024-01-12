'use client'
import { Drawer } from "@mui/material";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

function ULeyout({ settings, children }) {
    const router = useRouter()
    const settingsSegment = useSelectedLayoutSegment('settings')
    return (
        <>
            {children}
            <Drawer PaperProps={{ sx: { minHeight: 170 } }} onClose={() => { router.back() }} open={settingsSegment === 'children'} anchor="bottom">
                {settings}
            </Drawer>
        </>
    )
}

export default ULeyout