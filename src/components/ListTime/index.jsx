import { db } from "@/lib/firebase";
import { Box, Collapse, Stack } from "@mui/material";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import LoadingTimes from "../LoadingTimes";
import NotFoundData from "../NotFoundData";
import FilterMonth from "./FilterMonth";
import TimeCard from "./TimeCard";
import TimeTotalInfo from "./TimesTotalInfo";
import WorkingHoursInfo from "./WorkingHoursInfo";

function ListTime({ workId, calendar }) {
    const [listTime, setListTime] = useState(null);
    const [filterMonth, setFilterMonth] = useState("current");
    const [workingHours, setWorkingHours] = useState(null);
    const [listTimeLoading, setListTimeLoading] = useState(true);
    const [workingHoursLoading, setWorkingHoursLoading] = useState(true);

    const isLoading = listTimeLoading || workingHoursLoading;

    useEffect(() => {
        const getYearAndMonth = (month) => {
            const now = moment();
            let year, monthNumber;

            if (month === "current") {
                year = now.jYear();
                monthNumber = now.jMonth() + 1;
            } else if (month === "last") {
                const last = now.subtract(1, "jMonth");
                year = last.jYear();
                monthNumber = last.jMonth() + 1;
            }

            return { year, monthNumber };
        };

        setWorkingHoursLoading(true);

        const { year, monthNumber } = getYearAndMonth(filterMonth);
        const q = query(collection(db, "working_hours"), where("year", "==", year), where("month", "==", monthNumber));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                setWorkingHours(doc.data());
            } else {
                setWorkingHours(null);
            }
            setWorkingHoursLoading(false);
        });

        return () => unsubscribe();
    }, [filterMonth]);

    useEffect(() => {
        setListTimeLoading(true);

        const getMonthRange = (month) => {
            const now = moment();
            let startOfMonth, endOfMonth;

            if (month === "current") {
                startOfMonth = now.startOf("jMonth").toDate();
                endOfMonth = now.endOf("jMonth").toDate();
            } else if (month === "last") {
                const last = now.subtract(1, "jMonth");
                startOfMonth = last.startOf("jMonth").toDate();
                endOfMonth = last.endOf("jMonth").toDate();
            }
            return { startOfMonth, endOfMonth };
        };

        const { startOfMonth, endOfMonth } = getMonthRange(filterMonth);

        const q = query(
            collection(db, "times"),
            where("wid", "==", workId),
            where("started_at", ">=", startOfMonth),
            where("started_at", "<=", endOfMonth),
            orderBy("started_at", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const _times = [];
            querySnapshot.forEach((doc) => {
                _times.push({ id: doc.id, ...doc.data() });
            });

            const groupedByDay = _times.reduce((acc, curr) => {
                const day = moment(curr.started_at.toDate()).format("YYYY-MM-DD");
                if (!acc[day]) acc[day] = [];
                acc[day].push(curr);
                return acc;
            }, {});

            setListTime(groupedByDay);
            setListTimeLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [filterMonth]);

    return (
        <Stack spacing={1}>
            <Stack direction={"row"} spacing={3}>
                <Box sx={{ flex: 2 }}>{workingHours && <WorkingHoursInfo workingHours={workingHours} />}</Box>
                <FilterMonth filterMonth={filterMonth} setFilterMonth={setFilterMonth} />
            </Stack>
            {isLoading ? (
                <LoadingTimes />
            ) : (
                listTime &&
                workingHours && (
                    <>
                        <TimeTotalInfo workingHours={workingHours} listTime={listTime} />
                        {Object.keys(listTime).length ? (
                            <TransitionGroup component={Stack}>
                                {Object.entries(listTime).map(([day, times]) => (
                                    <Collapse key={day}>
                                        <TimeCard calendar={calendar} times={times} workingHours={workingHours} />
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        ) : (
                            <NotFoundData width={200} height={200} />
                        )}
                    </>
                )
            )}
        </Stack>
    );
}

export default ListTime;
