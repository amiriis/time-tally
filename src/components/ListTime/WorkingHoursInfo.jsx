'use client'
import convertDurationToTime from "@/lib/convertDurationToTime";
import { Chip, Stack } from "@mui/material";
import { duration } from "jalali-moment";
import { useMemo } from "react";

const WorkingHoursInfo = ({ workingHours, listTime, workingHoursLoading }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutyHours = duty_hours / working_days;
    const workingTimeHours = Math.floor(averageDutyHours);
    const workingTimeMinutes = Math.round((averageDutyHours - workingTimeHours) * 60);


    const total = useMemo(() => {
        let _total_duration = 0;

        listTime.forEach((time) => {
            _total_duration += time.total_time.duration;
        });

        return { duration: convertDurationToTime(_total_duration), average: convertDurationToTime(_total_duration / listTime.length) };
    }, [listTime]);

    const timeDuration = useMemo(() => {
        let _total_duration = 0;
        const totalMinutesFirstTime = total.duration.hours * 60 + total.duration.minutes;
        const totalMinutesSecondTime = (workingTimeHours * 60 + workingTimeMinutes) * listTime.length;

        if (totalMinutesFirstTime > totalMinutesSecondTime) {
            _total_duration = totalMinutesFirstTime - totalMinutesSecondTime
        } else {
            _total_duration = totalMinutesSecondTime - totalMinutesFirstTime
        }

        return { isgreater: totalMinutesFirstTime > totalMinutesSecondTime, duration: convertDurationToTime(_total_duration * 60 * 1000) };
    }, [total.duration, workingTimeHours, workingTimeMinutes, listTime]);

    return (
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack spacing={1}>
                <Chip color="primary" size="small" label={`Duty month hours: ${workingHoursLoading ? "..." : duty_hours}`} variant="outlined" />
                <Chip color="primary" size="small" label={`Duty day time: ${workingHoursLoading ? "..." : `${workingTimeHours.toString().padStart(2, "0")}:${workingTimeMinutes
                    .toString()
                    .padStart(2, "0")}`}`} variant="outlined" />
            </Stack>
            <Stack spacing={1}>
                <Chip color={timeDuration.isgreater ? "success" : 'warning'} size="small" sx={{ px: 2 }} label={`${workingHoursLoading ? "..." : `${total.duration.hours.toString().padStart(2, "0")}:${total.duration.minutes
                    .toString()
                    .padStart(2, "0")}`}`} variant="outlined" />
                <Chip color={timeDuration.isgreater ? "success" : 'warning'} size="small" sx={{ px: 2 }} label={workingHoursLoading ? "..." : `${timeDuration.isgreater ? '+ ' : '- '} ${timeDuration.duration.hours.toString().padStart(2, "0")}:${timeDuration.duration.minutes
                    .toString()
                    .padStart(2, "0")}`} variant="outlined" />
            </Stack>
        </Stack>
    );
}
export default WorkingHoursInfo