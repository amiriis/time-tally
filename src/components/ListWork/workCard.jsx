import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Divider, Stack, Typography } from "@mui/material";

import { useState } from "react";
import DeleteWork from "../DeleteWork";
import EditWork from "../EditWork";
import { useRouter } from "next/navigation";
import TotalTimeWork from "../TotalTimeWork";
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
        sx={{ py: 2, px: 1 }}
      >
        <Typography sx={{ px: 2 }} variant="h6">
          {work.name}
        </Typography>
        <Stack direction={"row"} spacing={1}>
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
