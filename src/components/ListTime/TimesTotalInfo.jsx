import convertDurationToTime from "@/lib/convertDurationToTime";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const TimeTotalInfo = ({ workingHours, listTime }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutySeconds = (duty_hours * 3600) / working_days;
    const total = useMemo(() => {
        const _total_duration = Object.values(listTime)
            .flat()
            .reduce((sum, time) => sum + time.total_time.duration, 0);

        const daysCount = Object.keys(listTime).length;

        return {
            duration: convertDurationToTime(_total_duration),
            average: convertDurationToTime(_total_duration / daysCount),
            totalSeconds: _total_duration / 1000,
        };
    }, [listTime]);
    const timeDuration = useMemo(() => {
        const totalSecondsLogged = total.totalSeconds;
        const totalSecondsExpected = averageDutySeconds * Object.keys(listTime).length;
        const differenceSeconds = Math.abs(totalSecondsLogged - totalSecondsExpected);

        return {
            isGreater: totalSecondsLogged > totalSecondsExpected,
            duration: convertDurationToTime(differenceSeconds * 1000),
        };
    }, [total.totalSeconds, averageDutySeconds, listTime]);

    const formattedTime = (hours, minutes) => `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return (
        <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Chip color="primary" size="small" label={`Total time`} variant="outlined" />
                <Divider sx={{ flex: 1 }} />
                <Typography color={"primary.main"}>
                    {formattedTime(total.duration.hours, total.duration.minutes)}
                </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Chip
                    color={timeDuration.isGreater ? "success" : "warning"}
                    size="small"
                    label={`Time difference`}
                    variant="outlined"
                />
                <Divider sx={{ flex: 1 }} />
                <Typography
                    fontWeight={"bold"}
                    color={timeDuration.isGreater ? "success.main" : "warning.main"}
                >{`${timeDuration.isGreater ? "+" : "-"}${formattedTime(
                    timeDuration.duration.hours,
                    timeDuration.duration.minutes
                )}`}</Typography>
            </Stack>
        </Stack>
    );
};
export default TimeTotalInfo;
