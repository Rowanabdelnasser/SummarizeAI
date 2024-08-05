import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";

export default async function SummaryCardRoute({
    params,
}) {
    const data = await getSummaryById(params.videoId);

    return <SummaryCardForm item={data} />;
}