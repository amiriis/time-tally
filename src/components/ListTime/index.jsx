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

function ListTime({ work_id }) {
  const [listTime, setListTime] = useState();

  useEffect(() => {
    const q = query(
      collection(db, "times"),
      where("wid", "==", work_id),
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
  }, [work_id]);

  return (
    <TransitionGroup component={Stack} spacing={2} sx={{ my: 3 }}>
      {listTime &&
        listTime.map((time) => (
          <Collapse key={time.id}>
            <TimeCard time={time} />
          </Collapse>
        ))}
    </TransitionGroup>
  );
}

export default ListTime;
