"use client";
import { useAuth } from "@/contexts/auth";
import { Collapse, Stack } from "@mui/material";
import WorkCard from "./workCard";
import { TransitionGroup } from "react-transition-group";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function ListWork() {
  const { user } = useAuth();
  const [listWork, setListWork] = useState();

  useEffect(() => {
    const q = query(
      collection(db, "works"),
      where("uid", "==", user.uid),
      orderBy("created_at", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _works = [];
      querySnapshot.forEach((doc) => {
        _works.push({ id: doc.id, ...doc.data() });
      });
      setListWork(_works);
    });

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
