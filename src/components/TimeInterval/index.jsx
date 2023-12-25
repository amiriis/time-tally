"use client";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "jalali-moment";

function TimeInterval({ start_at, stop }) {
  const [timeLoop, setTimeLoop] = useState();
  useEffect(() => {
    const timer = setInterval(() => {
      if (stop) return;
      const started_at = start_at.toDate();

      const durationInMilliseconds = moment().diff(started_at);

      setTimeLoop(durationInMilliseconds);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [timeLoop, start_at, stop]);

  const duration = moment.duration(timeLoop);

  return (
    <Typography variant="caption">
      {timeLoop >= 0
        ? `${Math.floor(duration.asHours())
            .toString()
            .padStart(2, "0")}:${duration
            .minutes()
            .toString()
            .padStart(2, "0")}:${duration
            .seconds()
            .toString()
            .padStart(2, "0")}`
        : `00:00:00`}
    </Typography>
  );
}

export default TimeInterval;
