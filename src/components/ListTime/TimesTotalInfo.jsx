import convertDurationToTime from "@/lib/convertDurationToTime";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

const TimeTotalInfo = ({ workingHours, listTime }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutySeconds = (duty_hours * 3600) / working_days;
    const total = useMemo(() => {
        const _total_duration = Object.values(listTime);
        const _total_without_overtime = _total_duration
            .flat()
            .reduce((sum, time) => sum + (!time.isOvertime ? time.total_time.duration : 0), 0);
        const _total_overtime = _total_duration
            .flat()
            .reduce((sum, time) => sum + (time.isOvertime ? time.total_time.duration : 0), 0);

        return {
            duration: convertDurationToTime(_total_without_overtime + _total_overtime),
            totalWithoutOvertimeSeconds: _total_without_overtime / 1000,
            totalOvertimeSeconds: _total_overtime / 1000,
        };
    }, [listTime]);

    const timeDuration = useMemo(() => {
        let differenceSeconds = 0;
        const totalSecondsExpected =
            averageDutySeconds *
            Object.keys(listTime).filter((day) => listTime[day].some((entry) => !entry.hasOwnProperty("isOvertime")))
                .length;
        if (total.totalWithoutOvertimeSeconds > 0) {
            differenceSeconds = total.totalWithoutOvertimeSeconds - totalSecondsExpected;
        }

        if (total.totalOvertimeSeconds > 0) {
            differenceSeconds = total.totalOvertimeSeconds + differenceSeconds;
        }
        return {
            isGreater:
                total.totalWithoutOvertimeSeconds > 0
                    ? total.totalWithoutOvertimeSeconds +
                          (total.totalOvertimeSeconds > 0 ? total.totalOvertimeSeconds : 0) >
                      totalSecondsExpected
                    : total.totalOvertimeSeconds > 0,
            duration: convertDurationToTime(Math.abs(differenceSeconds) * 1000),
        };
    }, [total.totalWithoutOvertimeSeconds, total.totalOvertimeSeconds, averageDutySeconds, listTime]);

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
