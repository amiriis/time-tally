import convertDurationToTime from "@/lib/convertDurationToTime";
import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const TimesCalculator = ({ times, workingHours }) => {
    const { duty_hours, working_days } = workingHours;

    const averageDutySeconds = Math.floor((duty_hours * 3600) / working_days);

    const totalDurationSeconds = useMemo(
        () => Math.floor(times.reduce((sum, time) => sum + time.total_time.duration, 0) / 1000),
        [times]
    );

    const timeDifference = useMemo(() => {
        const differenceSeconds = Math.abs(totalDurationSeconds - averageDutySeconds);
        return {
            isGreater: totalDurationSeconds > averageDutySeconds,
            duration: convertDurationToTime(differenceSeconds * 1000),
        };
    }, [totalDurationSeconds, averageDutySeconds]);

    const formattedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    return (
        <Stack alignItems="center" sx={{ p: 0.5 }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" textAlign="center">
                    {"("}
                    {times.map((time, index) => (
                        <Typography variant="caption" key={time.id}>
                            {" "}
                            {formattedTime(Math.floor(time.total_time.duration / 1000))}{" "}
                            {index < times.length - 1 && "+"}
                        </Typography>
                    ))}
                    {")"}
                </Typography>
                <Typography variant="caption" textAlign="center">
                    {"-"}
                </Typography>
                <Typography variant="caption" textAlign="center">
                    {formattedTime(averageDutySeconds)}
                </Typography>
                <Typography variant="caption" textAlign="center" color="primary.main">
                    {"="}
                </Typography>
                <Typography
                    variant="body2"
                    textAlign="center"
                    fontWeight="bold"
                    color={timeDifference.isGreater ? "success.main" : "warning.main"}
                >
                    {timeDifference.isGreater ? "+" : "-"}
                    {formattedTime(timeDifference.duration.hours * 3600 + timeDifference.duration.minutes * 60)}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default TimesCalculator;
