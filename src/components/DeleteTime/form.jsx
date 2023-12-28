import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";

function DeleteTimeForm({ time, setOpenDrawer }) {
  const deleteHandler = async (id) => {
    try {
      deleteDoc(doc(db, "times", id));
    } catch (error) {
      console.error(error);
    }
    setOpenDrawer(false);
  };

  return (
    <Container maxWidth={"xs"} sx={{ py: 5 }}>
      <Stack
        spacing={3}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography>Do you want to delete the time?</Typography>
        <Button onClick={() => deleteHandler(time.id)} color="error">
          Yes, do it
        </Button>
      </Stack>
    </Container>
  );
}

export default DeleteTimeForm;
