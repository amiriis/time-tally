"use client";
import DeleteWorkForm from "@/components/DeleteWork/form";
import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { use, useEffect, useState } from "react";

function Page(props) {
    const params = use(props.params);
    const [work, setWork] = useState();
    const work_id = params.work_id;

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(collection(db, "works"), work_id), (doc) => {
            setWork({
                id: doc.id,
                ...doc.data(),
            });
        });

        return () => {
            unsubscribe();
        };
    }, [work_id]);

    return (
        <>
            <DeleteWorkForm work={work} />
        </>
    );
}

export default Page;
