"use client";
import TimeInterval from "@/components/TimeInterval";
import { useAuth } from "@/contexts/auth";
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
import EndToBtn from "./endToBtn";

function EndBtns({ work }) {
  const { user } = useAuth();

  const endNowHandler = async () => {
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

    const _dataTime = {
      started_at,
      ended_at: ended_at.toDate(),
      total_time,
      wid: work.id,
      uid: work.uid,
      created_at: moment().toDate(),
      updated_at: moment().toDate(),
    };
    const _dataWork = {
      is_time_tracking: false,
      time_tracking_started_at: deleteField(),
    };
    try {
      addDoc(collection(db, "times"), _dataTime);

      updateDoc(doc(collection(db, "works"), work.id), _dataWork);
    } catch (error) {
      const errorData = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      };
      addDoc(collection(db, "logs"), {
        action: "add time and edit work (end now)",
        params: { old: { work }, now: { work: _dataWork, time: _dataTime } },
        user: user,
        error: errorData,
        created_at: moment().toDate(),
      });
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
      <TimeInterval start_at={moment(work.time_tracking_started_at.toDate())} hasWorkingHours={true} />
    </Stack>
  );
}

export default EndBtns;
