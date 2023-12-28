import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Divider, Stack, Typography, Chip, Zoom } from "@mui/material";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteWork from "../DeleteWork";
import EditWork from "../EditWork";
import WorkAnalytics from "../WorkAnalytics";

function WorkCard({ work }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  return (
    <Stack
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "divider",
        opacity: deleting ? ".3" : "1",
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
          <Zoom in={work.fromCache}>
            <Chip
              label={"Local"}
              size="small"
              color="warning"
              variant="outlined"
            />
          </Zoom>
        </Stack>
        <Stack direction={"row"}>
          <EditWork work={work} deleting={deleting} />
          <DeleteWork
            work={work}
            deleting={deleting}
            setDeleting={setDeleting}
          />
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
