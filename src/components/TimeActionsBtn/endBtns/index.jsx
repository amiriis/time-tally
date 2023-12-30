"use client";
import TimeInterval from "@/components/TimeInterval";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Button, ButtonGroup, Stack } from "@mui/material";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import moment from "jalali-moment";
import { useState } from "react";
import EndToBtn from "./endToBtn";

function EndBtns({ work }) {
  const endNowHandler = async () => {
    try {
      const started_at = work.time_tracking_started_at.toDate();
      const ended_at = moment();

      const durationInMilliseconds = ended_at.diff(started_at);
      const duration = convertDurationToTime(durationInMilliseconds);

      const total_time = {
        duration: durationInMilliseconds,
        hours: duration.hours,
        minutes: duration.minutes,
        seconds: duration.seconds,
      };

      addDoc(collection(db, "times"), {
        started_at,
        ended_at: ended_at.toDate(),
        total_time,
        wid: work.id,
        uid: work.uid,
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      });

      updateDoc(doc(collection(db, "works"), work.id), {
        is_time_tracking: false,
        time_tracking_started_at: deleteField(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <ButtonGroup color="error" size="small" variant="outlined">
        <Button
          onClick={() => endNowHandler(work.id)}
          endIcon={<StopCircleIcon />}
        >
          end now
        </Button>
        <EndToBtn work={work} />
      </ButtonGroup>
      <TimeInterval start_at={moment(work.time_tracking_started_at.toDate())} />
    </Stack>
  );
}

export default EndBtns;
