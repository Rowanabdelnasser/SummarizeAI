"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn, extractYouTubeID } from "@/lib/utils";

import { generateSummaryService } from "@/data/services/summary-service";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/SubmitButton";

const INITIAL_STATE = {
    message: null,
    name: "",
};

export function SummaryForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(INITIAL_STATE);
    const [value, setValue] = useState("");

    async function handleFormSubmit(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const videoId = formData.get("videoId");

            const processedVideoId = extractYouTubeID(videoId);

            if (!processedVideoId) {
                toast.error("Invalid Youtube Video ID");
                setLoading(false);
                setValue("");
                setError({
                    ...INITIAL_STATE,
                    message: "Invalid Youtube Video ID",
                    name: "Invalid Id",
                });
                return;
            }

            const summaryResponseData = await generateSummaryService(videoId);
            console.log("Response from route handler:", summaryResponseData);

            if (summaryResponseData.error) {
                setValue("");
                toast.error(summaryResponseData.error);
                setError({
                    ...INITIAL_STATE,
                    message: summaryResponseData.error,
                    name: "Summary Error",
                });
                setLoading(false);
                return;
            }

            toast.success("Summary Created");
        }
        catch (error) {
            console.error("Error during form submission:", error);
            setError({ message: error.message, name: "videoId" });
        } finally {
            setLoading(false);
        }
    }

    function clearError() {
        setError(INITIAL_STATE);
        if (error.message) setValue("");
    }

    const errorStyles = error.message
        ? "outline-1 outline outline-red-500 placeholder:text-red-700"
        : "";

    return (
        <div className="w-full max-w-[960px]">
            <form
                onSubmit={handleFormSubmit}
                className="flex gap-2 items-center justify-center"
            >
                <Input
                    name="videoId"
                    placeholder={
                        error.message ? error.message : "Youtube Video ID or URL"
                    }
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onMouseDown={clearError}
                    className={cn(
                        "w-full focus:text-black focus-visible:ring-pink-500",
                        errorStyles
                    )}
                    required
                />

                <SubmitButton
                    text="Create Summary"
                    loadingText="Creating Summary"
                    loading={loading}
                />
            </form>
        </div>
    );
}
