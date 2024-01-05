import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import DeleteWork from "../DeleteWork";
import EditWork from "../EditWork";
import SettingsWork from "../SettingsWork";
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
          py: 2,
          pl: 2,
          borderBottom: 1,
          borderColor: work.is_time_tracking ? "warning.main" : "divider",
        }}
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
