"use client";

import { useAuth } from "@/contexts/auth";
import useWork from "@/hooks/useWork";
import { Stack, Typography } from "@mui/material";
import ListTime from "../ListTime";
import TimeActionsBtn from "../TimeActionsBtn";
import TimeTracking from "../TimeTracking";

function ShowWork({ work_id }) {
  const { user } = useAuth();
  const { work, isLoadingWork } = useWork(work_id, user.uid);

  if (isLoadingWork) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="h5">{work.name}</Typography>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <TimeTracking work={work} />
        <TimeActionsBtn work={work} />
      </Stack>
      <ListTime work_id={work.id} />
    </>
  );
}

export default ShowWork;
