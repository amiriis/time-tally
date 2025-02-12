"use client";
import { Chip, Divider, Stack, Typography } from "@mui/material";

const WorkingHoursInfo = ({ workingHours }) => {
    const { duty_hours, working_days } = workingHours;
    const averageDutySeconds = (duty_hours * 3600) / working_days;

    const formattedTime = (hours, minutes) => `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return (
        <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Chip color="primary" size="small" label={`Duty month`} variant="outlined" />
                <Divider sx={{ flex: 1 }} />
                <Typography variant="caption" color={"primary.main"}>
                    {duty_hours} h
                </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Chip color="primary" size="small" label={`Duty day time`} variant="outlined" />
                <Divider sx={{ flex: 1 }} />
                <Typography variant="caption" color={"primary.main"}>
                    {formattedTime(Math.floor(averageDutySeconds / 3600), Math.round((averageDutySeconds % 3600) / 60))}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default WorkingHoursInfo;
