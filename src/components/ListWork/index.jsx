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

function ListWork() {
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
            fromCache: querySnapshot.metadata.fromCache,
          });
        });
        setListWork(_works);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TransitionGroup component={Stack} spacing={2} sx={{ my: 3 }}>
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
