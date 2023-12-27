"use client";
import { db } from "@/lib/firebase";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import TimerIcon from "@mui/icons-material/Timer";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { useSWRConfig } from "swr";
import StartFromBtn from "./startFromBtn";

function StartBtns({ work }) {
  const { mutate } = useSWRConfig();
  const [disabled, setDisabled] = useState();

  const startNowHandler = async (work_id) => {
    setDisabled(true);
    const documentRef = doc(collection(db, "works"), work_id);
    try {
      await runTransaction(db, async (transaction) => {
        const documentSnapshot = await transaction.get(documentRef);
        if (documentSnapshot.exists()) {
          const _work = documentSnapshot.data();

          if (_work.is_time_tracking) return;

          transaction.update(documentRef, {
            is_time_tracking: true,
            time_tracking_started_at: serverTimestamp(),
          });
        } else {
          throw new Error("Document not found.");
        }
      });
    } catch (error) {
      console.error(error);
    }
    mutate(`get_work_${work.id}`);
  };

  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <ButtonGroup size="small" disabled={disabled} variant="outlined">
        <Button
          onClick={() => startNowHandler(work.id)}
          endIcon={<PlayCircleFilledIcon />}
        >
          start now
        </Button>
        <StartFromBtn setDisabled={setDisabled} work={work} />
      </ButtonGroup>
      <Typography variant="caption">{`Let's go!`}</Typography>
    </Stack>
  );
}

export default StartBtns;
