import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

function IncomeWork({ durationInMilliseconds, times, work }) {
  const total_hours = Math.round(durationInMilliseconds / 1000 / 60) / 60;
  const income = total_hours * work.settings.income_coefficient;

  return (
    <Stack direction={"row"} sx={{ px: 2 }} justifyContent={"space-between"}>
      <Typography>Income</Typography>
      {times ? (
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <PointOfSaleIcon fontSize="small" sx={{ color: "primary.main" }} />
          <Typography color="primary.main">
            {Math.round(income).toLocaleString("en")}
          </Typography>
        </Stack>
      ) : (
        <CircularProgress size={20} />
      )}
    </Stack>
  );
}

export default IncomeWork;
