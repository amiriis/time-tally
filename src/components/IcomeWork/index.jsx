import { CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

function IncomeWork({ durationInMilliseconds, times, work }) {
  const [show, setShow] = useState(false);
  const total_hours = Math.round(durationInMilliseconds / 1000 / 60) / 60;
  const income = total_hours * work.settings.income_coefficient;

  return (
    <Stack direction={"row"} sx={{ px: 2 }} justifyContent={"space-between"}>
      <Typography>Income</Typography>
      {times ? (
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography
            onClick={() => setShow((sh) => !sh)}
            sx={{ cursor: "pointer" }}
            color="primary.main"
          >
            {show ? Math.round(income).toLocaleString("en") : "*******"}
          </Typography>
        </Stack>
      ) : (
        <CircularProgress size={20} />
      )}
    </Stack>
  );
}

export default IncomeWork;
