'use client'
import SettingsWorkForm from '@/components/SettingsWork/form';
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
        <SettingsWorkForm work={work} />
    )
}

export default Page