"use client";

import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, where } from "firebase/firestore";
import useSWR from "swr";
import ListTime from "../ListTime";
import TimeActionsBtn from "../TimeActionsBtn";
import TimeTracking from "../TimeTracking";

function ShowWork({ work_id }) {
  const { user } = useAuth();
  const { data: work, isLoading } = useSWR(`get_work_${work_id}`, async () => {
    try {
      const documentSnapshot = await getDoc(
        doc(collection(db, "works"), work_id),
        where("uid", "==", user.id)
      );

      if (!documentSnapshot.exists()) {
        return null;
      }

      return { id: documentSnapshot.id, ...documentSnapshot.data() };
    } catch (error) {
      console.error(error);
    }
  });

  if (isLoading) {
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
