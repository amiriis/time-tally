import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import moment from "jalali-moment";

function DeleteTimeForm({ time, setOpenDrawer }) {
  const { user } = useAuth();
  
  const deleteHandler = async (id) => {
    try {
      deleteDoc(doc(db, "times", id));
    } catch (error) {
      const errorData = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      };
      addDoc(collection(db, "logs"), {
        action: "delete time",
        params: { id: id },
        user: user,
        error: errorData,
        created_at: moment().toDate(),
      });
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
