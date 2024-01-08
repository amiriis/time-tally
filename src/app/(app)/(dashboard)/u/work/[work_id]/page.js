import ShowWork from "@/components/ShowWork";

export default async function Home({ params }) {
  return (
    <>
      <ShowWork work_id={params.work_id} />
    </>
  );
}
