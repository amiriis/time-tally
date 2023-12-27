import EditIcon from "@mui/icons-material/Edit";
import { Drawer, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import EditTimeForm from "./form";

function EditTime({ time, handleCloseEditMenu }) {
  const [openDrawer, setOpenDrawer] = useState();
  return (
    <>
      <MenuItem
        onClick={() => {
          handleCloseEditMenu();
          setOpenDrawer(true);
        }}
      >
        <EditIcon fontSize="inherit" />
        <Typography sx={{ pl: 1 }} textAlign="center">
          Edit
        </Typography>
      </MenuItem>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <EditTimeForm time={time} setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </>
  );
}

export default EditTime;
