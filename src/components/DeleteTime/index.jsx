import DeleteIcon from "@mui/icons-material/Delete";
import { Drawer, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import DeleteTimeForm from "./form";

function DeleteTime({ time, handleCloseEditMenu }) {
    const [openDrawer, setOpenDrawer] = useState();
    return (
        <>
            <MenuItem
                onClick={() => {
                    handleCloseEditMenu();
                    setOpenDrawer(true);
                }}
            >
                <DeleteIcon fontSize="inherit" />
                <Typography sx={{ pl: 1.5 }} textAlign="center">
                    Delete
                </Typography>
            </MenuItem>
            <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <DeleteTimeForm time={time} setOpenDrawer={setOpenDrawer} />
            </Drawer>
        </>
    );
}

export default DeleteTime;
