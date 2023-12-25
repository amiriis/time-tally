import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import useSWR from "swr";

function useListTime(work_id) {
    const { data, isLoading } = useSWR(
        `list_time_${work_id}`,
        async () => {
            try {

                const q = query(
                    collection(db, "times"),
                    where("wid", "==", work_id),
                    orderBy("created_at", "desc")
                );
                const querySnapshot = await getDocs(q);
                return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error(error)
            }
        }
    );

    return { listTime: data, isLoadingListTime: isLoading }
}

export default useListTime