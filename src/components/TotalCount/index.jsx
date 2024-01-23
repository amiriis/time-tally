import { CircularProgress, Stack, Typography } from "@mui/material";

function TotalCount({ count, work, times }) {
  return (
    <Stack direction={"row"} sx={{ px: 2 }} justifyContent={"space-between"}>
      <Typography>Count</Typography>
      {times ? (
        <Typography color="primary.main">{count}</Typography>
      ) : (
        <CircularProgress size={20} />
      )}
    </Stack>
  );
}

export default TotalCount;
