"use client";
import AddWork from "@/components/AddWork";
import Loading from "@/components/ListWork/loading";
import WorkCard from "@/components/ListWork/workCard";
import NotFoundData from "@/components/NotFoundData";
import { useApp } from "@/contexts/app";
import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Collapse, Stack, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";

function Page() {
    const { setLocalDb } = useApp();
    const { user } = useAuth();
    const [listWork, setListWork] = useState();

    useEffect(() => {
        const q = query(collection(db, "works"), where("uid", "==", user.uid), orderBy("created_at", "desc"));
        const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
            const _works = [];
            querySnapshot.forEach((doc) => {
                _works.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setListWork(_works);
            setLocalDb(querySnapshot.metadata.fromCache);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h5">Works</Typography>
                <AddWork />
            </Stack>
            {listWork ? (
                listWork && (
                    <>
                        {listWork.length ? (
                            <TransitionGroup component={Stack} sx={{ my: 3 }}>
                                {listWork.map((work) => (
                                    <Collapse key={work.id}>
                                        <WorkCard work={work} />
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        ) : (
                            <NotFoundData width={150} height={150} />
                        )}
                    </>
                )
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Page;
