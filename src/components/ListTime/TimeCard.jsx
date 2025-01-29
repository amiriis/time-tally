import { Divider, Stack } from "@mui/material";
import TimeInfo from "./TimeInfo";
import TimesCalculator from "./TimesCalculator";

function TimeCard({ calendar, times, workingHours }) {
    return (
        <Stack sx={{ my: 1, border: 1, borderRadius: 1, borderColor: "divider" }}>
            {times.map((time) => (
                <Stack key={time.id}>
                    <TimeInfo calendar={calendar} time={time} />
                    <Divider sx={{ borderStyle: "dashed" }} />
                </Stack>
            ))}
            <TimesCalculator times={times} workingHours={workingHours} />
        </Stack>
    );
}

export default TimeCard;
