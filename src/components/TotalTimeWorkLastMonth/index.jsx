import convertDurationToTime from "@/lib/convertDurationToTime";
import { convertFormatMomentWithCalendar } from "@/lib/convertFormatMomentWithCalendar";
import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";
import { CircularProgress, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { useEffect, useState } from "react";

function TotalTimeWorkLastMonth({ work, times }) {
  const [durationInMilliseconds, setDurationInMilliseconds] = useState(0);

  useEffect(() => {
    if (!times) return;
    const filteredData = [];

    const format = convertFormatMomentWithCalendar(
      "YYYY",
      "MM",
      "DD",
      "/",
      work.settings.calendar
    );

    const month = moment()
      .subtract(1, "month")
      .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
      .format("YYYY/MM");
    const start = moment(`${month}/01 00:00:00`, `${format} hh:mm:ss`);

    const nextMonth = moment()
      .locale(convertLocaleMomentWithCalendar(work.settings.calendar))
      .format("YYYY/MM");
    const end = moment(
      `${nextMonth}/01 23:59:59`,
      `${format} hh:mm:ss`
    ).subtract(1, "day");

    for (const item of times) {
      const itemMoment = moment(item.started_at.toDate()).locale(
        convertLocaleMomentWithCalendar(work.settings.calendar)
      );
      if (itemMoment.isSameOrAfter(start) && itemMoment.isBefore(end)) {
        filteredData.push(item);
      }
    }

    let total_duration = 0;
    filteredData.forEach((time) => {
      total_duration += time.total_time.duration;
    });
    setDurationInMilliseconds(total_duration);
  }, [times, work.settings.calendar]);

  const duration = convertDurationToTime(durationInMilliseconds);

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography>Last month</Typography>
      {times ? (
        <Typography color={"primary.main"}>{`${duration.hours
          .toString()
          .padStart(2, "0")}:${duration.minutes
          .toString()
          .padStart(2, "0")}`}</Typography>
      ) : (
        <CircularProgress size={20} />
      )}
    </Stack>
  );
}

export default TotalTimeWorkLastMonth;
