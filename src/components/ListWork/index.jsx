"use client";
import { useAuth } from "@/contexts/auth";
import useListWork from "@/hooks/useListWork";
import { Collapse, Stack } from "@mui/material";
import WorkCard from "./workCard";
import { TransitionGroup } from "react-transition-group";

function ListWork() {
  const { user } = useAuth();
  const { listWork, isLoadingListWork } = useListWork(user.uid);

  if (isLoadingListWork) {
    return <div>Loading...</div>;
  }

  return (
    <TransitionGroup component={Stack} spacing={2} sx={{ my: 3 }}>
      {listWork &&
        listWork.map((work) => (
          <Collapse key={work.id}>
            <WorkCard work={work} />
          </Collapse>
        ))}
    </TransitionGroup>
  );
}

export default ListWork;
