import dynamic from "next/dynamic";
const YouTubePlayer = dynamic(() => import('@/components/custom/YouTubePlayer'), { ssr: false });
import { extractYouTubeID } from "@/lib/utils";
import { getSummaryById } from "@/data/loaders";
import { notFound } from "next/navigation";
//import YouTubePlayer from "@/components/custom/YouTubePlayer";

export default async function SummarySingleRoute({
    params,
    children,
}) {
    try {
        const data = await getSummaryById(params.videoId);
        console.log(data, "Data From Handler");
        if (data?.error?.status === 404) return <p>No Items Found</p>;
        const videoId = data.videoId ? extractYouTubeID(data.videoId) : null;

        // if (!videoId) {
        //     return <p>Invalid Video ID</p>;
        // }

        return (
            <div>
                <div className="h-full grid gap-4 grid-cols-5 p-4">
                    <div className="col-span-3">{children}</div>
                    <div className="col-span-2">
                        <div>
                            <YouTubePlayer videoId={videoId} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in SummarySingleRoute:", error);
        return notFound();
    }
}