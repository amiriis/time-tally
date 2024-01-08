import AddWork from "@/components/AddWork";
import ListWork from "@/components/ListWork";
import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Works</Typography>
        <AddWork />
      </Stack>
      <ListWork />
    </>
  );
}
