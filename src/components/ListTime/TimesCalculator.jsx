import convertDurationToTime from "@/lib/convertDurationToTime";
import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const TimesCalculator = ({ times, workingHours }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutySeconds = Math.floor((duty_hours * 3600) / working_days);

    const { timeWithoutOvertime, overtimes } = useMemo(() => {
        return times.reduce(
            (acc, time) => {
                if (time.isOvertime) acc.overtimes.push(time);
                else acc.timeWithoutOvertime.push(time);
                return acc;
            },
            { timeWithoutOvertime: [], overtimes: [] }
        );
    }, [times]);

    const totalDurationSeconds = useMemo(
        () => Math.floor(timeWithoutOvertime.reduce((sum, time) => sum + time.total_time.duration, 0) / 1000),
        [timeWithoutOvertime]
    );

    const totalOvertimeDurationSeconds = useMemo(
        () => Math.floor(overtimes.reduce((sum, time) => sum + time.total_time.duration, 0) / 1000),
        [overtimes]
    );

    const timeDifference = useMemo(() => {
        let differenceSeconds = 0;
        if (totalDurationSeconds > 0) {
            differenceSeconds = totalDurationSeconds - averageDutySeconds
        }

        if (totalOvertimeDurationSeconds > 0) {
            differenceSeconds = totalOvertimeDurationSeconds + differenceSeconds
        }

        return {
            isGreater: totalDurationSeconds > 0
                ? (totalDurationSeconds + (totalOvertimeDurationSeconds > 0 ? totalOvertimeDurationSeconds : 0)) > averageDutySeconds
                : totalOvertimeDurationSeconds > 0,
            duration: convertDurationToTime(Math.abs(differenceSeconds) * 1000),
        };
    }, [totalDurationSeconds, totalOvertimeDurationSeconds, averageDutySeconds]);

    const formattedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    return (
        <Stack alignItems="center" sx={{ p: 0.5 }}>
            <Stack direction="row" alignItems="center">
                <Typography variant="caption">{overtimes.length > 0 && timeWithoutOvertime.length > 0 && "("}</Typography>
                {timeWithoutOvertime.length > 0 && (
                    <Typography variant="caption" textAlign="center">
                        {timeWithoutOvertime.length > 1 && "("}
                        {timeWithoutOvertime.map(time =>
                            formattedTime(Math.floor(time.total_time.duration / 1000))
                        ).join(" + ")}
                        {timeWithoutOvertime.length > 1 && ")"}
                    </Typography>
                )}
                {timeWithoutOvertime.length > 0 && (
                    <>
                        <Typography variant="caption" sx={{ mx: 1 }}>-</Typography>
                        <Typography variant="caption">{formattedTime(averageDutySeconds)}</Typography>
                    </>
                )}
                <Typography variant="caption">{overtimes.length > 0 && timeWithoutOvertime.length > 0 && ")"}</Typography>
                {overtimes.length > 0 && (
                    <>
                        {timeWithoutOvertime.length > 0 && <Typography variant="caption" sx={{ mx: 1 }}>+</Typography>}
                        <Typography variant="caption" textAlign="center">
                            {overtimes.length > 1 && "("}
                            {overtimes.map(time =>
                                formattedTime(Math.floor(time.total_time.duration / 1000))
                            ).join(" + ")}
                            {overtimes.length > 1 && ")"}
                        </Typography>
                    </>
                )}
                <Typography variant="caption" color="primary.main" sx={{ mx: 1 }}>=</Typography>
                <Typography
                    variant="body2"
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