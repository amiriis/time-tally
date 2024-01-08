"use client";
import WorkCard from "@/components/ListWork/workCard";
import NotFoundData from "@/components/NotFoundData";
import { useApp } from "@/contexts/app";
import { useAuth } from "@/contexts/auth";
import { db } from "@/lib/firebase";
import { Collapse, Stack } from "@mui/material";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import Loading from "./loading";

function ListWork() {
    const { setLocalDb } = useApp();
    const { user } = useAuth();
    const [listWork, setListWork] = useState();

    useEffect(() => {
        const q = query(
            collection(db, "works"),
            where("uid", "==", user.uid),
            orderBy("created_at", "desc")
        );
        const unsubscribe = onSnapshot(
            q,
            { includeMetadataChanges: true },
            (querySnapshot) => {
                const _works = [];
                querySnapshot.forEach((doc) => {
                    _works.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setListWork(_works);
                setLocalDb(querySnapshot.metadata.fromCache);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [user.uid, setLocalDb]);

    if (!listWork) return <Loading />

    return (
        <>
            {listWork && (
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
            )}
        </>
    );
}

export default ListWork;