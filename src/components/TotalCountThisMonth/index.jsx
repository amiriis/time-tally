import { convertFormatMomentWithCalendar } from "@/lib/convertFormatMomentWithCalendar";
import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";
import { getCountWithFilter } from "@/lib/getCountWIthFilter";
import { CircularProgress, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { useEffect, useState } from "react";

function TotalCountThisMonth({ work, times }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!times) return;

    const format = convertFormatMomentWithCalendar(
      "YYYY",
      "MM",
      "DD",
      "/",
      work.settings.calendar
    );

    const month = moment()
      .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
      .format("YYYY/MM");
    const start = moment(`${month}/01 00:00:00`, `${format} hh:mm:ss`);

    const nextMonth = moment()
      .add(1, "month")
      .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
      .format("YYYY/MM");
    const end = moment(
      `${nextMonth}/01 23:59:59`,
      `${format} hh:mm:ss`
    ).subtract(1, "day");

    const _count = getCountWithFilter(
      work.settings.calendar,
      times,
      start,
      end
    );
    setCount(_count);
  }, [times, work.settings.calendar]);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography>This month</Typography>
      {times ? (
        <Typography
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

export default TotalCountThisMonth;
