import useListTime from "@/hooks/useListTime";
import { Stack } from "@mui/material";
import TimeCard from "./TimeCard";

function ListTime({ work_id }) {
  const { listTime, isLoadingListTime } = useListTime(work_id);

  if (isLoadingListTime) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {listTime &&
        listTime.map((time) => <TimeCard key={time.id} time={time} />)}
    </Stack>
  );
}

export default ListTime;
