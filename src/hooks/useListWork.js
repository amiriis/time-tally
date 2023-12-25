import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import useSWR from 'swr';

const useListWork = (user_id) => {
    const { data, isLoading } = useSWR(`list_work_${user_id}`, async () => {
        try {
            const q = query(
                collection(db, "works"),
                where("uid", "==", user_id),
                orderBy("created_at", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error(error)
        }
    }, {
        revalidateOnFocus: false,
    });

    return { listWork: data, isLoadingListWork: isLoading }
}

export default useListWork