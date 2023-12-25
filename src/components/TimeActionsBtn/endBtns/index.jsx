"use client";
import TimeInterval from "@/components/TimeInterval";
import { db } from "@/lib/firebase";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Button, ButtonGroup, Stack } from "@mui/material";
import {
  collection,
  deleteField,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import moment from "jalali-moment";
import { useState } from "react";
import { useSWRConfig } from "swr";
import EndToBtn from "./endToBtn";

function EndBtns({ work }) {
  const { mutate } = useSWRConfig();
  const [disabled, setDisabled] = useState();

  const endNowHandler = async (work_id) => {
    setDisabled(true);
    const documentRef = doc(collection(db, "works"), work_id);
    try {
      await runTransaction(db, async (transaction) => {
        const documentSnapshot = await transaction.get(documentRef);
        if (documentSnapshot.exists()) {
          const _work = { id: documentSnapshot.id, ...documentSnapshot.data() };

          if (!_work.is_time_tracking) return;

          const started_at = _work.time_tracking_started_at.toDate();
          const ended_at = moment();

          const durationInMilliseconds = ended_at.diff(started_at);
          const duration = moment.duration(durationInMilliseconds);

          const total_time = {
            duration: durationInMilliseconds,
            hours: Math.floor(duration.asHours()),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
          };

          transaction.set(doc(collection(db, "times")), {
            started_at,
            ended_at: ended_at.toDate(),
            total_time,
            wid: _work.id,
            uid: _work.uid,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          });

          transaction.update(documentRef, {
            is_time_tracking: false,
            time_tracking_started_at: deleteField(),
          });
        } else {
          setDisabled(false);
          throw new Error("Document not found.");
        }
      });
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
    mutate(`get_work_${work.id}`);
    mutate(`list_time_${work.id}`);
  };

  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <ButtonGroup
        color="error"
        size="small"
        disabled={disabled}
        variant="outlined"
      >
        <Button
          onClick={() => endNowHandler(work.id)}
          endIcon={<StopCircleIcon />}
        >
          end now
        </Button>
        <EndToBtn setDisabled={setDisabled} work={work} />
      </ButtonGroup>
      <TimeInterval
        stop={disabled}
        start_at={moment(work.time_tracking_started_at.toDate())}
      />
    </Stack>
  );
}

export default EndBtns;
