import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const deleteTimes = async (id) => {
  const querySnapshot = await getDocs(
    query(collection(db, "times"), where("wid", "==", id))
  );

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

function DeleteWorkForm({ work, setOpenDrawer }) {
  const deleteHandler = async (id) => {
    try {
      deleteTimes(id);
      deleteDoc(doc(db, "works", id));
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
        <Typography>
          Do you want to delete <strong>{work.name}</strong>?
        </Typography>
        <Button onClick={() => deleteHandler(work.id)} color="error">
          Yes, do it
        </Button>
      </Stack>
    </Container>
  );
}

export default DeleteWorkForm;
