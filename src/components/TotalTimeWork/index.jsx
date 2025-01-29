"use client";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

function TotalTimeWork({ durationInMilliseconds, times, work }) {
    const duration = useMemo(() => convertDurationToTime(durationInMilliseconds), [durationInMilliseconds]);
    return (
        <Stack direction={"row"} sx={{ px: 2 }} justifyContent={"space-between"}>
            <Typography>Times</Typography>
            {times ? (
                <Typography color="primary.main">{`${duration.hours.toString().padStart(2, "0")}:${duration.minutes
                    .toString()
                    .padStart(2, "0")}`}</Typography>
            ) : (
                <CircularProgress size={20} />
            )}
        </Stack>
    );
}

export default TotalTimeWork;
