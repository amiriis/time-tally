"use client";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import WorkAnalytics from "../WorkAnalytics";

function WorkCard({ work }) {
  return (
    <Stack
      sx={{
        my: 1,
        border: 1,
        borderRadius: 1,
        borderColor: work.is_time_tracking ? "warning.main" : "divider",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6">{work.name}</Typography>
          <Typography variant="caption">
            Calendar: {work.settings.calendar}
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <IconButton component={Link} href={`/u/settings-work/${work.id}`}>
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Stack>
      <WorkAnalytics work={work} />
      <Button
        component={Link}
        href={`/u/work/${work.id}`}
        passHref
        size="large"
        color={work.is_time_tracking ? "warning" : "primary"}
        variant="contained"
        sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        startIcon={<OpenInNewIcon />}
      >
        {work.is_time_tracking
          ? `${work.name} is tracking. let's go see`
          : `Let's make time in ${work.name}`}
      </Button>
    </Stack>
  );
}

export default WorkCard;
