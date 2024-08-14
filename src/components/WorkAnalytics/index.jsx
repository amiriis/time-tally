import { db } from "@/lib/firebase";
import { Box, Tab, Tabs } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import CustomTabPanel from "../CustomTabPanel";
import WebAnalyticsLastMonth from "../WebAnalyticsLastMonth";
import WebAnalyticsThisMonth from "../WebAnalyticsThisMonth";
import WebAnalyticsTotal from "../WebAnalyticsTotal";

function WorkAnalytics({ work }) {
  const [times, setTime] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            id={`web-analytics-tab-0`}
            aria-controls={`web-analytics-tabpanel-0`}
            label="All"
          />
          <Tab
            id={`web-analytics-tab-1`}
            aria-controls={`web-analytics-tabpanel-1`}
            label="This month"
          />
          <Tab
            id={`web-analytics-tab-2`}
            aria-controls={`web-analytics-tabpanel-2`}
            label="Last month"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <WebAnalyticsTotal
          work={work}
          times={times}
          value={value}
          index={0}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <WebAnalyticsThisMonth
          work={work}
          times={times}
          value={value}
          index={1}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <WebAnalyticsLastMonth
          work={work}
          times={times}
          value={value}
          index={2}
        />
      </CustomTabPanel>
    </>
  );
}

export default WorkAnalytics;
