import { Collapse, Stack } from "@mui/material";
import TimeCard from "./TimeCard";
import { TransitionGroup } from "react-transition-group";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import NotFoundData from "../NotFoundData";

function ListTime({ work }) {
  const [listTime, setListTime] = useState();

  useEffect(() => {
    const q = query(
      collection(db, "times"),
      where("wid", "==", work.id),
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
