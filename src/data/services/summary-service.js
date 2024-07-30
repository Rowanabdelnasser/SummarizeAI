export async function generateSummaryService(videoId) {
    const url = "/api/summarize";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ videoId })
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to generate summary:", error);
        if (error instanceof Error) return { error: { message: error.message } };
        return { data: null, error: { message: "Unknown error" } };
    }
}
