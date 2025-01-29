import { Fade, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import TotalCount from "../TotalCount";
import TotalTimeWork from "../TotalTimeWork";

function WebAnalyticsTotal({ work, times, value, index }) {
    const [count, setCount] = useState(0);
    const [durationInMilliseconds, setDurationInMilliseconds] = useState(0);

    useEffect(() => {
        if (!times) return;

        let _total_duration = 0;

        times.forEach((time) => {
            _total_duration += time.total_time.duration;
        });

        const _count = times.length;

        setCount(_count);
        setDurationInMilliseconds(_total_duration);
    }, [times, work.settings.calendar]);

    return (
        <Fade in={value === index}>
            <Stack sx={{ py: 3 }} spacing={1}>
                <TotalTimeWork durationInMilliseconds={durationInMilliseconds} times={times} work={work} />
                <TotalCount count={count} work={work} times={times} />
            </Stack>
        </Fade>
    );
}

export default WebAnalyticsTotal;
