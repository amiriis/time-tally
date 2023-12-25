import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import TimerIcon from "@mui/icons-material/Timer";
import EndToForm from "./form";
import StartFromForm from "./form";

function StartFromBtn({ work, setDisabled }) {
  const [openDrawer, setOpenDrawer] = useState();
  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>
        <TimerIcon />
      </Button>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <StartFromForm
          setDisabled={setDisabled}
          work={work}
          setOpenDrawer={setOpenDrawer}
        />
      </Drawer>
    </>
  );
}

export default StartFromBtn;