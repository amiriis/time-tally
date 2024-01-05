import convertDurationToTime from "@/lib/convertDurationToTime";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function TotalTimeWork({ work, times }) {
  const [durationInMilliseconds, setDurationInMilliseconds] = useState(0);

  useEffect(() => {
    if (!times) return;
    let total_duration = 0;
    times.forEach((time) => {
      total_duration += time.total_time.duration;
    });
    setDurationInMilliseconds(total_duration);
  }, [times]);

  const duration = convertDurationToTime(durationInMilliseconds);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography fontWeight={"bold"}>Total time</Typography>
      {times ? (
        <Typography
          fontWeight={"bold"}
          color={work.is_time_tracking ? "warning.main" : "primary.main"}
        >{`${duration.hours.toString().padStart(2, "0")}:${duration.minutes
          .toString()
          .padStart(2, "0")}`}</Typography>
      ) : (
        <CircularProgress size={20} />
      )}
    </Stack>
  );
}

export default TotalTimeWork;
