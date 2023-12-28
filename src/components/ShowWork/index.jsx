"use client";

import { db } from "@/lib/firebase";
import { Stack, Typography, Chip, Zoom } from "@mui/material";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ListTime from "../ListTime";
import TimeActionsBtn from "../TimeActionsBtn";
import TimeTracking from "../TimeTracking";

function ShowWork({ work_id }) {
  const [work, setWork] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collection(db, "works"), work_id),
      { includeMetadataChanges: true },
      (doc) => {
        setWork({
          id: doc.id,
          ...doc.data(),
          fromCache: doc.metadata.fromCache,
        });
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
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="h5">{work.name}</Typography>
          <Zoom in={work.fromCache}>
            <Chip
              label={"Local"}
              size="small"
              color="warning"
              variant="outlined"
            />
          </Zoom>
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
