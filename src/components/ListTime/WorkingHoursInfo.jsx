"use client";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { Chip, Stack } from "@mui/material";
import { useMemo } from "react";

const WorkingHoursInfo = ({ workingHours, listTime, workingHoursLoading }) => {
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

    const formattedTime = (hours, minutes) =>
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    return (
        <Stack direction="row" justifyContent="space-between">
            <Stack spacing={1}>
                <Chip
                    color="primary"
                    size="small"
                    label={`Duty month hours: ${workingHoursLoading ? "..." : duty_hours}`}
                    variant="outlined"
                />
                <Chip
                    color="primary"
                    size="small"
                    label={`Duty day time: ${workingHoursLoading
                        ? "..."
                        : formattedTime(Math.floor(averageDutySeconds / 3600), Math.round((averageDutySeconds % 3600) / 60))
                        }`}
                    variant="outlined"
                />
            </Stack>
            <Stack spacing={1}>
                <Chip
                    color={timeDuration.isGreater ? "success" : "warning"}
                    size="small"
                    sx={{ px: 2 }}
                    label={
                        workingHoursLoading
                            ? "..."
                            : formattedTime(total.duration.hours, total.duration.minutes)
                    }
                    variant="outlined"
                />
                <Chip
                    color={timeDuration.isGreater ? "success" : "warning"}
                    size="small"
                    sx={{ px: 2 }}
                    label={
                        workingHoursLoading
                            ? "..."
                            : `${timeDuration.isGreater ? "+ " : "- "}${formattedTime(
                                timeDuration.duration.hours,
                                timeDuration.duration.minutes
                            )}`
                    }
                    variant="outlined"
                />
            </Stack>
        </Stack>
    );
};

export default WorkingHoursInfo;
