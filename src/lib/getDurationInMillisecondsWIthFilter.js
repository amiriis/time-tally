import moment from "jalali-moment";
import { convertFormatMomentWithCalendar } from "./convertFormatMomentWithCalendar";
import { convertLocaleMomentWithCalendar } from "./convertLocaleMomentWithCalendar";

export const getDurationInMillisecondsWIthFilter = (calendar,times,start,end) => {
    const filteredData = [];

    for (const item of times) {
        const itemStartMoment = moment(item.started_at.toDate()).locale(
            convertLocaleMomentWithCalendar(calendar)
        );
        const itemEndMoment = moment(item.ended_at.toDate()).locale(
            convertLocaleMomentWithCalendar(calendar)
        );

        if (itemStartMoment.isSameOrAfter(start) && itemEndMoment.isBefore(end)) {
            filteredData.push(item);
        }
    }

    let total_duration = 0;
    filteredData.forEach((time) => {
        total_duration += time.total_time.duration;
    });

    return total_duration
}