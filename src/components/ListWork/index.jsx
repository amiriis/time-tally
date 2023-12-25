"use client";
import { useAuth } from "@/contexts/auth";
import useListWork from "@/hooks/useListWork";
import { Stack } from "@mui/material";
import WorkCard from "./workCard";

function ListWork() {
  const { user } = useAuth();
  const { listWork, isLoadingListWork } = useListWork(user.uid);

  if (isLoadingListWork) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {listWork &&
        listWork.map((work) => <WorkCard key={work.id} work={work} />)}
    </Stack>
  );
}

export default ListWork;
