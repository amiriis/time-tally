import { Typography } from "@mui/material";
import Started_at from "./started_at";

function TimeTracking({ work }) {
  return (
    <>
      {work.is_time_tracking ? (
        <Started_at work={work} />
      ) : (
        <Typography sx={{ pt: 0.5 }} variant="caption">
          You are not time tracking.
        </Typography>
      )}
    </>
  );
}

export default TimeTracking;
