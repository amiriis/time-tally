import { Drawer, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteWorkForm from "./form";
import { useState } from "react";

function DeleteWork({ work }) {
  const [openDrawer, setOpenDrawer] = useState();
  return (
    <>
      <Tooltip title={"Delete"} arrow>
        <IconButton onClick={() => setOpenDrawer(true)}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DeleteWorkForm work={work} setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </>
  );
}

export default DeleteWork;
