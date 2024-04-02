import { convertFormatMomentWithCalendar } from "@/lib/convertFormatMomentWithCalendar";
import { convertLocaleMomentWithCalendar } from "@/lib/convertLocaleMomentWithCalendar";
import { Divider, Fade, Stack } from "@mui/material";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import TotalCount from "../TotalCount";
import TotalTimeWork from "../TotalTimeWork";
import IncomeWork from "../IcomeWork";

function WebAnalyticsThisMonth({
  work,
  times,
  value,
  index,
  showIncome,
  setShowIncome,
}) {
  const [count, setCount] = useState(0);
  const [durationInMilliseconds, setDurationInMilliseconds] = useState(0);

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

    const filteredData = [];

    for (const item of times) {
      const itemStartMoment = moment(item.started_at.toDate()).locale(
        convertLocaleMomentWithCalendar(work.settings.calendar)
      );
      const itemEndMoment = moment(item.ended_at.toDate()).locale(
        convertLocaleMomentWithCalendar(work.settings.calendar)
      );

      if (itemStartMoment.isSameOrAfter(start) && itemEndMoment.isBefore(end)) {
        filteredData.push(item);
      }
    }

    let _total_duration = 0;

    filteredData.forEach((time) => {
      _total_duration += time.total_time.duration;
    });

    const _count = filteredData.length;

    setCount(_count);
    setDurationInMilliseconds(_total_duration);
  }, [times, work.settings.calendar]);

  return (
    <Fade in={value === index}>
      <Stack sx={{ py: 3 }} spacing={1}>
        <TotalTimeWork
          durationInMilliseconds={durationInMilliseconds}
          times={times}
          work={work}
        />
        <TotalCount count={count} work={work} times={times} />
        {work.settings?.income_calculation && (
          <IncomeWork
            durationInMilliseconds={durationInMilliseconds}
            work={work}
            times={times}
            show={showIncome}
            setShow={setShowIncome}
          />
        )}
      </Stack>
    </Fade>
  );
}

export default WebAnalyticsThisMonth;
