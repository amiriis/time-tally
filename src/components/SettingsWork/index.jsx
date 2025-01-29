import { Drawer, IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsWorkForm from "./form";
import { useState } from "react";

function SettingsWork({ work }) {
    const [openDrawer, setOpenDrawer] = useState();

    return (
        <>
            <Tooltip title={"Settings"} arrow>
                <IconButton onClick={() => setOpenDrawer(true)}>
                    <SettingsIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <SettingsWorkForm work={work} setOpenDrawer={setOpenDrawer} />
            </Drawer>
        </>
    );
}

export default SettingsWork;
