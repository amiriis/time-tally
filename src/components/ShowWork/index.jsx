"use client";

import { useAuth } from "@/contexts/auth";
import { Stack, Typography } from "@mui/material";
import ListTime from "../ListTime";
import TimeActionsBtn from "../TimeActionsBtn";
import TimeTracking from "../TimeTracking";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

function ShowWork({ work_id }) {
  const { user } = useAuth();
  const [work, setWork] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collection(db, "works"), work_id),
      (doc) => {
        setWork({ id: doc.id, ...doc.data() });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  if (!work) return;

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
