import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Divider, Stack, Typography, Chip, Zoom } from "@mui/material";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteWork from "../DeleteWork";
import EditWork from "../EditWork";
import WorkAnalytics from "../WorkAnalytics";
import SettingsWork from "../SettingsWork";

function WorkCard({ work }) {
  const router = useRouter();
  return (
    <Stack
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "divider",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ py: 2, pl: 2 }}
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="h6">{work.name}</Typography>
        </Stack>
        <Stack direction={"row"}>
          <SettingsWork work={work} />
          <EditWork work={work} />
          <DeleteWork work={work} />
        </Stack>
      </Stack>
      <Divider />
      <WorkAnalytics work_id={work.id} />
      <Button
        size="large"
        color="primary"
        variant="contained"
        sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        startIcon={<OpenInNewIcon />}
        onClick={() => router.push(`/work/${work.id}`)}
      >
        {`Let's make time in ${work.name}`}
      </Button>
    </Stack>
  );
}

export default WorkCard;
