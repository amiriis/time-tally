import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "jalali-moment";
import convertDurationToTime from "@/lib/convertDurationToTime";

function TotalTimeWork({ times }) {
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
      <Typography>Total time</Typography>
      {times ? (
        <Typography color={'primary.main'}>{`${duration.hours
          .toString()
          .padStart(2, "0")}:${duration.minutes
          .toString()
          .padStart(2, "0")}`}</Typography>
      ) : (
        <CircularProgress size={20}/>
      )}
    </Stack>
  );
}

export default TotalTimeWork;
