"use client";
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
import WorkCard from "./workCard";
import { useApp } from "@/contexts/app";

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

  return (
    <TransitionGroup component={Stack} sx={{ my: 3 }}>
      {listWork &&
        listWork.map((work) => (
          <Collapse key={work.id}>
            <WorkCard work={work} />
          </Collapse>
        ))}
    </TransitionGroup>
  );
}

export default ListWork;
