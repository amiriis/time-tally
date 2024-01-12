'use client'
import DeleteWorkForm from '@/components/DeleteWork/form';
import MainSetting from '@/components/SettingsWork/main';
import { db } from '@/lib/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function Page({ params }) {
    const [work, setWork] = useState();
    const work_id = params.work_id

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(collection(db, "works"), work_id),
            (doc) => {
                setWork({
                    id: doc.id,
                    ...doc.data(),
                });
            }
        );

        return () => {
            unsubscribe();
        };
    }, [work_id]);

    return (
        <>
            <DeleteWorkForm work={work} />
        </>
    )
}

export default Page