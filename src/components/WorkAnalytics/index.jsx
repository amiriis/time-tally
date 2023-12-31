import { db } from "@/lib/firebase";
import { Stack } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import TotalTimeWork from "../TotalTimeWork";
import TotalTimeWorkLastMonth from "../TotalTimeWorkLastMonth";
import TotalTimeWorkThisMonth from "../TotalTimeWorkThisMonth";

function WorkAnalytics({ work }) {
  const [times, setTime] = useState();
  useEffect(() => {
    const q = query(collection(db, "times"), where("wid", "==", work.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _times = [];
      querySnapshot.forEach((doc) => {
        _times.push({ id: doc.id, ...doc.data() });
      });
      setTime(_times);
    });

    return () => {
      unsubscribe();
    };
  }, [work]);

  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      <TotalTimeWorkThisMonth work={work} times={times} />
      <TotalTimeWorkLastMonth work={work} times={times} />
      <TotalTimeWork times={times} />
    </Stack>
  );
}

export default WorkAnalytics;
