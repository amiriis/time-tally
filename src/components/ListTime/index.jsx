import { db } from "@/lib/firebase";
import { Box, Collapse, Stack } from "@mui/material";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import NotFoundData from "../NotFoundData";
import FilterMonth from "./FilterMonth";
import TimeCard from "./TimeCard";
import WorkingHoursInfo from "./WorkingHoursInfo";

function ListTime({ work }) {
  const [listTime, setListTime] = useState();
  const [filterMonth, setFilterMonth] = useState('current');
  const [workingHours, setWorkingHours] = useState(null);
  const [workingHoursLoading, setWorkingHoursLoading] = useState(true);

  useEffect(() => {

    const getMonthRange = (month) => {
      const now = moment();
      let startOfMonth, endOfMonth;

      if (month === 'current') {
        startOfMonth = now.startOf("jMonth").toDate();
        endOfMonth = now.endOf("jMonth").toDate();
      } else if (month === 'last') {
        const last = now.subtract(1, "jMonth");
        startOfMonth = last.startOf("jMonth").toDate();
        endOfMonth = last.endOf("jMonth").toDate();
      }
      return { startOfMonth, endOfMonth };
    };

    const { startOfMonth, endOfMonth } = getMonthRange(filterMonth);

    const q = query(
      collection(db, "times"),
      where("wid", "==", work.id),
      where("created_at", ">=", startOfMonth),
      where("created_at", "<=", endOfMonth),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _times = [];
      querySnapshot.forEach((doc) => {
        _times.push({ id: doc.id, ...doc.data() });
      });
      setListTime(_times);
    });

    return () => {
      unsubscribe();
    };
  }, [work, filterMonth]);

  useEffect(() => {
    const getYearAndMonth = (month) => {
      const now = moment();
      let year, monthNumber;

      if (month === 'current') {
        year = now.jYear();
        monthNumber = now.jMonth() + 1;
      } else if (month === 'last') {
        const last = now.subtract(1, "jMonth");
        year = last.jYear();
        monthNumber = last.jMonth() + 1;
      }

      return { year, monthNumber };
    };

    const getWorkingHours = async () => {
      setWorkingHoursLoading(true);
      try {
        const { year, monthNumber } = getYearAndMonth(filterMonth);


        const q = query(
          collection(db, "working_hours"),
          where("year", "==", year),
          where("month", "==", monthNumber)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setWorkingHours(doc.data());
          setWorkingHoursLoading(false);
        }
      } catch (e) {
      }
    }

    getWorkingHours();

  }, [work, filterMonth])

  return (
    <Stack spacing={1}>
      <Stack direction={'row'}><Box sx={{ flex: 2 }}></Box><FilterMonth filterMonth={filterMonth} setFilterMonth={setFilterMonth} /></Stack>
      {(listTime && workingHours) && (
        <>
          <WorkingHoursInfo workingHours={workingHours} listTime={listTime} workingHoursLoading={workingHoursLoading} />
          {listTime.length ? (
            <TransitionGroup component={Stack}>
              {listTime.map((time) => (
                <Collapse key={time.id}>
                  <TimeCard work={work} time={time} workingHours={workingHours} />
                </Collapse>
              ))}
            </TransitionGroup>
          ) : (
            <NotFoundData width={200} height={200} />
          )}
        </>
      )}
    </Stack>
  );
}

export default ListTime;
