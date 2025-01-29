import { Collapse, Divider, Stack } from "@mui/material";
import TimeInfo from "./TimeInfo";
import TimesCalculator from "./TimesCalculator";
import { TransitionGroup } from "react-transition-group";

function TimeCard({ calendar, times, workingHours }) {
    return (
        <TransitionGroup component={Stack} sx={{ my: 1, border: 1, borderRadius: 1, borderColor: "divider" }}>
            {times.map((time) => (
                <Collapse key={time.id}>
                    <TimeInfo calendar={calendar} time={time} />
                    <Divider sx={{ borderStyle: "dashed" }} />
                </Collapse>
            ))}
            <TimesCalculator times={times} workingHours={workingHours} />
        </TransitionGroup>
    );
}

export default TimeCard;
