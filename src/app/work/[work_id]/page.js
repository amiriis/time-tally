import ShowWork from "@/components/ShowWork";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

async function getWork(id) {

    const documentSnapshot = await getDoc(doc(collection(db, 'works'), id));


    if (!documentSnapshot.exists()) {
        throw new Error('Failed to fetch data')
    }

    return { id: documentSnapshot.id, ...documentSnapshot.data() }
}

export async function generateMetadWata({ params, searchParams }, parent) {
    const id = params.work_id

    const work = await getWork(id)

    return {
        title: `Time Tally | ${work.name}`,
    }
}

export default async function Home({ params }) {

    return (
        <>
            <ShowWork work_id={params.work_id} />
        </>
    )
}
