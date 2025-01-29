import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import TimerIcon from "@mui/icons-material/Timer";
import EndToForm from "./form";

function EndToBtn({ work }) {
    const [openDrawer, setOpenDrawer] = useState();
    return (
        <>
            <Button onClick={() => setOpenDrawer(true)}>
                <TimerIcon />
            </Button>
            <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <EndToForm work={work} setOpenDrawer={setOpenDrawer} />
            </Drawer>
        </>
    );
}

export default EndToBtn;
