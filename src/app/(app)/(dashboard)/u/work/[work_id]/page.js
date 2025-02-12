import ShowWork from "@/components/ShowWork";

export default async function Home(props) {
    const params = await props.params;
    return (
        <>
            <ShowWork work_id={params.work_id} />
        </>
    );
}
