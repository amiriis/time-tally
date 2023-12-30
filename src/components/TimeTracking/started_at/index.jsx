import { Drawer, IconButton, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import StartFromForm from "@/components/TimeActionsBtn/startBtns/startFromBtn/form";
import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";

function Started_at({ work }) {
  const [openDrawer, setOpenDrawer] = useState();
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography variant="caption">
        Start at:{" "}
        {moment(work.time_tracking_started_at.toDate())
          .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
          .format("YYYY/MM/DD HH:mm:ss")}
      </Typography>
      <IconButton size="small" onClick={() => setOpenDrawer(true)}>
        <EditIcon fontSize="inherit" />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <StartFromForm
          work={work}
          setOpenDrawer={setOpenDrawer}
          default_started_at={moment(work.time_tracking_started_at.toDate())}
        />
      </Drawer>
    </Stack>
  );
}

export default Started_at;
