import { fetchTranscript } from "@/lib/youtube-transcript";
import { getAuthToken } from "@/data/services/get-token";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { data } from "autoprefixer/lib/autoprefixer";

function transformData(data) {
    let text = "";

    data.forEach((item) => {
        text += item.text + " ";
    });

    return {
        data: data,
        text: text.trim(),
    };
}

export async function POST(req) {
    console.log("FROM OUR ROUTE HANDLER:", req.body);

    const user = await getUserMeLoader();
    const token = await getAuthToken();

    if (!user.ok || !token) {
        return new Response(
            JSON.stringify({ data: null, error: "Not authenticated" }),
            { status: 401 }
        );
    }

    if (user.data.credits < 1) {
        return new Response(
            JSON.stringify({ data: null, error: "Insufficient credits" }),
            { status: 402 }
        );
    }

    const body = await req.json();
    const { videoId } = body;

    let transcript;

    try {
        transcript = await fetchTranscript(videoId);

        const transformedData = transformData(transcript);
        console.log("Transcript:", transformedData);
        return new Response(
            JSON.stringify({ data: transcript, error: null }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error processing request:", error);
        if (error instanceof Error)
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify({ error: "Unknown error" }), { status: 500 });
    }
}
