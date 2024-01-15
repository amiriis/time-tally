import { db } from "@/lib/firebase";
import { Divider, Stack } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import TotalTimeWork from "../TotalTimeWork";
import TotalTimeWorkLastMonth from "../TotalTimeWorkLastMonth";
import TotalTimeWorkThisMonth from "../TotalTimeWorkThisMonth";
import TotalCountThisMonth from "../TotalCountThisMonth";
import TotalCountLastMonth from "../TotalCountLastMonth";
import TotalCount from "../TotalCount";

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
      <Divider>Time</Divider>
      <TotalTimeWorkThisMonth work={work} times={times} />
      <TotalTimeWorkLastMonth work={work} times={times} />
      <TotalTimeWork work={work} times={times} />
      <Divider>Count</Divider>
      <TotalCountThisMonth work={work} times={times} />
      <TotalCountLastMonth work={work} times={times} />
      <TotalCount work={work} times={times} />
    </Stack>
  );
}

export default WorkAnalytics;
