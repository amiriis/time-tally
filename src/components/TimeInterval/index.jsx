"use client";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import { Stack, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "jalali-moment";
import { useEffect, useMemo, useState } from "react";

function TimeInterval({ start_at, stop, hasWorkingHours = false }) {
  const [timeLoop, setTimeLoop] = useState(0);
  const [workingHours, setWorkingHours] = useState(null);

  useEffect(() => {
    if (stop) return;

    const timer = setInterval(() => {
      const started_at = start_at.toDate();
      const durationInMilliseconds = moment().diff(started_at);
      setTimeLoop(durationInMilliseconds);
    }, 500);

    return () => clearInterval(timer);
  }, [start_at, stop]);

  useEffect(() => {
    if (!hasWorkingHours) return;

    const getWorkingHours = async () => {
      try {
        const now = moment(start_at);
        const year = now.jYear();
        const monthNumber = now.jMonth() + 1;

        const q = query(
          collection(db, "working_hours"),
          where("year", "==", year),
          where("month", "==", monthNumber)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setWorkingHours(doc.data());
        }
      } catch (e) {
        console.log(e);
      }
    };

    getWorkingHours();
  }, [start_at, hasWorkingHours]);

  const duration = useMemo(() => convertDurationToTime(timeLoop), [timeLoop]);

  const timeDuration = useMemo(() => {
    if (!hasWorkingHours || !workingHours) return { isgreater: false, duration: { hours: 0, minutes: 0, seconds: 0 } };

    const { duty_hours, working_days } = workingHours;
    const averageDutyHours = duty_hours / working_days;
    const workingTimeHours = Math.floor(averageDutyHours);
    const workingTimeMinutes = Math.round((averageDutyHours - workingTimeHours) * 60);

    const totalMillisecondsFirstTime = (workingTimeHours * 60 * 60 + workingTimeMinutes * 60) * 1000;
    const totalMillisecondsSecondTime = (duration.hours * 60 * 60 + duration.minutes * 60 + duration.seconds) * 1000;

    const _total_duration = Math.abs(totalMillisecondsFirstTime - totalMillisecondsSecondTime);
    return {
      isgreater: totalMillisecondsFirstTime > totalMillisecondsSecondTime,
      duration: convertDurationToTime(_total_duration)
    };
  }, [duration, workingHours, hasWorkingHours]);

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <Typography variant="caption">
        {timeLoop >= 0
          ? `${duration.hours.toString().padStart(2, "0")}:${duration.minutes.toString().padStart(2, "0")}:${duration.seconds.toString().padStart(2, "0")}`
          : `00:00:00`}
      </Typography>
      {hasWorkingHours && workingHours && (
        <Typography variant="caption" color={timeDuration.isgreater ? 'warning.main' : 'success.main'}>
          {`${timeDuration.isgreater ? '- ' : '+ '}${timeDuration.duration.hours.toString().padStart(2, "0")}:${timeDuration.duration.minutes
            .toString()
            .padStart(2, "0")}:${timeDuration.duration.seconds
              .toString()
              .padStart(2, "0")}`}
        </Typography>
      )}
    </Stack>
  );
}

export default TimeInterval;
