"use client";
import { db } from "@/lib/firebase";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import StartFromBtn from "./startFromBtn";
import moment from "jalali-moment";

function StartBtns({ work }) {
  const [disabled, setDisabled] = useState();

  const startNowHandler = (work_id) => {
    setDisabled(true);
    try {
      updateDoc(doc(collection(db, "works"), work_id), {
        is_time_tracking: true,
        time_tracking_started_at: moment().toDate(),
      });
    } catch (error) {
      console.error("re", error);
    }
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
