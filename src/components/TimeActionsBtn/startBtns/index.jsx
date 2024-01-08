"use client";
import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  updateDoc
} from "firebase/firestore";
import moment from "jalali-moment";
import StartFromBtn from "./startFromBtn";

function StartBtns({ work }) {
  const { user } = useAuth();
  const startNowHandler = (work_id) => {
    const _data = {
      is_time_tracking: true,
      time_tracking_started_at: moment().toDate(),
    };
    try {
      updateDoc(doc(collection(db, "works"), work_id), _data);
    } catch (error) {
      const errorData = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      };
      addDoc(collection(db, "logs"), {
        action: "edit work (start now)",
        params: { old: work, now: _data },
        user: user,
        error: errorData,
        created_at: moment().toDate(),
      });
    }
  };

  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <ButtonGroup size="small" variant="outlined">
        <Button
          onClick={() => startNowHandler(work.id)}
          endIcon={<PlayCircleFilledIcon />}
        >
          start now
        </Button>
        <StartFromBtn work={work} />
      </ButtonGroup>
      <Typography variant="caption">{`Let's go!`}</Typography>
    </Stack>
  );
}

export default StartBtns;
