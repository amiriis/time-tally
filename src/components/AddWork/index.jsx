"use client";
import {
  Button,
  Drawer
} from "@mui/material";
import { useState } from "react";
import AddWorkForm from "./form";

function AddWork() {
  const [openDrawer, setOpenDrawer] = useState();
  return (
    <>
      <Button onClick={() => setOpenDrawer(true)} variant="outlined">
        Add
      </Button>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <AddWorkForm setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </>
  );
}

export default AddWork;
