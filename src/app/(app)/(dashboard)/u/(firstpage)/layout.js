'use client'
import { Drawer } from "@mui/material";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

function ULeyout(props) {
    const { addWork, settings, children } = props
    const router = useRouter()
    const settingsSegment = useSelectedLayoutSegment('settings')
    const addWorkSegment = useSelectedLayoutSegment('addWork')
    return (
        <>
            {children}
            <Drawer PaperProps={{ sx: { minHeight: 170 } }} onClose={() => { router.back() }} open={settingsSegment} anchor="bottom">
                {settings}
            </Drawer>
            <Drawer PaperProps={{ sx: { minHeight: 170 } }} onClose={() => { router.back() }} open={addWorkSegment} anchor="bottom">
                {addWork}
            </Drawer>
        </>
    )
}

export default ULeyout