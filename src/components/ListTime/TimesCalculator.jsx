import convertDurationToTime from "@/lib/convertDurationToTime";
import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const TimesCalculator = ({ times, workingHours }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutyMinutes = Math.round((duty_hours / working_days) * 60);

    const totalDuration = useMemo(() => times.reduce((sum, time) => sum + time.total_time.duration, 0), [times]);

    const timeDifference = useMemo(() => {
        const totalMinutesLogged = Math.round(totalDuration / 60 / 1000);
        const difference = Math.abs(totalMinutesLogged - averageDutyMinutes);
        return {
            isGreater: totalMinutesLogged > averageDutyMinutes,
            duration: convertDurationToTime(difference * 60 * 1000),
        };
    }, [totalDuration, averageDutyMinutes]);

    return (
        <Stack alignItems="center" sx={{ p: 0.5 }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" textAlign="center">
                    {"("}
                    {times.map((time, index) => (
                        <Typography variant="caption" key={time.id}>
                            {" "}
                            {`${String(time.total_time.hours).padStart(2, "0")}:${String(time.total_time.minutes).padStart(2, "0")}`}{" "}
                            {index < times.length - 1 && "+"}
                        </Typography>
                    ))}
                    {")"}
                </Typography>
                <Typography variant="caption" textAlign="center">
                    {"-"}
                </Typography>
                <Typography variant="caption" textAlign="center">
                    {`${String(Math.floor(averageDutyMinutes / 60)).padStart(2, "0")}:${String(averageDutyMinutes % 60).padStart(2, "0")}`}
                </Typography>
                <Typography variant="caption" textAlign="center" color="primary.main">
                    {"="}
                </Typography>
                <Typography
                    textAlign="center"
                    fontWeight="bold"
                    color={timeDifference.isGreater ? "success.main" : "error.main"}
                >
                    {timeDifference.isGreater ? "+" : "-"}
                    {String(timeDifference.duration.hours).padStart(2, "0")}:
                    {String(timeDifference.duration.minutes).padStart(2, "0")}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default TimesCalculator;
