"use client";

import { useApp } from "@/contexts/app";
import { convertAdapterWithCalendar } from "@/lib/convertAdapterWithCalendar";
import { db } from "@/lib/firebase";
import { Divider, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ListTime from "../ListTime";
import TimeActionsBtn from "../TimeActionsBtn";
import TimeTracking from "../TimeTracking";

function ShowWork({ work_id }) {
    const { setLocalDb } = useApp();
    const [work, setWork] = useState();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(collection(db, "works"), work_id),
            { includeMetadataChanges: true },
            (doc) => {
                setWork({
                    id: doc.id,
                    ...doc.data(),
                });
                setLocalDb(doc.metadata.fromCache);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [work_id, setLocalDb]);

    if (!work) return;

    return (
        <>
            <LocalizationProvider dateAdapter={convertAdapterWithCalendar(work.settings.calendar)}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography variant="h5">{work.name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
                    <TimeTracking work={work} />
                    <TimeActionsBtn work={work} />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <ListTime work={work} />
            </LocalizationProvider>
        </>
    );
}

export default ShowWork;
