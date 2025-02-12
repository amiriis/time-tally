"use client";
import MainSetting from "@/components/SettingsWork/main";
import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

function Page(props) {
    const params = use(props.params);
    const router = useRouter();
    const [work, setWork] = useState();
    const work_id = params.work_id;

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(collection(db, "works"), work_id), (doc) => {
            if (!doc.exists()) {
                router.back();
                return;
            }
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
            <MainSetting show={true} work={work} />
        </>
    );
}

export default Page;
