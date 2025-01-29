"use client";
import { db } from "@/lib/firebase";
import { Button, Stack, Typography } from "@mui/material";
import { collection, deleteDoc, getDocs, query } from "firebase/firestore";

const deleteLogs = async () => {
    try {
        const querySnapshot = await getDocs(query(collection(db, "logs")));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {}
};

function Page() {
    return (
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h5">Errors</Typography>
            <Button onClick={deleteLogs} variant="outlined" color="error">
                clear
            </Button>
        </Stack>
    );
}

export default Page;
