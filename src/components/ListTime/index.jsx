import useListTime from "@/hooks/useListTime";
import { Collapse, Stack } from "@mui/material";
import TimeCard from "./TimeCard";
import { TransitionGroup } from "react-transition-group";

function ListTime({ work_id }) {
  const { listTime, isLoadingListTime } = useListTime(work_id);

  if (isLoadingListTime) {
    return <div>Loading...</div>;
  }

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
