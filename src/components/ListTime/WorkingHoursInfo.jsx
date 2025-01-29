"use client";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { Chip, Stack } from "@mui/material";
import { useMemo } from "react";

const WorkingHoursInfo = ({ workingHours, listTime, workingHoursLoading }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutyHours = duty_hours / working_days;
    const workingTimeMinutes = Math.round(averageDutyHours * 60);

    const total = useMemo(() => {
        const _total_duration = Object.values(listTime)
            .flat()
            .reduce((sum, time) => sum + time.total_time.duration, 0);
        const daysCount = Object.keys(listTime).length;
        return {
            duration: convertDurationToTime(_total_duration),
            average: convertDurationToTime(_total_duration / daysCount),
        };
    }, [listTime]);

    const timeDuration = useMemo(() => {
        const totalMinutesLogged = total.duration.hours * 60 + total.duration.minutes;
        const totalMinutesExpected = workingTimeMinutes * Object.keys(listTime).length;
        const difference = Math.abs(totalMinutesLogged - totalMinutesExpected);

        return {
            isGreater: totalMinutesLogged > totalMinutesExpected,
            duration: convertDurationToTime(difference * 60 * 1000),
        };
    }, [total.duration, workingTimeMinutes, listTime]);

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
                    label={`Duty day time: ${workingHoursLoading ? "..." : `${String(Math.floor(averageDutyHours)).padStart(2, "0")}:${String(workingTimeMinutes % 60).padStart(2, "0")}`}`}
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
                            : `${String(total.duration.hours).padStart(2, "0")}:${String(total.duration.minutes).padStart(2, "0")}`
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
                            : `${timeDuration.isGreater ? "+ " : "- "} ${String(timeDuration.duration.hours).padStart(2, "0")}:${String(timeDuration.duration.minutes).padStart(2, "0")}`
                    }
                    variant="outlined"
                />
            </Stack>
        </Stack>
    );
};

export default WorkingHoursInfo;
