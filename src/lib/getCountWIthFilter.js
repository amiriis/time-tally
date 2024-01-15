import moment from "jalali-moment";
import { convertLocaleMomentWithCalendar } from "./convertLocaleMomentWithCalendar";

export const getCountWithFilter = (calendar,times,start,end) => {
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

    return filteredData.length
}