import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "jalali-moment";
import { useRouter } from "next/navigation";

const deleteTimes = async (id) => {
  const querySnapshot = await getDocs(
    query(collection(db, "times"), where("wid", "==", id))
  );

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

function DeleteWorkForm({ work }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteHandler = async (id) => {
    try {
      deleteTimes(id);
      deleteDoc(doc(db, "works", id));
    } catch (error) {
      const errorData = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      };
      addDoc(collection(db, "logs"), {
        action: "delete work",
        params: { id: id },
        user: user,
        error: errorData,
        created_at: moment().toDate(),
      });
    }
    router.back();
  };

  return (
    <Container maxWidth={"xs"} sx={{ my: 1 }}>
      <Typography variant="subtitle2" color={"primary.main"}>
        Settings / Change calendar
      </Typography>
      <Stack
        spacing={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={() => router.back()}>
            <ArrowBack fontSize="inherit" />
          </IconButton>
          <Typography>
            Do you want to delete <strong>{work?.name}</strong>?
          </Typography>
        </Stack>
        <Button onClick={() => deleteHandler(work?.id)} color="error">
          Yes, do it
        </Button>
      </Stack>
    </Container>
  );
}

export default DeleteWorkForm;
