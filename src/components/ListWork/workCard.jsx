import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteWork from "../DeleteWork";
import EditWork from "../EditWork";
import SettingsWork from "../SettingsWork";
import WorkAnalytics from "../WorkAnalytics";

function WorkCard({ work }) {
  const router = useRouter();
  return (
    <Stack
      sx={{
        my: 1,
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
      <WorkAnalytics work={work} />
      <Button
        component={Link}
        href={`/work/${work.id}`}
        passHref
        size="large"
        color="primary"
        variant="contained"
        sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        startIcon={<OpenInNewIcon />}
      >
        {`Let's make time in ${work.name}`}
      </Button>
    </Stack>
  );
}

export default WorkCard;
