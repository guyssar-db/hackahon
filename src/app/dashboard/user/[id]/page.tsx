// import MainLayout from "@/layouts/mainlayout";

export default async function ProductPage({
    params,
}: {
    params: { id: number };
}) {
    const { id } = await params

    return <>event details {id}</>;
}

