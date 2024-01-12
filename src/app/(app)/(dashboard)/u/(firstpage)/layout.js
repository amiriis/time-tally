'use client'
import { Drawer } from "@mui/material";
import { useSelectedLayoutSegment } from "next/navigation";

function ULeyout({ settings, children }) {
    const settingsSegment = useSelectedLayoutSegment('settings')
    return (
        <>
            {children}
            <Drawer open={settingsSegment === 'children'} anchor="bottom">
                {settings}
            </Drawer>
        </>
    )
}

export default ULeyout