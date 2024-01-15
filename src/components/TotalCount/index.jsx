import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function TotalCount({ work, times }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!times) return;

    setCount(times.length);
  }, [times]);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography fontWeight={"bold"}>Total count</Typography>
      {times ? (
        <Typography
          fontWeight={"bold"}
          color={work.is_time_tracking ? "warning.main" : "primary.main"}
        >
          {count}
        </Typography>
      ) : (
        <CircularProgress size={20} />
      )}
    </Stack>
  );
}

export default TotalCount;
