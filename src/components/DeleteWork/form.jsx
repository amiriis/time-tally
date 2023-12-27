import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Button, Container, Stack, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { useSWRConfig } from "swr";

function DeleteWorkForm({ work, setOpenDrawer, setDeleting }) {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  const deleteHandler = async (id) => {
    setDeleting(true);
    try {
      
      const querySnapshot = await getDocs(
        query(collection(db, "times"), where("wid", "==", id))
      );

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      await deleteDoc(doc(db, "works", id));

    } catch (error) {
      console.error(error);
      setDeleting(false);
    }
    mutate(`list_work_${user.uid}`);
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
