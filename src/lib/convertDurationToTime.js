import moment from "jalali-moment";

export default function convertDurationToTime(durationInMilliseconds) {
    const duration = moment.duration(durationInMilliseconds);

    const hours = Math.floor(duration.asHours())
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    return { hours, minutes, seconds }
}