'use client'
import { Drawer, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditWorkForm from "./form";

function EditWork({ work }) {
  const [openDrawer, setOpenDrawer] = useState();
  return (
    <>
      <Tooltip title={"Edit"} arrow>
        <IconButton onClick={() => setOpenDrawer(true)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <EditWorkForm work={work} setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </>
  );
}

export default EditWork;
