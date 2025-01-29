"use client";
import convertDurationToTime from "@/lib/convertDurationToTime";
import { db } from "@/lib/firebase";
import { Skeleton, Stack, Typography } from "@mui/material";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import moment from "jalali-moment";
import { useEffect, useMemo, useState } from "react";

function TimeInterval({ workId, start_at, stop, hasWorkingHours = false }) {
    const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [totalTimeOfDay, setTotalTimeOfDay] = useState(null);
    const [totalTimeOfDayLoading, setTotalTimeOfDayLoading] = useState(true);
    const [workingHours, setWorkingHours] = useState(null);
    const [workingHoursLoading, setWorkingHoursLoading] = useState(hasWorkingHours);

    useEffect(() => {
        if (stop) return;

        const updateDuration = () => {
            const diff = moment().diff(start_at.toDate());
            setDuration(convertDurationToTime(diff));
        };

        updateDuration();
        const timer = setInterval(updateDuration, 1000);

        return () => clearInterval(timer);
    }, [start_at, stop]);

    useEffect(() => {
        if (!hasWorkingHours) return;

        const getWorkingHours = async () => {
            setWorkingHoursLoading(true);
            try {
                const now = moment(start_at);
                const q = query(
                    collection(db, "working_hours"),
                    where("year", "==", now.jYear()),
                    where("month", "==", now.jMonth() + 1)
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setWorkingHours(querySnapshot.docs[0].data());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setWorkingHoursLoading(false);
            }
        };

        getWorkingHours();
    }, [hasWorkingHours]);

    useEffect(() => {
        if (!hasWorkingHours) return;

        setTotalTimeOfDayLoading(true);

        const startOfDay = moment(start_at).startOf("day").toDate();
        const endOfDay = moment(start_at).endOf("day").toDate();

        const q = query(
            collection(db, "times"),
            where("wid", "==", workId),
            where("started_at", ">=", startOfDay),
            where("started_at", "<=", endOfDay)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const _times = [];
            querySnapshot.forEach((doc) => {
                _times.push(doc.data().total_time.duration);
            });
            setTotalTimeOfDay(_times.reduce((acc, num) => acc + num, 0));
            setTotalTimeOfDayLoading(false);
        });

        return () => unsubscribe();
    }, [hasWorkingHours]);

    const timeDuration = useMemo(() => {
        if (!hasWorkingHours || !workingHours || totalTimeOfDay === null)
            return { isGreater: false, duration: { hours: 0, minutes: 0, seconds: 0 } };

        const { duty_hours, working_days } = workingHours;
        const dutySeconds = (duty_hours * 3600) / working_days;
        const currentSeconds = (totalTimeOfDay / 1000) + (duration.hours * 3600 + duration.minutes * 60 + duration.seconds);
        const diffSeconds = Math.abs(dutySeconds - currentSeconds);
        return {
            isGreater: dutySeconds > currentSeconds,
            duration: convertDurationToTime(diffSeconds * 1000),
        };
    }, [totalTimeOfDay, duration, workingHours, hasWorkingHours]);


    const formatTime = ({ hours, minutes, seconds }) =>
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption">
                {formatTime(duration)}
            </Typography>
            {hasWorkingHours && (
                workingHoursLoading || totalTimeOfDayLoading ? (
                    <Skeleton variant="rounded" width={70} height={20} />
                ) : (
                    workingHours && (
                        <Typography variant="caption" color={timeDuration.isGreater ? "warning.main" : "success.main"}>
                            {`${timeDuration.isGreater ? "- " : "+ "}${formatTime(timeDuration.duration)}`}
                        </Typography>
                    )
                )
            )}
        </Stack>
    );
}

export default TimeInterval;