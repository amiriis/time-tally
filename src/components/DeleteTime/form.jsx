import { db } from '@/lib/firebase';
import { Button, Container, Stack, Typography } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useSWRConfig } from 'swr';

function DeleteTimeForm({time, setOpenDrawer }) {
  const { mutate } = useSWRConfig();

  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "times", id));
    } catch (error) {
      console.error(error);
    }
    mutate(`list_time_${time.wid}`);
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

export default DeleteTimeForm