import { db } from "@/lib/firebase";
import { Collapse, Stack } from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import NotFoundData from "../NotFoundData";
import TimeCard from "./TimeCard";

function ListTime({ work }) {
  const [listTime, setListTime] = useState();

  useEffect(() => {
    const getCurrentShamsiMonthRange = () => {
      const moment = require("jalali-moment");
      const now = moment();
      const startOfMonth = now.startOf("jMonth").toDate();
      const endOfMonth = now.endOf("jMonth").toDate();
      return { startOfMonth, endOfMonth };
    };

    const { startOfMonth, endOfMonth } = getCurrentShamsiMonthRange();

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
  }, [work]);

  return (
    <>
      {listTime && (
        <>
          {listTime.length ? (
            <TransitionGroup component={Stack} sx={{ my: 3 }}>
              {listTime.map((time) => (
                <Collapse key={time.id}>
                  <TimeCard work={work} time={time} />
                </Collapse>
              ))}
            </TransitionGroup>
          ) : (
            <NotFoundData width={200} height={200} />
          )}
        </>
      )}
    </>
  );
}

export default ListTime;
