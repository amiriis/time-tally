import { db } from "@/lib/firebase";
import { collection, doc, getDoc, where } from "firebase/firestore";
import useSWR from "swr";

function useWork(work_id, user_id) {
    const { data, isLoading } = useSWR(`get_work_${work_id}`, async () => {
        try {
            const documentSnapshot = await getDoc(
                doc(collection(db, "works"), work_id),
                where("uid", "==", user_id)
            );

            if (!documentSnapshot.exists()) {
                return null;
            }

            return { id: documentSnapshot.id, ...documentSnapshot.data() };
        } catch (error) {
            console.error(error);
        }
    }, {
        revalidateOnFocus: false,
    });

    return { work: data, isLoadingWork: isLoading }
}

export default useWork